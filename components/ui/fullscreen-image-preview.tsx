"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type Props = {
  images: string[];
  title?: string;
  initialIndex?: number;
  triggerClassName?: string;
  trigger?: React.ReactNode;
};

export function FullscreenImagePreview({
  images,
  title = "Preview",
  initialIndex = 0,
  triggerClassName,
  trigger,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(initialIndex);

  const hasImages = images?.length > 0;

  const next = React.useCallback(() => {
    if (!hasImages) return;
    setIndex((i) => (i + 1) % images.length);
  }, [hasImages, images.length]);

  const prev = React.useCallback(() => {
    if (!hasImages) return;
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [hasImages, images.length]);

  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, next, prev]);

  React.useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            type="button"
            variant="secondary"
            className={cn("h-8 px-3", triggerClassName)}
          >
            Full screen
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className={cn(
          "!fixed !inset-0",
          "!m-0 !p-0",
          "!w-screen !h-screen !max-w-none !max-h-none",
          "!rounded-none !border-0",
          "!left-0 !top-0 !translate-x-0 !translate-y-0 !transform-none",
          "bg-black/5 backdrop-blur-sm",
          "flex items-center justify-center",
          "data-[state=open]:animate-in data-[state=closed]:animate-out z-99999",
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Main Content Container - Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Image Container */}
          {hasImages && (
            <div className="relative w-[85vw] h-[85vh] max-w-[1400px]">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`${title} ${index + 1} of ${images.length}`}
                fill
                sizes="85vw"
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Navigation Buttons - Overlaid */}
        <Button
          type="button"
          variant="ghost"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10 h-12 w-12 rounded-full"
          onClick={prev}
          aria-label="Previous image"
          disabled={!hasImages || images.length === 1}
        >
          <IconArrowLeft className="h-6 w-6" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/10 h-12 w-12 rounded-full"
          onClick={next}
          aria-label="Next image"
          disabled={!hasImages || images.length === 1}
        >
          <IconArrowRight className="h-6 w-6" />
        </Button>

        {/* Counter */}
        {hasImages && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-medium text-white">
            {index + 1} / {images.length}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
