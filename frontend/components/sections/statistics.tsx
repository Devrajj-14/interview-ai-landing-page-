"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendUp, Users, Clock } from "@phosphor-icons/react";

const statsData = [
  {
    value: "500+",
    description: "Companies",
    icon: Users,
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
  },
  {
    value: "75%",
    description: "Faster",
    icon: Clock,
    gradient: "from-blue-500 via-sky-500 to-cyan-500",
  },
  {
    value: "90%",
    description: "Satisfaction",
    icon: TrendUp,
    gradient: "from-emerald-500 via-green-500 to-lime-500",
  },
];

const Statistics = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative bg-background py-32 lg:py-40 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15), transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15), transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.15), transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15), transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />
      </div>

      <div className="container relative z-10">
        {/* Floating stats in organic positions */}
        <div className="relative h-[600px] flex items-center justify-center">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            const angle = (index * 120 * Math.PI) / 180;
            const radius = 220;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, scale: 1, x, y }}
                animate={{
                  y: [y, y - 20, y],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 60,
                  damping: 15,
                  y: {
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 6 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15, rotate: 0 }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-full blur-2xl opacity-50`}
                  />

                  {/* Main bubble */}
                  <div className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-full p-8 shadow-2xl border border-white/50 dark:border-zinc-800">
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${stat.gradient}`}
                      >
                        <IconComponent size={28} weight="fill" className="text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-foreground/60 mt-1">
                          {stat.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Center connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
            {statsData.map((_, index) => {
              const angle = (index * 120 * Math.PI) / 180;
              const radius = 220;
              const x = Math.cos(angle) * radius + 300;
              const y = Math.sin(angle) * radius + 300;

              return (
                <motion.line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                />
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
