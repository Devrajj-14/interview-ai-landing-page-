"use client";

import { motion } from "framer-motion";

const FinalCtaSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Hire top talent faster
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed"
          >
            The AI-powered platform HR teams trust to streamline hiring.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="/hire"
              className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105"
            >
              GET STARTED
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
