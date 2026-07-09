/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, MapPin, CheckCircle, ShieldAlert, Award, Star } from 'lucide-react';
import { Tour } from '../types';

interface TourDetailModalProps {
  tour: Tour | null;
  onClose: () => void;
  onBookNow: (tour: Tour) => void;
}

export default function TourDetailModal({ tour, onClose, onBookNow }: TourDetailModalProps) {
  if (!tour) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          role="button"
          aria-label="Close detailed itinerary modal"
        />

        {/* Modal Drawer Sheet */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="relative w-full max-w-lg h-full bg-neutral-950/95 backdrop-blur-xl border-l border-emerald-500/10 shadow-2xl flex flex-col z-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-tour-title"
        >
          {/* Header */}
          <div className="p-5 border-b border-emerald-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-5 h-5 animate-spin" style={{ animationDuration: '12s' }}>
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
              <span className="font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
                Itinerary Overview
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer transition-colors"
              aria-label="Close itinerary details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable details wrapper */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {/* Tour Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden h-48 bg-emerald-950/20">
              <img
                src={tour.image}
                alt={tour.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 block mb-1">
                  {tour.destination}
                </span>
                <h3 id="modal-tour-title" className="text-xl font-display font-bold text-white leading-tight">
                  {tour.title}
                </h3>
              </div>
            </div>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-3 gap-2 bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/10 text-center">
              <div>
                <span className="block text-[10px] font-mono text-emerald-400 uppercase">Duration</span>
                <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {tour.duration} Days
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-emerald-400 uppercase">Group Size</span>
                <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Max {tour.groupSize}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-emerald-400 uppercase">Difficulty</span>
                <span className="text-sm font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  {tour.difficulty}
                </span>
              </div>
            </div>

            {/* Full narrative description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                About the Expedition
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                {tour.description}
              </p>
            </div>

            {/* Itinerary Milestones & Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                Exclusive Inclusions & Highlights
              </h4>
              <div className="space-y-2.5">
                {tour.highlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="flex gap-3 items-start bg-neutral-900/50 p-3 rounded-xl border border-neutral-800/60"
                  >
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-emerald-100 font-sans block">
                        Day {index * 2 + 1}: {highlight}
                      </span>
                      <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">
                        Professionally guided session with gourmet meals, certified field gear, and high-contrast scenic transfers included.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Guidelines */}
            <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-xl flex gap-3 items-start">
              <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-white font-sans block">Medical & Physical Safeguards</span>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed font-sans">
                  Requires moderate stamina. We supply fully vetted medical oxygen packs, satellite telecommunication gear, 
                  and individual insurance coverages pre-approved for all hikers and divers.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky footer with price and Call To Action */}
          <div className="p-5 border-t border-emerald-500/10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase block">Total Base Price</span>
              <span className="text-2xl font-bold font-display text-white">
                ${tour.price}
                <span className="text-xs font-normal text-emerald-300 ml-1">/ person</span>
              </span>
            </div>
            <button
              onClick={() => onBookNow(tour)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
            >
              Secure Spots Now
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
