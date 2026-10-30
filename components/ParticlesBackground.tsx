"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import type { IParticlesProps } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [Particles, setParticles] =
    useState<ComponentType<IParticlesProps> | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Loaded after hydration so tsparticles stays out of the initial JS bundle
    Promise.all([import("@tsparticles/react"), import("@tsparticles/slim")]).then(
      async ([{ default: Component, initParticlesEngine }, { loadSlim }]) => {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
        });
        if (!cancelled) setParticles(() => Component);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 30,
      detectRetina: true,
      particles: {
        number: { value: 30, density: { enable: true } },
        color: { value: "#fff" },
        opacity: { value: 1 },
        size: { value: { min: .5, max: 1 } },
        move: { enable: true, speed: .3, direction: "none" },
        links: { enable: false },
      },
    }),
    [],
  );

  if (!Particles) return null;

  return <Particles id="tsparticles" options={options} />;
}
