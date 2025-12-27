
import React from 'react';
import { Product } from './types';

export const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'AI Faceless YouTube Mastery Course',
    description: 'Learn how to build a million-subscriber YouTube channel without ever showing your face. Includes prompt engineering and editing secrets.',
    price: 999,
    image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    category: 'Course',
    payment_link: 'https://rzp.io/l/demo1',
    is_active: true,
    features: ['50+ Video Lessons', 'Faceless Strategy PDF', 'Niche Selection Guide']
  },
  {
    id: '2',
    title: 'Lifetime AI Tools Bundle',
    description: 'Get access to 500+ premium AI prompts and tools to automate your business workflow instantly.',
    price: 1499,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    category: 'Digital Product',
    payment_link: 'https://rzp.io/l/demo2',
    is_active: true,
    features: ['500+ Prompts', 'Automations Guide', 'Lifetime Updates']
  },
  {
    id: '3',
    title: 'Video Editing for Beginners',
    description: 'The ultimate guide to Premiere Pro and DaVinci Resolve for total beginners. Edit like a pro in 30 days.',
    price: 799,
    image_url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800',
    category: 'Course',
    payment_link: 'https://rzp.io/l/demo3',
    is_active: true,
    features: ['Transition Packs', 'Color Grading LUTs', 'Project Files']
  }
];

export const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/category/Course' },
  { name: 'Digital Products', path: '/category/Digital Product' },
  { name: 'Offers', path: '/category/Offer' },
  { name: 'Contact', path: '/contact' }
];
