"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./hero.css";

export default function PreparePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current || !backgroundRef.current) return;

    const tl = gsap.timeline();

    // Background color animation
    tl.to(
      backgroundRef.current,
      {
        background:
          "linear-gradient(135deg, #f4f1eb 0%, #e8dfd5 25%, #f4f1eb 50%, #e8dfd5 75%, #f4f1eb 100%)",
        duration: 1.5,
        ease: "sine.inOut",
      },
      0
    );

    // Circle animations
    const circles = backgroundRef.current.querySelectorAll(".animated-circle");
    circles.forEach((circle, index) => {
      tl.fromTo(
        circle,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.8,
          duration: 0.8,
          ease: "back.out",
          delay: index * 0.1,
        },
        0
      );

      // Floating animation for circles
      tl.to(
        circle,
        {
          y: "+=30",
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        },
        0.5
      );
    });

    // Circular scatter pattern animation
    const words = heroRef.current.querySelectorAll(".hero-word");
    words.forEach((word, wordIndex) => {
      const letters = word.querySelectorAll(".letter");
      letters.forEach((letter, letterIndex) => {
        // Calculate circular position around center - much larger radius
        const totalLetters = letters.length;
        const angle = (letterIndex / totalLetters) * Math.PI * 2;
        const radius = 400 + gsap.utils.random(-100, 150); // Much larger scatter
        const startX = Math.cos(angle) * radius;
        const startY = Math.sin(angle) * radius;

        const timeline = gsap.timeline();

        // Phase 1: Appear at circular position (0.15s)
        timeline.fromTo(
          letter,
          {
            x: startX,
            y: startY,
            opacity: 0,
            scale: 0.1,
          },
          {
            opacity: 0.8,
            scale: 0.95,
            duration: 0.15,
            ease: "power2.out",
            delay: wordIndex * 0.03 + letterIndex * 0.015,
          },
          0
        );

        // Phase 2: Circular orbit animation (1.5 seconds with 0.8 orbits)
        const orbits = 0.8;
        for (let i = 0; i < orbits; i++) {
          const nextAngle = angle + (Math.PI * 2 * (i + 1)) / orbits;
          const nextX = Math.cos(nextAngle) * radius * (1 - i * 0.2);
          const nextY = Math.sin(nextAngle) * radius * (1 - i * 0.2);

          timeline.to(
            letter,
            {
              x: nextX,
              y: nextY,
              duration: 1.5 / orbits,
              ease: "sine.inOut",
            },
            i === 0 ? 0.15 : undefined
          );
        }

        // Phase 3: Converge to final position with bounce (0.8s)
        timeline.to(
          letter,
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.7)",
          },
          "+=0.05"
        );
      });
    });
  }, []);

  const renderLetters = (text: string) => {
    return text.split("").map((letter, i) => (
      <span key={i} className="letter">
        {letter}
      </span>
    ));
  };

  return (
    <section className="hero" ref={backgroundRef}>
      <div className="animated-circle circle-1"></div>
      <div className="animated-circle circle-2"></div>
      <div className="animated-circle circle-3"></div>
      <div className="hero-inner" ref={heroRef}>
        <h1 className="hero-heading">
          <span className="hero-word">{renderLetters("Ace")}</span>
          <span className="hero-word">{renderLetters("your")}</span>
          <span className="hero-word">{renderLetters("AI")}</span>
          <span className="hero-word hero-word--accent">
            {renderLetters("interview")}
          </span>
          <span className="hero-word hero-word--accent">
            {renderLetters("with")}
          </span>
          <span className="hero-word hero-word--accent">
            {renderLetters("confidence")}
          </span>
        </h1>
        <p className="hero-subtext">
          <span className="hero-word">{renderLetters("Prepare")}</span>
          <span className="hero-word">{renderLetters("your")}</span>
          <span className="hero-word">{renderLetters("team")}</span>
          <span className="hero-word">{renderLetters("with")}</span>
          <span className="hero-word">{renderLetters("real")}</span>
          <span className="hero-word">{renderLetters("AI")}</span>
          <span className="hero-word">{renderLetters("scenarios")}</span>
          <span className="hero-word">{renderLetters("and")}</span>
          <span className="hero-word">{renderLetters("expert")}</span>
          <span className="hero-word">{renderLetters("feedback")}</span>
          <span className="hero-word">{renderLetters("to")}</span>
          <span className="hero-word">{renderLetters("succeed.")}</span>
        </p>
      </div>
    </section>
  );
}
