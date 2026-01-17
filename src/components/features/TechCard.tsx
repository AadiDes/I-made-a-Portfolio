"use client";

import Tilt from "react-parallax-tilt";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  SiPython, 
  SiReact, 
  SiCplusplus,
  SiOpenjdk
} from 'react-icons/si';

interface TechProps {
  name: string;
  iconId: string;
  color: string;
}

export default function TechCard({ name, iconId, color }: TechProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * ICON RENDERER using react-icons
   * These icons are proven to work with Next.js
   */
  const renderIcon = () => {
    const iconProps = {
      size: 48,
      className: "drop-shadow-lg"
    };
    
    switch (iconId) {
      case 'python':
        return <SiPython {...iconProps} style={{ color: '#3776AB' }} />;
      case 'react':
        return <SiReact {...iconProps} style={{ color: '#61DAFB' }} />;
      case 'java':
        return <SiOpenjdk {...iconProps} style={{ color: '#007396' }} />;
      case 'cpp':
        return <SiCplusplus {...iconProps} style={{ color: '#00599C' }} />;
      default:
        return (
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white/50 text-xs">
            ?
          </div>
        );
    }
  };

  if (!mounted) {
    return (
      <div className="w-36 h-44 md:w-40 md:h-48 bg-[oklch(15%_0.02_260)] rounded-2xl animate-pulse" />
    );
  }

  return (
    <Tilt
      perspective={1200}
      glareEnable={true}
      glareMaxOpacity={0.05}
      glareColor={color}
      glarePosition="all"
      glareBorderRadius="1rem"
      scale={1.05}
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      className="w-36 h-44 md:w-40 md:h-48"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full h-full group cursor-pointer"
      >
        <div 
          className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-15 blur-2xl transition-all duration-500 -z-10"
          style={{ background: color }}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[oklch(15%_0.02_260)] backdrop-blur-xl overflow-hidden">
          
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col items-center gap-4 px-4">
            
            <div className="relative flex items-center justify-center w-16 h-16">
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-2xl transition-all duration-500"
                style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
              />
              
              <motion.div 
                className="relative z-20 flex items-center justify-center brightness-110 group-hover:brightness-150 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {renderIcon()}
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-[oklch(70%_0.18_250)] transition-colors duration-300">
                Tech
              </span>
              
              <h3 className="text-sm md:text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
                {name}
              </h3>
            </div>
          </div>

          <div 
            className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-20 group-hover:opacity-100 transition-all duration-500"
            style={{ background: color }} 
          />
        </div>
      </motion.div>
    </Tilt>
  );
}

/**
 * CHANGES:
 * - Switched from devicons-react to react-icons
 * - react-icons works reliably with Next.js (no SSR issues)
 * - Icons include official brand colors
 * - SiPython, SiReact, SiCplusplus, SiOpenjdk are simple-icons
 */