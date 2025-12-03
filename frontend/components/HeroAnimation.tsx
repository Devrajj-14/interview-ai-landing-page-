"use client";

import { useEffect, useRef, useState } from "react";

interface Dot {
  x: number;
  y: number;
  z: number;
  originalX: number;
  originalY: number;
  originalZ: number;
  size: number;
  color: string;
  isFilled: boolean;
}

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const rotationRef = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much the element has scrolled out of view
      // 0 = fully in view, 1 = completely scrolled past
      const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / windowHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const size = Math.min(window.innerWidth * 0.5, 600);
      canvas.width = size;
      canvas.height = size;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const radius = canvas.width * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dots: Dot[] = [];

    // Create dots in a spherical pattern
    const rings = 20;
    const dotsPerRing = 24;
    const filledDots = new Set<number>();

    // Randomly select some dots to be filled
    for (let i = 0; i < 15; i++) {
      filledDots.add(Math.floor(Math.random() * rings * dotsPerRing));
    }

    let dotIndex = 0;
    for (let i = 0; i < rings; i++) {
      const phi = (Math.PI * i) / (rings - 1);
      const ringRadius = Math.sin(phi) * radius;
      const y = Math.cos(phi) * radius;
      const dotsInThisRing = Math.max(4, Math.floor(dotsPerRing * Math.sin(phi)));

      for (let j = 0; j < dotsInThisRing; j++) {
        const theta = (2 * Math.PI * j) / dotsInThisRing;
        const x = ringRadius * Math.cos(theta);
        const z = ringRadius * Math.sin(theta);

        const colorT = (y + radius) / (radius * 2);
        const isFilled = filledDots.has(dotIndex);

        dots.push({
          x,
          y,
          z,
          originalX: x,
          originalY: y,
          originalZ: z,
          size: isFilled ? 4 : 2,
          color: isFilled
            ? colorT > 0.5
              ? "#9B6FFF"
              : "#FF9FD5"
            : colorT > 0.5
            ? "#9B6FFF"
            : "#FF9FD5",
          isFilled,
        });
        dotIndex++;
      }
    }

    const rotate3D = (
      x: number,
      y: number,
      z: number,
      angleX: number,
      angleY: number
    ) => {
      let x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
      let z1 = x * Math.sin(angleY) + z * Math.cos(angleY);
      let y1 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
      let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);
      return { x: x1, y: y1, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rotationRef.current.y += 0.005;
      rotationRef.current.x += 0.002;

      // Gradient background
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius * 1.5
      );
      gradient.addColorStop(0, "rgba(155, 111, 255, 0.15)");
      gradient.addColorStop(0.5, "rgba(255, 159, 213, 0.08)");
      gradient.addColorStop(1, "rgba(155, 111, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const rotatedDots = dots.map((dot) => {
        const rotated = rotate3D(
          dot.originalX,
          dot.originalY,
          dot.originalZ,
          rotationRef.current.x,
          rotationRef.current.y
        );
        return { ...dot, ...rotated };
      });

      rotatedDots.sort((a, b) => a.z - b.z);

      rotatedDots.forEach((dot) => {
        const scale = 1 + dot.z / (radius * 2);
        const screenX = centerX + dot.x;
        const screenY = centerY + dot.y;
        const opacity = Math.max(0.3, (dot.z + radius) / (radius * 2));
        const colorT = (dot.y + radius) / (radius * 2);

        if (dot.isFilled) {
          // Glow effect
          const glowGradient = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            dot.size * scale * 4
          );
          const glowColor = colorT > 0.5 ? "155, 111, 255" : "255, 159, 213";
          glowGradient.addColorStop(0, `rgba(${glowColor}, ${opacity * 0.8})`);
          glowGradient.addColorStop(0.5, `rgba(${glowColor}, ${opacity * 0.3})`);
          glowGradient.addColorStop(1, `rgba(${glowColor}, 0)`);
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(screenX, screenY, dot.size * scale * 4, 0, Math.PI * 2);
          ctx.fill();

          // Filled dot
          ctx.fillStyle =
            colorT > 0.5
              ? `rgba(155, 111, 255, ${opacity})`
              : `rgba(255, 159, 213, ${opacity})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, dot.size * scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ring dots
          const ringColor = colorT > 0.5 ? "155, 111, 255" : "255, 159, 213";
          ctx.strokeStyle = `rgba(${ringColor}, ${opacity * 0.6})`;
          ctx.lineWidth = 1.5 * scale;
          ctx.beginPath();
          ctx.arc(screenX, screenY, dot.size * scale * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  // Calculate scale and opacity based on scroll
  const scale = 1 + scrollProgress * 2.5; // Grows up to 3.5x size
  const opacity = 1 - scrollProgress * 0.8; // Fades out

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{
          filter: "blur(0.3px)",
        }}
      />
    </div>
  );
}
