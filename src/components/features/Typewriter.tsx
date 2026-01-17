"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";

const words = [
  "Machine Learning Architect",
  "Learning Full-Stack Development",
  "Aspiring Spanish Speaker",
  "Problem Solver",
  "Avid Gamer"
];

export default function Typewriter() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const nextWord = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, []);

  useEffect(() => {
    setMounted(true);
    if (isHovered) return;

    const interval = setInterval(nextWord, 3500);
    return () => clearInterval(interval);
  }, [isHovered, nextWord]);

  // Ensure height is reserved during server-side rendering to prevent jumps
  if (!mounted) return <div className="h-32" />;

  return (
    <div 
      className="relative h-32 flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. TEXT CONTAINER - Fixed height to ensure visibility */}
      <div className="h-16 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index} // Use index as key for absolute reliability
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(10px)" }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <p className="text-2xl md:text-4xl font-bold tracking-tight text-center">
              {/* Fallback color added: text-white/90 ensures it shows up if gradient fails */}
              <span className="bg-linear-to-r from-[oklch(70%_0.18_250)] via-[oklch(65%_0.25_340)] to-[oklch(70%_0.18_250)] bg-clip-text text-transparent bg-size-[200%_auto] animate-[gradient_4s_linear_infinite]">
                {words[index]}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. PROGRESS DOTS - With Sliding Indicator */}
      <div className="flex gap-5 p-1 rounded-full bg-white/3 borde">
        <LayoutGroup>
          {words.map((_, i) => (
            <div key={i} className="relative flex items-center justify-center w-4 h-4">
              {/* This is the ring that "slides" between dots */}
              {i === index && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full border border-[oklch(70%_0.18_250)] bg-[oklch(70%_0.18_250)]/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <motion.button
                onMouseEnter={() => setIndex(i)}
                onClick={() => setIndex(i)}
                className="relative z-10 w-2 h-2 rounded-full"
                animate={{
                  backgroundColor: i === index ? "oklch(70% 0.18 250)" : "rgba(255,255,255,0.2)",
                  scale: i === index ? 1.2 : 1
                }}
                whileHover={{ scale: 1.4 }}
                transition={{ duration: 0.2 }}
                aria-label={`View ${words[i]}`}
              />
            </div>
          ))}
        </LayoutGroup>
      </div>
    </div>
  );
}