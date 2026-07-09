/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { Tour, ContactFormInput } from '../types';

interface ContactFormProps {
  selectedTour: Tour | null;
  clearSelectedTour: () => void;
}

export default function ContactForm({ selectedTour, clearSelectedTour }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill message if a tour is chosen
  useEffect(() => {
    if (selectedTour) {
      setFormData((prev) => ({
        ...prev,
        message: `Hello! I would like to book the "${selectedTour.title}" package located in ${selectedTour.destination} ($${selectedTour.price}/person). Please contact me with availability and details!`,
      }));
    }
  }, [selectedTour]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as they type
    if (errors[name as keyof ContactFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormInput> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (formData.phone.trim() && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid telephone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message details are required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must contain at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server side request for premium feels
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      clearSelectedTour();
    }, 1500);
  };

  return (
    <motion.section
      id="contact-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto px-4 py-12 relative z-10"
      aria-label="Contact and booking form"
    >
      <div className="running-border-wrapper shadow-2xl">
        <div className="running-border-bg" />
        
        <div className="running-border-content p-6 sm:p-10 text-left">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="contact-form-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-8">
                  <div className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-2">
                    Start Your Adventure
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-3">
                    Inquire or Book a Tour
                  </h2>
                  <p className="text-sm text-neutral-300 max-w-2xl leading-relaxed">
                    Have questions about itineraries, customized packages, or private group bookings? 
                    Fill in your contact information below and our team will plan your dream expedition.
                  </p>
                </div>

                {selectedTour && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                        Selected Package
                      </span>
                      <span className="font-bold text-white font-display text-sm">{selectedTour.title}</span>
                      <span className="text-xs text-emerald-200 block mt-0.5">{selectedTour.destination} — ${selectedTour.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={clearSelectedTour}
                      className="px-3 py-1.5 text-xs font-bold text-emerald-300 hover:text-white hover:bg-emerald-900/40 rounded-lg border border-emerald-500/20 transition-all cursor-pointer h-10 flex items-center justify-center min-w-[80px]"
                      aria-label="Remove selected tour"
                    >
                      Clear
                    </button>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-xs font-semibold text-emerald-300 uppercase font-mono">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`w-full pl-10 pr-4 py-3 bg-neutral-900/60 hover:bg-neutral-900/90 border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.name 
                              ? 'border-rose-500 focus:ring-rose-500/20' 
                              : 'border-emerald-500/20 hover:border-emerald-500/40 focus:ring-emerald-500/30 focus:border-emerald-400'
                          }`}
                          aria-invalid={errors.name ? 'true' : 'false'}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          required
                        />
                      </div>
                      {errors.name && (
                        <p id="name-error" className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-sans">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email input */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-emerald-300 uppercase font-mono">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-3 bg-neutral-900/60 hover:bg-neutral-900/90 border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                            errors.email 
                              ? 'border-rose-500 focus:ring-rose-500/20' 
                              : 'border-emerald-500/20 hover:border-emerald-500/40 focus:ring-emerald-500/30 focus:border-emerald-400'
                          }`}
                          aria-invalid={errors.email ? 'true' : 'false'}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          required
                        />
                      </div>
                      {errors.email && (
                        <p id="email-error" className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-sans">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone input */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-emerald-300 uppercase font-mono">
                      Phone Number <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-900/60 hover:bg-neutral-900/90 border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.phone 
                            ? 'border-rose-500 focus:ring-rose-500/20' 
                            : 'border-emerald-500/20 hover:border-emerald-500/40 focus:ring-emerald-500/30 focus:border-emerald-400'
                        }`}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-sans">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message input */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="block text-xs font-semibold text-emerald-300 uppercase font-mono">
                      Message details <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-4.5 w-4 h-4 text-emerald-500/50" />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your trip plans, duration, specific landmarks you would like to explore..."
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-900/60 hover:bg-neutral-900/90 border rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all min-h-[120px] ${
                          errors.message 
                            ? 'border-rose-500 focus:ring-rose-500/20' 
                              : 'border-emerald-500/20 hover:border-emerald-500/40 focus:ring-emerald-500/30 focus:border-emerald-400'
                        }`}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        required
                      />
                    </div>
                    {errors.message && (
                      <p id="message-error" className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-sans">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] cursor-pointer flex items-center justify-center gap-2 select-none"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Expedition Request...
                        </>
                      ) : (
                        <>
                          Send Expedition Request
                          <Send className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-950/50 border-2 border-emerald-400 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-3">
                  Expedition Form Received!
                </h2>
                <p className="text-sm text-neutral-300 max-w-lg leading-relaxed mb-8">
                  Congratulations! Your request has been validated. Our travel concierge is preparing custom quotes, 
                  itinerary upgrades, and flight configurations. We will reach out to you within the hour.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 h-11 bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-white rounded-xl transition-all cursor-pointer font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </motion.section>
  );
}
