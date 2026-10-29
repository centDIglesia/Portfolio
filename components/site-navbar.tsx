"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArchiveDownMinimalisticIcon } from "@solar-icons/react/bold-duotone/archive-down-minimalistic";

import { SunIcon } from "@solar-icons/react/bold-duotone/sun";
import { Smartphone2Icon } from "@solar-icons/react/bold-duotone/smartphone-2";
import { Chatbot } from "@/components/Chatbot";
import { Plane2Icon } from "@solar-icons/react/bold-duotone/plane-2";
import { MoonIcon } from '@solar-icons/react/bold/moon'
function IconLink({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="rounded-xl text-primary hover:text-primary dark:text-foreground dark:hover:text-foreground"
        >
          <Link href={href} aria-label={label}>
            {icon}
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function SiteNavbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <TooltipProvider>
      <nav className="fixed bottom-5 left-1/2 z-9999 -translate-x-1/2 w-full">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 px-2 py-2 shadow-lg backdrop-blur">
            <IconLink
              label="Email"
              href="mailto:vincent.iglesia07@gmail.com"
              icon={<Plane2Icon className="size-6 text-primary dark:text-foreground" size={24} />}
            />
            <IconLink
              label="Call"
              href="tel:+639242245936"
              icon={
                <Smartphone2Icon className="size-6 text-primary dark:text-foreground" size={24} />
              }
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-xl text-primary hover:text-primary dark:text-foreground dark:hover:text-foreground"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {mounted && resolvedTheme === "dark" ? (
                    <SunIcon size={24} className="size-6 text-primary dark:text-foreground" />
                  ) : (
                    <MoonIcon size={24} className="size-6 text-primary dark:text-foreground" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>
                  {mounted && resolvedTheme === "dark"
                    ? "Light mode"
                    : "Dark mode"}
                </p>
              </TooltipContent>
            </Tooltip>

            <div className="mx-1 h-6 w-px bg-black/10 dark:bg-white/10" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  className="rounded-xl px-3 text-primary-foreground "
                >
                  <a
                    href={"/resume.pdf"}
                    download="resume.pdf"
                    aria-label="Download Resume"
                  >
                    Resume{" "}
                    <ArchiveDownMinimalisticIcon
                      className="ml-2 size-5 text-primary-foreground"
                      size={20}
                    />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Download resume</p>
              </TooltipContent>
            </Tooltip>
            <Chatbot />
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
