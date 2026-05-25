"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { navLinks, personalInfo } from "@/data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-bold text-sm">GS</span>
          </div>
          <span className="font-semibold text-foreground">
            Gaurav Setia<span className="text-accent">.dev</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              {link.href.startsWith("/") ? (
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    link.label === "Ask AI"
                      ? "text-secondary hover:text-secondary/80 flex items-center gap-1"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label === "Ask AI" && (
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  )}
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className="text-muted hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-accent text-background text-sm font-semibold hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-200"
            >
              Let's Connect
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-muted hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-muted hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-full bg-accent text-background text-sm font-semibold"
                >
                  Let's Connect
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
