"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

type Direction = keyof typeof GRADIENT_ANGLES;

export type ProgressiveBlurProps = {
  direction?: Direction;
  blurLayers?: number;
  blurIntensity?: number;
  tint?: string; // optional, to make blur visible
  className: string;
};

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 0.7,
  tint = "rgba(0,0,0,0)",
  className,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (layers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div className={cn("relative", className)}>
      {/* small tint so backdrop blur is visible */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{ background: tint }}
      />

      {Array.from({ length: layers }).map((_, index) => {
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255,255,255,${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`;

        return (
          <motion.div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
            }}
            {...props}
          />
        );
      })}
    </div>
  );
}
