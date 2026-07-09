/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BgTheme } from '../types';

interface BackgroundWaveProps {
  theme: BgTheme;
  isDark: boolean;
}

export default function BackgroundWave({ theme, isDark }: BackgroundWaveProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions between -20 and 20 pixels
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme-specific color classes for gradient bubbles
  const getThemeColors = () => {
    switch (theme) {
      case 'forest':
        return {
          bg: isDark ? 'bg-slate-950' : 'bg-stone-50',
          bubble1: 'bg-emerald-500/20 dark:bg-emerald-600/10',
          bubble2: 'bg-teal-500/20 dark:bg-teal-700/10',
          bubble3: 'bg-lime-500/15 dark:bg-lime-600/5',
          glow: 'from-emerald-950/20 to-teal-950/20',
          gridColor: 'rgba(16, 185, 129, 0.04)',
        };
      case 'sunset':
        return {
          bg: isDark ? 'bg-zinc-950' : 'bg-orange-50/40',
          bubble1: 'bg-rose-500/20 dark:bg-rose-600/10',
          bubble2: 'bg-amber-500/20 dark:bg-amber-700/10',
          bubble3: 'bg-pink-500/15 dark:bg-pink-600/5',
          glow: 'from-rose-950/15 to-amber-950/15',
          gridColor: 'rgba(244, 63, 94, 0.04)',
        };
      case 'cosmic':
        return {
          bg: isDark ? 'bg-gray-950' : 'bg-purple-50/40',
          bubble1: 'bg-indigo-500/25 dark:bg-indigo-600/10',
          bubble2: 'bg-violet-500/20 dark:bg-violet-700/10',
          bubble3: 'bg-fuchsia-500/15 dark:bg-fuchsia-600/5',
          glow: 'from-indigo-950/20 to-purple-950/20',
          gridColor: 'rgba(124, 58, 237, 0.04)',
        };
      case 'ocean':
        return {
          bg: isDark ? 'bg-slate-950' : 'bg-sky-50/40',
          bubble1: 'bg-cyan-500/20 dark:bg-cyan-600/10',
          bubble2: 'bg-blue-500/20 dark:bg-blue-700/10',
          bubble3: 'bg-sky-500/15 dark:bg-sky-600/5',
          glow: 'from-cyan-950/20 to-blue-950/20',
          gridColor: 'rgba(6, 182, 212, 0.04)',
        };
      case 'contrast':
        return {
          bg: isDark ? 'bg-black' : 'bg-white',
          bubble1: 'bg-neutral-800/10 dark:bg-neutral-200/5',
          bubble2: 'bg-neutral-700/10 dark:bg-neutral-300/5',
          bubble3: 'bg-neutral-900/5 dark:bg-neutral-100/5',
          glow: 'from-black to-black',
          gridColor: 'rgba(255, 255, 255, 0.03)',
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className={`fixed inset-0 -z-50 overflow-hidden transition-colors duration-700 ease-in-out ${colors.bg}`}>
      {/* Dynamic interactive glow gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${colors.glow} opacity-60 pointer-events-none`} />

      {/* Grid line texture (Toodle/Doodle subtle cyber mesh) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(${colors.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${colors.gridColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Fluid glowing organic blobs (Floating "toodles") */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Blob 1 */}
          <div
            className={`absolute top-10 left-1/4 w-[35rem] h-[35rem] rounded-full blur-[90px] bubble-anim-1 transition-colors duration-1000 ${colors.bubble1}`}
            style={{
              transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`,
            }}
          />

          {/* Blob 2 */}
          <div
            className={`absolute bottom-20 right-1/4 w-[40rem] h-[40rem] rounded-full blur-[100px] bubble-anim-2 transition-colors duration-1000 ${colors.bubble2}`}
            style={{
              transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`,
            }}
          />

          {/* Blob 3 */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full blur-[80px] bubble-anim-3 transition-colors duration-1000 ${colors.bubble3}`}
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * -0.4}px, 0)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Background Interactive Flying Particles (Doodle Sparkles) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-35 dark:opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-400 dark:bg-emerald-300"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transition: 'transform 1.2s ease-out',
              transform: `translate3d(${mousePos.x * (0.2 + (i % 5) * 0.1)}px, ${mousePos.y * (0.2 + (i % 5) * 0.1)}px, 0)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
