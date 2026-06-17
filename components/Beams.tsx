"use client";

import { useEffect, useRef } from "react";

// Adapted from the "beams-background" component to fit this site's custom-CSS
// setup (no Tailwind) and cyan palette. Renders into its parent's box rather
// than the full window, runs a single static frame for reduced-motion users,
// and is meant to sit behind the hero with a CSS fade mask over it.

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

type Intensity = "subtle" | "medium" | "strong";

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.5 + Math.random() * 1.0,
    opacity: 0.1 + Math.random() * 0.14,
    // cyan → blue band to match --accent
    hue: 172 + Math.random() * 58,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export default function Beams({
  intensity = "subtle",
  className = "",
}: {
  intensity?: Intensity;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;

    const opacityMap: Record<Intensity, number> = {
      subtle: 0.55,
      medium: 0.8,
      strong: 1,
    };
    const MINIMUM_BEAMS = 18;

    let W = 0;
    let H = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = parent ? parent.clientWidth : window.innerWidth;
      H = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = Math.floor(MINIMUM_BEAMS * 1.5);
      beamsRef.current = Array.from({ length: total }, () => createBeam(W, H));
    };

    const resetBeam = (beam: Beam, index: number, total: number) => {
      const column = index % 3;
      const spacing = W / 3;
      beam.y = H + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.4 + Math.random() * 0.4;
      beam.hue = 172 + (index * 58) / total;
      beam.opacity = 0.16 + Math.random() * 0.1;
      return beam;
    };

    const drawBeam = (beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsing =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const g = ctx.createLinearGradient(0, 0, 0, beam.length);
      g.addColorStop(0, `hsla(${beam.hue}, 85%, 62%, 0)`);
      g.addColorStop(0.1, `hsla(${beam.hue}, 85%, 62%, ${pulsing * 0.5})`);
      g.addColorStop(0.4, `hsla(${beam.hue}, 85%, 62%, ${pulsing})`);
      g.addColorStop(0.6, `hsla(${beam.hue}, 85%, 62%, ${pulsing})`);
      g.addColorStop(0.9, `hsla(${beam.hue}, 85%, 62%, ${pulsing * 0.5})`);
      g.addColorStop(1, `hsla(${beam.hue}, 85%, 62%, 0)`);

      ctx.fillStyle = g;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    resize();
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.filter = "blur(35px)";
      const total = beamsRef.current.length;
      beamsRef.current.forEach((beam, i) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -100) resetBeam(beam, i, total);
        drawBeam(beam);
      });
      rafRef.current = requestAnimationFrame(frame);
    };

    if (reduce) {
      // single static frame — no animation loop
      ctx.clearRect(0, 0, W, H);
      ctx.filter = "blur(35px)";
      beamsRef.current.forEach((beam) => drawBeam(beam));
    } else {
      frame();
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`beams-canvas ${className}`}
      aria-hidden="true"
    />
  );
}
