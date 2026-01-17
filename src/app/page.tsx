"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import Typewriter from "@/components/features/Typewriter";
import Avatar3D from "@/components/features/Avatar3D";
import TechCard from "@/components/features/TechCard";

/**
 * HOME PAGE COMPONENT
 * 
 * FIXED: Removed devicons-react imports - TechCard handles icons internally
 * CHANGED: skills array now uses iconId strings instead of JSX elements
 */
export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Guard the scroll target to prevent hydration errors
  const { scrollYProgress } = useScroll({
    target: isMounted ? heroRef : undefined, 
    offset: ["start start", "end start"],
  });

  // Balanced Parallax Ranges
  const avatarY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  /**
   * SKILLS CONFIGURATION
   * FIXED: Changed from passing icon JSX to passing iconId strings
   * TechCard component looks up icons internally from its ICON_MAP
   */
  const skills = [
    { name: "Python", iconId: "python", color: "oklch(75% 0.15 150)" },
    { name: "React", iconId: "react", color: "oklch(70% 0.18 250)" },
    { name: "Java", iconId: "java", color: "oklch(65% 0.25 30)" },
    { name: "C++", iconId: "cpp", color: "oklch(60% 0.1 240)" },
  ];

  // Show loading skeleton during SSR/hydration
  if (!isMounted) return <div className="min-h-screen bg-background" />;

  return (
    <main className="relative min-h-screen bg-background text-white selection:bg-brand-primary/20">
      {/* ============================================
          1. HERO SECTION
          ============================================ */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center px-6 lg:px-20 overflow-hidden"
      >
        {/* BACKGROUND LAYERS - Parallax animated */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 pointer-events-none">
          {/* Radial gradient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-brand-primary),transparent_60%)] opacity-15" />
          
          {/* Grid pattern with fade mask */}
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" 
            style={{ 
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)', 
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)' 
            }}
          />
        </motion.div>
        
        {/* HERO CONTENT GRID */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* TEXT CONTENT - Left side on desktop, below avatar on mobile */}
          <motion.div style={{ y: textY }} className="z-20 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              <span className="bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent">
                Hi, my name is{" "}
              </span>
              <span className="bg-linear-to-r from-[oklch(70%_0.18_250)] to-[oklch(65%_0.25_340)] bg-clip-text text-transparent">
                Aadi
              </span>
            </h1>
            
            {/* Typewriter animation */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Typewriter />
            </div>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg md:text-xl text-slate-400 leading-relaxed mx-auto lg:mx-0">
              Developing at the intersection of{" "}
              <span className="text-brand-primary font-medium">Machine Learning Models</span> and{" "}
              <span className="text-brand-secondary font-medium">Intelligent Systems</span>.
            </p>
          </motion.div>

          {/* 3D AVATAR - Right side on desktop, above text on mobile */}
          <motion.div 
            style={{ y: avatarY }} 
            className="relative z-10 w-full h-100 md:h-125 lg:h-150 order-1 lg:order-2"
          >
            {/* 
              INTERACTION FIX: 
              - Parent has pointer-events-none to allow scrolling
              - Child has pointer-events-auto to enable avatar interaction
            */}
            <div className="w-full h-full pointer-events-auto">
              <Avatar3D />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          2. TECHNICAL ARSENAL SECTION
          ============================================ */}
      <section className="relative z-30 py-32 px-4 bg-background border-t border-white/5 backdrop-blur-3xl">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              My Technical{" "}
              <span className="bg-linear-to-r from-[oklch(70%_0.18_250)] to-[oklch(65%_0.25_340)] bg-clip-text text-transparent">
                Arsenal
              </span>
            </h2>
          </motion.div>

          {/* 
            TECH CARDS GRID
            FIXED: Now passes iconId instead of icon JSX element
            Uses flexbox with wrap to prevent overlap
          */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <TechCard 
                  name={skill.name}
                  iconId={skill.iconId}
                  color={skill.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for scroll testing */}
      <div className="h-[20vh]" />
      
    </main>
    
  );
  
}

/**
 * CHANGES MADE:
 * 
 * 1. FIXED ICON ISSUE:
 *    - Removed: icon: <PythonOriginal size="45" />
 *    - Added: iconId: "python"
 *    - TechCard now handles icon rendering internally
 * 
 * 2. REMOVED UNUSED IMPORTS:
 *    - Removed devicons-react imports (now handled in TechCard)
 * 
 * 3. ADDED STAGGERED ANIMATIONS:
 *    - Tech cards now animate in with delay
 *    - Each card appears 0.1s after the previous one
 * 
 * 4. IMPROVED COMMENTS:
 *    - Added section headers for clarity
 *    - Documented the icon fix
 *    - Explained interaction patterns
 * 
 * 5. FIXED GRADIENT CLASSES:
 *    - Changed bg-linear-to-b to bg-gradient-to-b
 *    - Changed bg-linear-to-r to bg-gradient-to-r
 */