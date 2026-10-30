import { streamText } from "ai";
import { google, type GoogleLanguageModelOptions } from "@ai-sdk/google";
import {
  HERO,
  ABOUT,
  EXPERIENCES,
  PROJECTS,
  EDUCATION,
  TRAININGS,
  OTHER_SKILLS,
  CONTACT,
  TECH_LOGOS,
} from "@/data/portfolio.data";

export const maxDuration = 30;

// Cap what one request can send so the endpoint can't be used for huge prompts
const MAX_HISTORY = 12;
const MAX_MESSAGE_LENGTH = 1000;

type ChatMessage = { role: "user" | "assistant"; content: string };

const isChatMessage = (m: unknown): m is ChatMessage => {
  const { role, content } = (m ?? {}) as Partial<ChatMessage>;
  return (role === "user" || role === "assistant") && typeof content === "string";
};

const firstName = HERO.name.split(" ")[0];

const portfolioData = {
  hero: HERO,
  about: ABOUT,
  experiences: EXPERIENCES,
  skills: TECH_LOGOS.map((t) => t.name),
  otherSkills: OTHER_SKILLS,
  projects: PROJECTS.map((p) => ({
    title: p.title,
    category: p.category,
    description: p.description,
    features: p.features,
    link: p.link,
    stack: p.stack,
  })),
  education: EDUCATION,
  trainings: TRAININGS,
  contact: CONTACT,
};

const systemInstruction = `
  You are the AI assistant on ${HERO.name}'s portfolio website.
  You answer questions from recruiters and visitors about ${firstName}.

  Here is everything you know about ${firstName}:
  ${JSON.stringify(portfolioData, null, 2)}

  Guidelines:
  - Refer to ${firstName} in the third person ("he", "his"), never as "I".
  - Only answer from the data above. If something isn't covered, say so and suggest emailing ${firstName} at ${CONTACT.email}.
  - If asked what technologies ${firstName} knows, use the skills list and the 'stack' arrays of his projects.
  - Keep answers short and friendly: a few sentences or a short bullet list, formatted in Markdown.
  - When you mention a project, include its link as a Markdown link.
  - If a question is unrelated to the portfolio, politely steer the conversation back to ${firstName}'s work.
`;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const messages: unknown = body?.messages;

  if (!Array.isArray(messages) || !messages.every(isChatMessage)) {
    return new Response("Invalid request", { status: 400 });
  }

  const recent = messages.slice(-MAX_HISTORY).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_MESSAGE_LENGTH),
  }));
  // Trimming can leave an assistant reply first; start the conversation with a question instead
  while (recent[0]?.role === "assistant") recent.shift();

  if (recent.length === 0) {
    return new Response("Invalid request", { status: 400 });
  }

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: systemInstruction,
    messages: recent,
    providerOptions: {
      // Skip Gemini's "thinking" step so replies start streaming sooner
      google: {
        thinkingConfig: { thinkingBudget: 0 },
      } satisfies GoogleLanguageModelOptions,
    },
    onError: ({ error }) => console.error("Chat stream failed:", error),
  });

  return result.toTextStreamResponse();
}
