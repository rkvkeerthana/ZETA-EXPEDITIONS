/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Palette, Eye } from 'lucide-react';
import { BgTheme } from '../types';

interface NavbarProps {
  currentTheme: BgTheme;
  setTheme: (theme: BgTheme) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onNavClick: (sectionId: string) => void;
}

export default function Navbar({ currentTheme, setTheme, isDark, setIsDark, onNavClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Tours', id: 'tours-list' },
    { name: 'Stats', id: 'statistics' },
    { name: 'Contact', id: 'contact-section' },
  ];

  // Map theme name to a human-readable name and descriptive visual dot
  const themes: { id: BgTheme; name: string; dotClass: string }[] = [
    { id: 'forest', name: 'Emerald Forest', dotClass: 'bg-emerald-500' },
    { id: 'sunset', name: 'Sunset Amber', dotClass: 'bg-orange-500' },
    { id: 'cosmic', name: 'Cosmic Violet', dotClass: 'bg-purple-500' },
    { id: 'ocean', name: 'Oceanic Azure', dotClass: 'bg-cyan-500' },
    { id: 'contrast', name: 'High Contrast', dotClass: 'bg-neutral-500' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-neutral-950/80 backdrop-blur-md border-b border-emerald-500/10 shadow-lg' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo and Brand */}
        <div 
          onClick={() => onNavClick('home')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="navbar-logo"
          role="button"
          tabIndex={0}
          aria-label="Tours and Travels home page"
        >
          <div className="relative p-1.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-7 h-7">
              <circle cx="32" cy="32" r="32" fill="#0a1a0f"/>
              <rect x="10" y="22" width="44" height="22" rx="4" fill="#10b981"/>
              <rect x="44" y="25" width="7" height="10" rx="2" fill="#064e3b" opacity="0.8"/>
              <rect x="13" y="25" width="8" height="8" rx="1.5" fill="#064e3b" opacity="0.8"/>
              <rect x="24" y="25" width="8" height="8" rx="1.5" fill="#064e3b" opacity="0.8"/>
              <rect x="35" y="25" width="7" height="8" rx="1.5" fill="#064e3b" opacity="0.8"/>
              <rect x="14" y="33" width="6" height="11" rx="1" fill="#064e3b" opacity="0.6"/>
              <circle cx="20" cy="44" r="6" fill="#064e3b"/>
              <circle cx="20" cy="44" r="3" fill="#10b981"/>
              <circle cx="44" cy="44" r="6" fill="#064e3b"/>
              <circle cx="44" cy="44" r="3" fill="#10b981"/>
              <rect x="52" y="29" width="3" height="4" rx="1" fill="#a7f3d0"/>
              <rect x="12" y="19" width="38" height="4" rx="2" fill="#059669"/>
            </svg>
          </div>
          <div>
            <span className="font-display font-bold text-lg text-white uppercase tracking-wider group-hover:text-emerald-300 transition-colors">
              TOURS & TRAVELS
            </span>
            <span className="block text-[9px] font-mono text-emerald-400 tracking-widest leading-none">
              ZETA EXPEDITIONS
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Desktop Navigation">
          {navLinks.map((link, idx) => (
            <button
              key={link.id}
              onClick={() => onNavClick(link.id)}
              className="relative text-sm font-semibold tracking-wide text-neutral-300 hover:text-emerald-400 transition-colors duration-300 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 rounded px-1 group"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Configuration Controllers (Theme dropdown and Dark Mode) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Background Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              onBlur={() => setTimeout(() => setThemeDropdownOpen(false), 200)}
              className="p-2 text-neutral-300 hover:text-emerald-400 bg-neutral-900/50 hover:bg-emerald-950/30 border border-neutral-800 hover:border-emerald-500/30 rounded-xl transition-all duration-300 flex items-center gap-1.5 focus:ring-2 focus:ring-emerald-500/40"
              aria-haspopup="listbox"
              aria-expanded={themeDropdownOpen}
              aria-label="Select ambient background style"
            >
              <Palette className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-semibold capitalize font-sans">{currentTheme}</span>
            </button>

            <AnimatePresence>
              {themeDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 rounded-2xl bg-neutral-900/95 backdrop-blur-md border border-emerald-500/20 p-2 shadow-2xl z-50"
                  role="listbox"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold font-mono tracking-widest text-emerald-400 uppercase border-b border-emerald-500/10 mb-1">
                    Ambient Toodle Color
                  </div>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl hover:bg-emerald-950/30 hover:text-emerald-300 transition-all text-left ${
                        currentTheme === t.id ? 'bg-emerald-950/40 text-emerald-300 border-l-2 border-emerald-400' : 'text-neutral-300'
                      }`}
                      role="option"
                      aria-selected={currentTheme === t.id}
                    >
                      <span>{t.name}</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${t.dotClass} shadow-sm`} />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-neutral-300 hover:text-emerald-400 bg-neutral-900/50 hover:bg-emerald-950/30 border border-neutral-800 hover:border-emerald-500/30 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-emerald-500/40"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>
        </div>

        {/* Mobile menu and setting controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick theme selector button for mobile */}
          <button
            onClick={() => {
              const themesOrder: BgTheme[] = ['forest', 'sunset', 'cosmic', 'ocean', 'contrast'];
              const nextIndex = (themesOrder.indexOf(currentTheme) + 1) % themesOrder.length;
              setTheme(themesOrder[nextIndex]);
            }}
            className="p-2 text-neutral-300 bg-neutral-900/50 border border-neutral-800 rounded-xl"
            aria-label="Cycle ambient background color"
          >
            <Palette className="w-5 h-5 text-emerald-400" />
          </button>

          {/* Quick theme selector button for Dark/Light on mobile */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-neutral-300 bg-neutral-900/50 border border-neutral-800 rounded-xl"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-emerald-400 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-emerald-500/40"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Slide down menu) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-950 border-b border-emerald-500/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavClick(link.id);
                  }}
                  className="block w-full text-left py-3 px-4 rounded-xl text-neutral-200 hover:text-white hover:bg-emerald-950/20 border border-transparent hover:border-emerald-500/10 font-semibold transition-all"
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-4 border-t border-emerald-500/10 flex flex-wrap gap-2 items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">Ambient Palette:</span>
                <div className="flex gap-1.5">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`w-6 h-6 rounded-full ${t.dotClass} border-2 ${
                        currentTheme === t.id ? 'border-white scale-110' : 'border-transparent opacity-60'
                      }`}
                      aria-label={`Switch to ${t.name} theme`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
