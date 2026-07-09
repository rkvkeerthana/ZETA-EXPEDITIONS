/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Tour {
  id: string;
  title: string;
  destination: string;
  description: string;
  price: number;
  duration: number; // in days
  image: string;
  category: 'Beach' | 'Mountain' | 'Adventure' | 'Cultural' | 'City';
  rating: number;
  featured: boolean;
  reviews: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: number;
  highlights: string[];
}

export type BgTheme = 'forest' | 'sunset' | 'cosmic' | 'ocean' | 'contrast';

export interface FilterState {
  category: string;
  search: string;
  priceRange: number;
  difficulty: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  message: string;
}
