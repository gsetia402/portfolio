"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo, heroHeadline, stats } from "@/data/content";

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span className="inline-flex items-center gap-2 text-lg md:text-xl font-mono text-muted">
      <span className="text-accent">&gt;</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-foreground"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/40 rounded-full"
          style={{
            top: `${seededRandom(i * 3 + 1) * 100}%`,
            left: `${seededRandom(i * 7 + 2) * 100}%`,
            animationDelay: `${seededRandom(i * 11 + 3) * 3}s`,
            animation: `pulse-glow ${2 + seededRandom(i * 13 + 4) * 3}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Star Field Background */}
      <StarField />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-secondary/8 rounded-full blur-[120px]" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-24 left-20 w-4 h-4 border border-accent/40 rounded-full hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [45, 90, 45] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-1/3 right-24 w-3 h-3 bg-secondary/40 rounded-sm hidden md:block"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-accent/30 rounded-full hidden md:block"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center pt-20">
        {/* Available Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent/30 bg-accent/5 mb-10"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-accent text-sm font-medium">
            Open to opportunities
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-[1.1]"
        >
          <span className="text-foreground">{heroHeadline.line1}</span>
          <br />
          <span className="gradient-text">{heroHeadline.highlight}</span>
        </motion.h1>

        {/* Rotating Word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <RotatingWord words={heroHeadline.rotatingWords} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-muted max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg"
        >
          {personalInfo.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-background font-semibold rounded-full hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] transition-all duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
            View my work
          </a>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-accent/50 text-accent font-semibold rounded-full hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(0,245,212,0.2)] transition-all duration-300"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Ask AI
          </Link>
          <a
            href="/Gaurav_Setia_Resume.pdf"
            download
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors font-medium"
          >
            <Download size={18} />
            Resume
          </a>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass rounded-xl p-5 text-center hover:glow-accent transition-all duration-300 cursor-default"
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}+
              </div>
              <div className="text-xs text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs text-muted uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
