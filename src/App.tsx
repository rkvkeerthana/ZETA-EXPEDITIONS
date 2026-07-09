/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Eye, ShieldCheck, HelpCircle, 
  Sparkles, SlidersHorizontal, ArrowDown, Award, Trees, Heart, Landmark 
} from 'lucide-react';

import { Tour, BgTheme, FilterState } from './types';
import { TOURS_DATA } from './data/tours';
import BackgroundWave from './components/BackgroundWave';
import Navbar from './components/Navbar';
import Card3D from './components/Card3D';
import ContactForm from './components/ContactForm';
import TourDetailModal from './components/TourDetailModal';

export default function App() {
  // Theme & Accessibility States
  const [currentTheme, setCurrentTheme] = useState<BgTheme>(() => {
    const saved = localStorage.getItem('zeta-bg-theme');
    return (saved as BgTheme) || 'forest';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('zeta-dark-mode');
    return saved !== 'false'; // Default to true (dark mode)
  });

  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Core Data / Modal States
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  const [detailTour, setDetailTour] = useState<Tour | null>(null);

  // Filter States
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    search: '',
    priceRange: 3500,
    difficulty: 'All',
  });

  // Keep dark mode state persistent in DOM & local storage
  useEffect(() => {
    localStorage.setItem('zeta-dark-mode', String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('zeta-bg-theme', currentTheme);
    // If user selects contrast, automatically trigger highContrast mode
    if (currentTheme === 'contrast') {
      setHighContrast(true);
    } else {
      setHighContrast(false);
    }
  }, [currentTheme]);

  // Handle smooth scroll navigation
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookClick = (tour: Tour) => {
    setBookingTour(tour);
    scrollToSection('contact-section');
  };

  const handleViewDetails = (tour: Tour) => {
    setDetailTour(tour);
  };

  // Filter computation logic memoized for fast GPU loading
  const filteredTours = useMemo(() => {
    return TOURS_DATA.filter((tour) => {
      const matchesSearch = 
        tour.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.destination.toLowerCase().includes(filters.search.toLowerCase()) ||
        tour.highlights.some(h => h.toLowerCase().includes(filters.search.toLowerCase()));

      const matchesCategory = 
        filters.category === 'All' || 
        tour.category === filters.category;

      const matchesDifficulty = 
        filters.difficulty === 'All' || 
        tour.difficulty === filters.difficulty;

      const matchesPrice = tour.price <= filters.priceRange;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice;
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      category: 'All',
      search: '',
      priceRange: 3500,
      difficulty: 'All',
    });
  };

  const categories = ['All', 'Beach', 'Mountain', 'Adventure', 'Cultural', 'City'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

  return (
    <div className={`min-h-screen text-neutral-100 dark:text-neutral-100 transition-colors duration-500 font-sans ${highContrast ? 'contrast-125' : ''}`}>
      {/* Immersive Animated Background Canvas */}
      <BackgroundWave theme={currentTheme} isDark={isDark} />

      {/* Interactive Sticky Glassmorphic Navbar */}
      <Navbar 
        currentTheme={currentTheme} 
        setTheme={setCurrentTheme} 
        isDark={isDark} 
        setIsDark={setIsDark} 
        onNavClick={scrollToSection} 
      />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center pt-24 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle decorative glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl relative z-10">
          {/* Dynamic Typographic Title with staggered slide-up */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-display font-black leading-none tracking-tight text-white uppercase"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 font-extrabold shadow-sm drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">Prisitine</span> Landmarks
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-lg text-neutral-300 dark:text-neutral-300 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Discover breathtaking global destinations, customized itineraries, and secure online bookings. 
            Embark on curated, premium travel expeditions with professional local guides.
          </motion.p>

          {/* Search Box & Simple Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto w-full pt-4"
          >
            <div className="glass-card p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl border border-emerald-500/25">
              <div className="relative w-full flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/60" />
                <input
                  type="text"
                  placeholder="Search countries, highlights, itineraries..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full bg-transparent pl-12 pr-4 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-none focus:ring-0"
                  aria-label="Search destinations"
                />
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('tours-list')}
                className="w-full sm:w-auto h-11 px-6 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                Scan Packages
                <ArrowDown className="w-4 h-4 text-slate-950 animate-bounce" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-6 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Scroll to Discover</span>
          <div className="w-6 h-10 border-2 border-emerald-500/40 rounded-full flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full" 
            />
          </div>
        </div>
      </section>

      {/* STATS BENTO BOARD SECTION */}
      <section id="statistics" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">Statistical Metrics</span>
          <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mt-1">Our Expeditions by the Numbers</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bento Box 1 */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors" />
            <Trees className="w-10 h-10 text-emerald-400 mb-4" />
            <div className="text-3xl font-display font-black text-white">85+</div>
            <div className="text-sm font-semibold text-emerald-100 mt-1">Pristine Hotspots</div>
            <p className="text-xs text-neutral-400 mt-2 font-sans">Remote volcanic ridges, isolated beaches, and unique cultural capitals fully pre-vetted.</p>
          </div>

          {/* Bento Box 2 */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors" />
            <Heart className="w-10 h-10 text-rose-400 mb-4" />
            <div className="text-3xl font-display font-black text-white">24,000+</div>
            <div className="text-sm font-semibold text-emerald-100 mt-1">Happy Explorers</div>
            <p className="text-xs text-neutral-400 mt-2 font-sans">Individuals from 60+ countries returning with lifetime photographic memories.</p>
          </div>

          {/* Bento Box 3 */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors" />
            <Award className="w-10 h-10 text-amber-400 mb-4" />
            <div className="text-3xl font-display font-black text-white">4.95 / 5</div>
            <div className="text-sm font-semibold text-emerald-100 mt-1">Average Star Rating</div>
            <p className="text-xs text-neutral-400 mt-2 font-sans">Highly acclaimed ratings audited independently for meals, lodging, and guides.</p>
          </div>

          {/* Bento Box 4 */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/10 hover:border-emerald-500/30 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors" />
            <Landmark className="w-10 h-10 text-emerald-400 mb-4" />
            <div className="text-3xl font-display font-black text-white">100%</div>
            <div className="text-sm font-semibold text-emerald-100 mt-1">Eco Carbon Offset</div>
            <p className="text-xs text-neutral-400 mt-2 font-sans">Committed to low-impact camping, certified solar transports, and local tree seed funding.</p>
          </div>
        </div>
      </section>

      {/* EXPLORE TOURS GRID & CONTROLLERS SECTION */}
      <section id="tours-list" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">Live Catalogs</span>
            <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight mt-1">
              Select Your Expeditions
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl font-sans">
              Filter by category, range limits, or path complexities. Hover on cards for elegant 3D tilt effects and active line glows.
            </p>
          </div>

          {/* Mobile responsive search inside directory */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/50" />
              <input
                type="text"
                placeholder="Search country name..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-900/60 hover:bg-neutral-900/80 border border-emerald-500/15 focus:border-emerald-400 focus:outline-none rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTER SETTINGS (Left side on big screens) */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/10 sticky top-24">
              <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-4 mb-4">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                <span className="font-display font-bold text-sm uppercase tracking-wide text-white">Filter Parameters</span>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs text-neutral-300 font-semibold font-mono">
                  <span>PRICE CAP:</span>
                  <span className="text-emerald-400">${filters.priceRange}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="4000"
                  step="100"
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
                  aria-label="Price range filter"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>$1,000</span>
                  <span>$4,000</span>
                </div>
              </div>

              {/* Difficulty Levels selectors */}
              <div className="space-y-2 mb-6">
                <span className="block text-xs font-bold font-mono text-neutral-300 uppercase">Complexity Level:</span>
                <div className="space-y-1.5">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, difficulty: diff }))}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        filters.difficulty === diff
                          ? 'bg-emerald-950/40 border-emerald-400 text-emerald-300'
                          : 'bg-transparent border-neutral-800 hover:border-emerald-500/20 text-neutral-400 hover:text-white'
                      }`}
                      aria-label={`Difficulty level: ${diff}`}
                    >
                      <span>{diff}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        diff === 'Easy' 
                          ? 'bg-blue-400' 
                          : diff === 'Moderate' 
                            ? 'bg-amber-400' 
                            : diff === 'Challenging' 
                              ? 'bg-rose-400' 
                              : 'bg-emerald-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset filter button */}
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-2 bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-300 hover:text-white rounded-xl text-xs font-bold transition-all"
              >
                Clear All Constraints
              </button>
            </div>
          </aside>

          {/* RIGHT SIDE: CATEGORY PILLS & MAIN TOUR CARDS GRID */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Horizontal Category Pill Scrollbar */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth" role="tablist" aria-label="Tour categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={filters.category === cat}
                  onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    filters.category === cat
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.2)] scale-105'
                      : 'bg-neutral-900/50 hover:bg-emerald-950/10 border border-neutral-800 hover:border-emerald-500/20 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tours Grid listing */}
            <AnimatePresence mode="popLayout">
              {filteredTours.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredTours.map((tour) => (
                    <div key={tour.id} className="min-h-[460px] max-h-[500px]">
                      <Card3D 
                        tour={tour} 
                        onBookClick={handleBookClick} 
                        onViewDetailsClick={handleViewDetails} 
                      />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-16 text-center bg-neutral-900/30 rounded-3xl border border-neutral-800 max-w-md mx-auto"
                >
                  <Search className="w-12 h-12 text-neutral-500 mx-auto mb-4 animate-bounce" />
                  <h4 className="text-lg font-display font-bold text-white mb-1">No Matching Expeditions</h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed mb-6">
                    Try adjusting your budget slider, lowering difficulties, or checking spelling of your country destination.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl transition-all"
                  >
                    Reset Filter Constraints
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </section>

      {/* CONTACT FORM AND VALIDATED RESERVATIONS */}
      <section className="py-12 relative z-10">
        <ContactForm 
          selectedTour={bookingTour} 
          clearSelectedTour={() => setBookingTour(null)} 
        />
      </section>

      {/* ITINERARY DRAWER DETAIL MODAL */}
      <TourDetailModal 
        tour={detailTour} 
        onClose={() => setDetailTour(null)} 
        onBookNow={(tour) => {
          setDetailTour(null);
          handleBookClick(tour);
        }} 
      />

      {/* GLOBAL FOOTER */}
      <footer className="border-t border-emerald-500/10 bg-neutral-950/80 backdrop-blur-md py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="w-6 h-6">
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
              <span className="font-display font-bold text-lg text-white uppercase tracking-wider">
                TOURS & TRAVELS
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Eco-certified travel concierge specialized in custom expedition packages, high-end mountain trail climbing, 
              and beautiful marine bio-reserve diving tours since 2018.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-4">Quick Shortcuts</h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-300">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-emerald-400 transition-colors">
                  Top of Platform
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('tours-list')} className="hover:text-emerald-400 transition-colors">
                  Expedition Grid
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('statistics')} className="hover:text-emerald-400 transition-colors">
                  Independent Metrics
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact-section')} className="hover:text-emerald-400 transition-colors">
                  concierge bookings
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-4">Support & Guides</h4>
            <ul className="space-y-2 text-xs font-medium text-neutral-300">
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Safety Guidelines</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">FAQ Hub</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Terms & Private Coverage</span></li>
              <li><span className="hover:text-emerald-400 transition-colors cursor-pointer">Local Tree Seed Funds</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-4">Accessibility Toggle</h4>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-sans">
              Designed with proper contrast and compatible with screen readers. Toggle special contrast configurations:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setHighContrast(!highContrast)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold font-mono transition-all ${
                  highContrast 
                    ? 'bg-emerald-400 text-slate-950 border-emerald-400' 
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-emerald-500/20'
                }`}
                aria-label="Toggle High Contrast Theme"
              >
                {highContrast ? 'HIGH CONTRAST: ON' : 'HIGH CONTRAST: OFF'}
              </button>
            </div>
          </div>

        </div>

        {/* Footer Base copyright line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-emerald-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Zeta Expeditions Inc. Licensed under Apache-2.0.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Twitter / X</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">Instagram</span>
            <span className="hover:text-emerald-400 transition-colors cursor-pointer">GitHub Repository</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
