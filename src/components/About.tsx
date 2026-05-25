"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { stats } from "@/data/content";

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        {count}+
      </div>
      <div className="text-muted text-sm">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Terminal Style */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-xl p-6 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-muted text-xs">about.sh</span>
            </div>
            <div className="space-y-2 text-muted">
              <p>
                <span className="text-accent">$</span> whoami
              </p>
              <p className="text-foreground pl-4">Mobile Lead Engineer</p>
              <p>
                <span className="text-accent">$</span> expertise
              </p>
              <p className="text-foreground pl-4">Android • React Native • Backend</p>
              <p>
                <span className="text-accent">$</span> experience --years
              </p>
              <p className="text-foreground pl-4">12+ years building mobile & backend systems</p>
              <p>
                <span className="text-accent">$</span> specialization
              </p>
              <p className="text-foreground pl-4">
                IoT • BLE • MQTT • Spring Boot • AWS
              </p>
              <p>
                <span className="text-accent">$</span> leadership
              </p>
              <p className="text-foreground pl-4">
                Led teams of 15+ engineers
              </p>
              <p className="text-accent animate-pulse">▊</p>
            </div>
          </motion.div>

          {/* Right - Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-muted leading-relaxed">
              I&apos;m a Mobile Lead Engineer with over 12 years of experience
              building enterprise-grade applications across Android, React Native,
              and backend systems. I&apos;m not just a mobile developer — I&apos;m a
              full-stack mobile architect.
            </p>
            <p className="text-muted leading-relaxed">
              From native Android with Kotlin & Jetpack Compose, to cross-platform
              with React Native, to backend services with Spring Boot & Node.js —
              I build end-to-end solutions. My IoT expertise connects it all with
              BLE, MQTT, and cloud architecture.
            </p>
            <p className="text-muted leading-relaxed">
              Currently leading mobile development for smart home IoT products,
              managing teams of 15+, and exploring AI agents & intelligent
              automation on the side.
            </p>

            {/* Education */}
            <div className="pt-4 border-t border-border/50">
              <p className="text-sm text-accent font-medium mb-2">Education</p>
              <p className="text-foreground text-sm">M.Tech — BITS Pilani</p>
              <p className="text-muted text-sm">B.Tech — Arya Institute of Engineering & Technology, Jaipur</p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 glass rounded-xl p-8"
        >
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
