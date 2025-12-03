"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ClipboardText,
  Desktop,
  FileCode,
  VideoCamera,
  Users,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface Stage {
  stage: string;
  title: string;
  description: string;
  icon: Icon;
  gradient: string;
  angle: number;
}

const stages: Stage[] = [
  {
    stage: "Stage 1",
    title: "MCQ Test",
    description: "Multiple-choice questionnaire to assess fundamental knowledge and conceptual understanding of key topics.",
    icon: ClipboardText,
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
    angle: 0,
  },
  {
    stage: "Stage 2",
    title: "Online Assessment",
    description: "Comprehensive online evaluation to test aptitude, logical reasoning, and domain-specific knowledge.",
    icon: Desktop,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    angle: 45,
  },
  {
    stage: "Stage 3",
    title: "Coding Test",
    description: "Hands-on coding challenges to evaluate problem-solving skills, algorithm knowledge, and code quality.",
    icon: FileCode,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    angle: 90,
  },
  {
    stage: "Stage 4",
    title: "Technical Interview",
    description: "In-depth technical discussion covering system design, architecture, and technical problem-solving.",
    icon: VideoCamera,
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    angle: 135,
  },
  {
    stage: "Stage 5",
    title: "HR Interview",
    description: "Final round focusing on cultural fit, communication skills, salary expectations, and career aspirations.",
    icon: Users,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    angle: 180,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [internalScroll, setInternalScroll] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxInternalScroll = 200;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      
      const isInActiveZone = distanceFromCenter < 200 && 
                              rect.top < viewportCenter && 
                              rect.bottom > viewportCenter;

      if (isInActiveZone) {
        const scrollingDown = e.deltaY > 0;
        const canScrollDown = internalScroll < maxInternalScroll;
        const canScrollUp = internalScroll > 0;

        if ((scrollingDown && canScrollDown) || (!scrollingDown && canScrollUp)) {
          e.preventDefault();
          e.stopPropagation();
          
          setInternalScroll((prev) => {
            const newScroll = prev + e.deltaY / 3;
            return Math.max(0, Math.min(newScroll, maxInternalScroll));
          });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
    };
  }, [internalScroll]);

  useEffect(() => {
    const progress = Math.min(internalScroll / maxInternalScroll, 1);
    setScrollProgress(progress);
    
    // Determine active stage based on progress
    const stageIndex = Math.min(
      Math.floor(progress * stages.length),
      stages.length - 1
    );
    setActiveIndex(stageIndex);
  }, [internalScroll]);

  // Calculate needle rotation (from -90deg to 90deg for semicircle)
  const needleRotation = -90 + scrollProgress * 180;
  
  // Check if icon should be visible (needle has reached it)
  const isIconVisible = (angle: number) => {
    return needleRotation >= (angle - 90 - 5);
  };

  return (
    <section ref={sectionRef} className="relative bg-background py-16 lg:py-20 overflow-hidden flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      
      {/* Fading edges */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="container relative z-10">
        <div className="text-center mb-8">
          <p className="tag-text mb-2">AI INTERVIEW COACH</p>
          <motion.h2 
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold"
          >
            {stages[activeIndex].title}
          </motion.h2>
          <p className="text-foreground/60 mt-1 text-sm">{stages[activeIndex].stage}</p>
        </div>

        {/* Speedometer */}
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="relative">
            <div className="relative w-full aspect-[2/1] max-h-[350px]">
              <svg className="w-full h-full" viewBox="0 0 400 220" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="25%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="75%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                {/* Main track background */}
                <path
                  d="M 40 200 A 160 160 0 0 1 360 200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted/30"
                  strokeLinecap="round"
                />

                {/* Tick marks */}
                {[0, 45, 90, 135, 180].map((angle, i) => {
                  const rad = ((angle - 180) * Math.PI) / 180;
                  const innerRadius = 148;
                  const outerRadius = 172;
                  const x1 = 200 + Math.cos(rad) * innerRadius;
                  const y1 = 200 + Math.sin(rad) * innerRadius;
                  const x2 = 200 + Math.cos(rad) * outerRadius;
                  const y2 = 200 + Math.sin(rad) * outerRadius;
                  
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="text-muted-foreground/30"
                    />
                  );
                })}
                
                {/* Progress arc with gradient */}
                <motion.path
                  d="M 40 200 A 160 160 0 0 1 360 200"
                  fill="none"
                  stroke="url(#arcGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="1005"
                  initial={{ strokeDashoffset: 1005 }}
                  animate={{ strokeDashoffset: 1005 - (scrollProgress * 1005) }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 0.5
                  }}
                />

                {/* Bulkier Needle */}
                <g
                  style={{
                    transform: `rotate(${needleRotation}deg)`,
                    transformOrigin: '200px 200px',
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {/* Main needle - bulkier triangle with gradient */}
                  <path
                    d="M 200 200 L 190 195 L 200 50 L 210 195 Z"
                    fill="url(#arcGradient)"
                  />
                  
                  {/* Center hub */}
                  <circle cx="200" cy="200" r="10" fill="url(#arcGradient)" />
                  <circle cx="200" cy="200" r="6" fill="currentColor" className="text-background" />
                </g>
              </svg>

              {/* Stage icons with colors */}
              {stages.map((stage, index) => {
                const IconComponent = stage.icon;
                const angle = stage.angle - 180;
                const angleRad = (angle * Math.PI) / 180;
                const radius = 210;
                const x = 200 + Math.cos(angleRad) * radius;
                const y = 200 + Math.sin(angleRad) * radius;
                
                const visible = isIconVisible(stage.angle);
                const isActive = activeIndex === index;

                // Color mapping for each stage
                const colors = [
                  "text-blue-500",
                  "text-purple-500", 
                  "text-pink-500",
                  "text-amber-500",
                  "text-emerald-500"
                ];

                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      left: `${(x / 400) * 100}%`,
                      top: `${(y / 220) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0.8, opacity: 0.3 }}
                    animate={{
                      scale: visible ? (isActive ? 1.15 : 1) : 0.8,
                      opacity: visible ? 1 : 0.3,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 30,
                      mass: 0.5
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="relative cursor-pointer"
                    >
                      {/* Icon with color */}
                      <IconComponent 
                        size={isActive ? 48 : 40} 
                        weight={visible ? "fill" : "regular"}
                        className={`transition-all duration-500 ${
                          visible ? colors[index] : "text-muted-foreground/40"
                        }`}
                      />

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none"
                      >
                        {stage.title}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Current stage description - simple */}
          <motion.div
            className="mt-12 text-center max-w-2xl mx-auto"
            key={activeIndex}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-foreground/70 text-base leading-relaxed">
                {stages[activeIndex].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
