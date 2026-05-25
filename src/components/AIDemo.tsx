"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function AIDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-secondary/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent" />

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-border/50" />

          {/* Content */}
          <div className="relative z-10 py-16 px-8 md:px-16 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-xs font-mono">
                AI-powered — ask me anything
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            >
              Have questions?{" "}
              <span className="gradient-text">Ask my AI agent</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-muted max-w-lg mx-auto mb-8 leading-relaxed"
            >
              An AI agent trained on my experience, skills, and projects.
              Built with the same platform engineering mindset I bring to products.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Try the AI Demo →
              </Link>
            </motion.div>
          </div>

          {/* Decorative floating dots */}
          <div className="absolute top-8 left-12 w-3 h-3 border border-accent/30 rounded-full animate-float hidden md:block" />
          <div
            className="absolute bottom-12 right-16 w-2 h-2 bg-secondary/40 rounded-full animate-float hidden md:block"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/2 left-8 w-2 h-2 bg-accent/20 rounded-full animate-float hidden md:block"
            style={{ animationDelay: "3s" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
