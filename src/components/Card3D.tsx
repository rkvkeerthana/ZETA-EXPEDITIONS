/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Users, Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Tour } from '../types';

interface Card3DProps {
  tour: Tour;
  onBookClick: (tour: Tour) => void;
  onViewDetailsClick: (tour: Tour) => void;
}

export default function Card3D({ tour, onBookClick, onViewDetailsClick }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Parallax scroll effect reference
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  // Create a subtle parallax vertical offset as user scrolls
  const yOffset = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Width and height of card
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate tilt angle (max 10 degrees)
    const rotateX = -(mouseY / (height / 2)) * 10;
    const rotateY = (mouseX / (width / 2)) * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: yOffset }}
      className="w-full h-full p-[1px] gpu-accel"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="running-border-wrapper w-full h-full cursor-pointer group shadow-2xl transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered 
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)` 
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={() => onViewDetailsClick(tour)}
        id={`tour-card-${tour.id}`}
        role="article"
        aria-labelledby={`tour-title-${tour.id}`}
      >
        {/* Animated Running Border Background */}
        <div className="running-border-bg" />

        {/* Card Content Interior */}
        <div className="running-border-content p-4 flex flex-col h-full justify-between">
          
          {/* Top Section with Same-Size Image */}
          <div className="relative overflow-hidden rounded-xl h-52 w-full mb-4 bg-emerald-950/20">
            {/* Image Parallax zoom effect */}
            <img
              src={tour.image}
              alt={tour.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ contentVisibility: 'auto' }}
            />
            
            {/* Category and Difficulty Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-100 bg-emerald-900/80 backdrop-blur-md rounded-full border border-emerald-500/30">
                {tour.category}
              </span>
              <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border backdrop-blur-md ${
                tour.difficulty === 'Easy' 
                  ? 'bg-blue-900/80 text-blue-100 border-blue-500/30' 
                  : tour.difficulty === 'Moderate' 
                    ? 'bg-amber-900/80 text-amber-100 border-amber-500/30' 
                    : 'bg-rose-900/80 text-rose-100 border-rose-500/30'
              }`}>
                {tour.difficulty}
              </span>
            </div>

            {/* Price overlay */}
            <div className="absolute bottom-3 right-3 px-3 py-1.5 text-sm font-bold text-white bg-emerald-950/90 backdrop-blur-md rounded-lg border border-emerald-500/40">
              ${tour.price} <span className="text-xs font-normal text-emerald-200">/ person</span>
            </div>
          </div>

          {/* Details / Content Body */}
          <div className="flex-grow flex flex-col justify-between">
            <div>
              {/* Destination & Rating */}
              <div className="flex items-center justify-between text-xs text-emerald-400 font-mono mb-2">
                <span className="uppercase tracking-wider">{tour.destination}</span>
                <div className="flex items-center gap-1 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  <span className="font-bold text-emerald-100">{tour.rating}</span>
                  <span className="text-emerald-400/60">({tour.reviews})</span>
                </div>
              </div>

              {/* Title */}
              <h3 
                id={`tour-title-${tour.id}`} 
                className="text-lg font-bold font-display text-emerald-50 leading-snug tracking-tight mb-2 group-hover:text-emerald-300 transition-colors duration-300 line-clamp-1"
              >
                {tour.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-neutral-300 dark:text-neutral-300 line-clamp-2 mb-4 leading-relaxed font-sans">
                {tour.description}
              </p>

              {/* Icon Badges */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-medium text-emerald-200 bg-emerald-950/25 p-2 rounded-lg border border-emerald-500/10">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{tour.duration} Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Max {tour.groupSize} People</span>
                </div>
              </div>

              {/* Highlights Preview */}
              <div className="space-y-1 mb-4">
                {tour.highlights.slice(0, 2).map((hl, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-emerald-500/15">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetailsClick(tour);
                }}
                className="flex-grow py-2 text-xs font-bold text-center border border-emerald-500/30 hover:border-emerald-400 text-emerald-100 hover:text-white rounded-lg transition-all duration-300 bg-emerald-950/20 hover:bg-emerald-900/30 flex items-center justify-center gap-1"
                aria-label={`View detailed itinerary for ${tour.title}`}
              >
                Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookClick(tour);
                }}
                className="px-4 py-2 text-xs font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                aria-label={`Book tour package for ${tour.title}`}
              >
                Book Now
              </button>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}
