"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download, Mail, Moon, Phone } from "lucide-react";


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
        <Button asChild size="icon" className="rounded-xl">
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
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <TooltipProvider>
      <nav className="fixed bottom-5 left-1/2 z-9999 -translate-x-1/2 w-full">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white px-2 py-2 shadow-lg backdrop-blur">
            <IconLink
              label="Email"
              href="mailto:you@email.com"
              icon={<Mail className="h-4 w-4" />}
            />
            <IconLink
              label="Call"
              href="tel:+639001234567"
              icon={<Phone className="h-4 w-4" />}
            />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-xl"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  <Moon className="h-4 w-4 text-primary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>

            <div className="mx-1 h-6 w-px bg-black/10" />

            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild className="rounded-xl px-3">
                  {/* download attribute is not available on Link;
                    if you truly need forced download, use <a download> */}
                  <a
                    href={"/resume.pdf"}
                 
                    download="resume.pdf"
                    aria-label="Download Resume"
                    
                  >
                    Resume <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Download resume</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
