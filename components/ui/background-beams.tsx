"use client";

import { useEffect, useRef } from "react";

type Beam = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  hue: number;
};

export default function BackgroundBeams({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    const beams: Beam[] = [];

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const initBeams = () => {
      beams.length = 0;
      const count = Math.min(18, Math.max(10, Math.floor(window.innerWidth / 120)));
      for (let i = 0; i < count; i += 1) {
        beams.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          length: 120 + Math.random() * 180,
          width: 1 + Math.random() * 2,
          hue: 160 + Math.random() * 70,
        });
      }
    };

    const handlePointer = (event: MouseEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    const step = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.fillStyle = "rgba(0,0,0,0.02)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      beams.forEach((beam) => {
        const pointer = pointerRef.current;
        if (pointer) {
          const dx = beam.x - pointer.x;
          const dy = beam.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            beam.vx += (dx / dist) * force * 0.08;
            beam.vy += (dy / dist) * force * 0.08;
          }
        }

        beam.x += beam.vx;
        beam.y += beam.vy;

        if (beam.x < -100 || beam.x > window.innerWidth + 100) beam.vx *= -1;
        if (beam.y < -100 || beam.y > window.innerHeight + 100) beam.vy *= -1;

        const angle = Math.atan2(beam.vy, beam.vx);
        const x2 = beam.x + Math.cos(angle) * beam.length;
        const y2 = beam.y + Math.sin(angle) * beam.length;

        const gradient = ctx.createLinearGradient(beam.x, beam.y, x2, y2);
        gradient.addColorStop(0, `hsla(${beam.hue}, 90%, 65%, 0)`);
        gradient.addColorStop(0.4, `hsla(${beam.hue}, 90%, 65%, 0.6)`);
        gradient.addColorStop(1, `hsla(${beam.hue}, 90%, 65%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = beam.width;
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      animationId = window.requestAnimationFrame(step);
    };

    resize();
    initBeams();
    step();

    window.addEventListener("resize", () => {
      resize();
      initBeams();
    });
    window.addEventListener("mousemove", handlePointer);

    return () => {
      window.removeEventListener("mousemove", handlePointer);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 opacity-60 ${className}`}
      aria-hidden="true"
    />
  );
}
