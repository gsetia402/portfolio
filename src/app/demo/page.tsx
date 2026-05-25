"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowLeft, Bot, User } from "lucide-react";
import Link from "next/link";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  "What mobile technologies does Gaurav specialize in?",
  "Tell me about the IoT smart home project",
  "How can Gaurav help with my app idea?",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/30 rounded-full"
          style={{
            top: `${seededRandom(i * 5 + 1) * 100}%`,
            left: `${seededRandom(i * 9 + 2) * 100}%`,
            animation: `pulse-glow ${2 + seededRandom(i * 13 + 3) * 3}s ease-in-out infinite`,
            animationDelay: `${seededRandom(i * 7 + 4) * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm a live AI agent running inside this portfolio. Ask me anything about AI, mobile development, or what Gaurav Setia can build for your business. I'm the real thing — not a scripted chatbot.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <StarField />

      {/* Header */}
      <header className="relative z-10 glass border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">Back to portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-mono text-muted">
              portfolio-agent • gpt-4o-mini
            </span>
            <span className="text-xs font-mono text-accent">• live</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-6 py-8 flex flex-col">
        {/* Messages */}
        <div className="flex-1 space-y-6 mb-6 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={16} className="text-secondary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] ${
                    message.role === "user"
                      ? "bg-accent/10 border border-accent/20"
                      : "glass"
                  } rounded-2xl px-5 py-3`}
                >
                  <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p className="text-muted/50 text-xs mt-2">
                    {message.timestamp}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={16} className="text-accent" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-secondary" />
              </div>
              <div className="glass rounded-2xl px-5 py-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted rounded-full animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted rounded-full animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="px-4 py-2 text-xs font-mono border border-border rounded-full text-muted hover:text-accent hover:border-accent/50 transition-all duration-200"
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center gap-3 glass rounded-2xl px-5 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about AI, mobile dev, or projects..."
              className="flex-1 bg-transparent text-foreground placeholder-muted/50 focus:outline-none text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </form>

        {/* Security note */}
        <p className="text-center text-muted/40 text-xs font-mono mt-4">
          API key lives on the server. The frontend only sees messages — secure
          by design.
        </p>
      </main>
    </div>
  );
}
