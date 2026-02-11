"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconExternalLink,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { main, sub } from "@/font/font";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Component as EtheralShadow } from "@/components/etheral-shadow";

type Project = {
  title: string;
  description: string;
  features: string[];
  images: string[];
  link: string;
  isAlignRight?: boolean;
  stack?: string[];
};

export const AnimatedProjects = ({
  projects,
  autoplay = false,
  className,
}: {
  projects: Project[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const project = projects[active];
  const isRight = !!project.isAlignRight;

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [active]);

  const handleNextProject = () =>
    setActive((prev) => (prev + 1) % projects.length);
  const handlePrevProject = () =>
    setActive((prev) => (prev - 1 + projects.length) % projects.length);

  const handleNextImage = () =>
    setActiveImage((prev) => (prev + 1) % project.images.length);
  const handlePrevImage = () =>
    setActiveImage(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNextProject, 5000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className={cn("w-full mx-auto ", className)}>
      <div className="relative items-center grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className={cn(isRight ? "md:order-2" : "md:order-1 ")}>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {project.images.map((src, index) => (
                <motion.div
                  key={src}
                  className="absolute inset-0 origin-bottom"
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: index === activeImage ? 1 : 0.7,
                    scale: index === activeImage ? 1 : 0.95,
                    z: index === activeImage ? 0 : -100,
                    rotate: index === activeImage ? 0 : randomRotateY(),
                    zIndex:
                      index === activeImage
                        ? 999
                        : project.images.length + 2 - index,
                    y: index === activeImage ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Image
                    src={src}
                    alt={project.title}
                    width={800}
                    height={800}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Controls pinned to top-right of the image container */}
            <div className="absolute top-6 right-6 z-5220 flex gap-2">
              <Button
                onClick={handlePrevImage}
                className="h-7 w-7   flex items-center justify-center group/button"
                aria-label="Previous image"
                variant={"custom"}
              >
                <IconArrowLeft className="h-5 w-5  group-hover/button:rotate-12 " />
              </Button>

              <Button
                onClick={handleNextImage}
                variant={"custom"}
                className="h-7 w-7  flex items-center justify-center group/button"
                aria-label="Next image"
              >
                <IconArrowRight className="h-5 w-5  group-hover/button:-rotate-12 transition-transform duration-300" />
              </Button>
            </div>

            <div className="absolute top-6 left-6 z-5220 flex gap-2">
              <div
                className={cn(
                  isRight ? "flex justify-end" : "flex justify-start",
                )}
              >
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground text-sm"
                >
                  Preview <IconExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex justify-between flex-col py-4 ",
            isRight ? "md:order-1" : "md:order-2",
          )}
        >
          
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={cn(
              "rounded-xl bg-white relative p-6 md:p-8 shadow-xl",
              isRight ? "text-right" : "text-left", // Tailwind text alignment [web:41]
            )}
          >
            <div className="absolute inset-0 z-10">
            <EtheralShadow
              sizing="fill"
              noise={{ opacity: 0.15, scale: 1.2 }}
              animation={{ scale: 100, speed: 100 }}
              color="rgba(0, 0, 0, 0.1)"
            />
          </div>
            <h3 className={`text-2xl font-bold text-primary ${main.className}`}>
              {project.title}
            </h3>

            {(project.stack?.length ?? 0) > 0 && (
              <div
                className={`mt-3 flex flex-wrap  gap-2 ${isRight ? "justify-end" : "justify-start"} ${sub.className}`}
              >
                {project.stack!.map((tech) => (
                  <Badge key={tech} className="gap-1">
                    <span className="text-xs">{tech}</span>
                  </Badge>
                ))}
              </div>
            )}

            <p
              className={`text-sm font-bold text-primary mt-3 ${sub.className}`}
            >
              {project.description}
            </p>

            {!!project.features?.length && (
              <ul className={`text-sm text-primary mt-4 ${sub.className}`}>
                {project.features.map((f) =>
                  isRight ? (
                    <li className="mb-2" key={f}>
                      {f} •
                    </li>
                  ) : (
                    <li key={f}>• {f}</li>
                  ),
                )}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
