import { streamText } from "ai";
import { google } from "@ai-sdk/google";
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

export async function POST(req: Request) {
  const { messages } = await req.json();

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
    You are a friendly and professional AI assistant for my portfolio website.
    Your job is to answer questions from recruiters and visitors about me.

    Here is the data containing all of my information:
    ${JSON.stringify(portfolioData, null, 2)}

    Guidelines:
    - Only answer questions based on the portfolio data provided above.
    - If a user asks what technologies I know, list them based on the skills and 'stack' arrays in my projects.
    - Keep your answers concise, formatted nicely (use bullet points if helpful), and enthusiastic.
    - If a user asks a random question not related to my portfolio, politely steer the conversation back to my projects.
  `;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages,
    system: systemInstruction,
  });

  return result.toTextStreamResponse();
}
