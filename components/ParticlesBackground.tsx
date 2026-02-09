"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 20, density: { enable: true } },
        color: { value: "#fff" },
        opacity: { value: 1 },
        size: { value: { min: .5, max: 1 } },
        move: { enable: true, speed: .3, direction: "none" },
        links: { enable: true, distance: 10, opacity: 0, width: 0 },
      },
    }),
    [],
  );

  if (!ready) return null;

  return <Particles id="tsparticles" options={options} />;
}
