"use client";

import type { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Chatbot } from "@/components/Chatbot";
import { CONTACT } from "@/data/portfolio.data";
import { useIsClient } from "@/lib/use-is-client";

import { ChatRoundLineIcon } from "@solar-icons/react/bold-duotone/chat-round-line";
import { DocumentIcon } from "@solar-icons/react/bold-duotone/document";
import { Smartphone2Icon } from "@solar-icons/react/bold-duotone/smartphone-2";
import { SunIcon } from "@solar-icons/react/bold-duotone/sun";
import { MoonIcon } from "@solar-icons/react/bold/moon";

const ICON_BUTTON_CLASS =
  "rounded-xl text-primary hover:text-primary dark:text-foreground dark:hover:text-foreground";
const ICON_CLASS = "size-6 text-primary dark:text-foreground";

const CONTACT_LINKS = [
  { label: "Email", href: `mailto:${CONTACT.email}`, Icon: ChatRoundLineIcon },
  {
    label: "Call",
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
    Icon: Smartphone2Icon,
  },
];

function NavTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  // resolvedTheme is only known on the client, so render the default icon until then
  const mounted = useIsClient();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <NavTooltip label={isDark ? "Light mode" : "Dark mode"}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={ICON_BUTTON_CLASS}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <SunIcon size={24} className={ICON_CLASS} />
        ) : (
          <MoonIcon size={24} className={ICON_CLASS} />
        )}
      </Button>
    </NavTooltip>
  );
}

export function SiteNavbar() {
  return (
    <TooltipProvider>
      <nav className="fixed bottom-5 left-1/2 z-9999 -translate-x-1/2 w-full">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 px-2 py-2 shadow-lg backdrop-blur">
            {CONTACT_LINKS.map(({ label, href, Icon }) => (
              <NavTooltip key={label} label={label}>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className={ICON_BUTTON_CLASS}
                >
                  <a href={href} aria-label={label}>
                    <Icon size={24} className={ICON_CLASS} />
                  </a>
                </Button>
              </NavTooltip>
            ))}

            <ThemeToggle />

            <div className="mx-1 h-6 w-px bg-black/10 dark:bg-white/10" />

            <NavTooltip label="Download resume">
              <Button asChild className="rounded-xl px-3 text-primary-foreground">
                <a
                  href="/resume.pdf"
                  download="resume.pdf"
                  aria-label="Download Resume"
                >
                  Resume{" "}
                  <DocumentIcon
                    className="ml-2 size-5 text-primary-foreground"
                    size={20}
                  />
                </a>
              </Button>
            </NavTooltip>
            <Chatbot />
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
