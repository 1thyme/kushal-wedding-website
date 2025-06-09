'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  className?: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/gallery/tumblr_808ef5b713afd7bd68377b881baccccd_5792732b_640.jpg',
    alt: 'Pre-wedding Moment',
    category: 'Pre-wedding',
    width: 640,
    height: 960,
    className: 'col-span-1 row-span-2' // Tall image
  },
  {
    src: '/gallery/98f177cc0d30f8d5a10b6ca1a5ac984a.jpg',
    alt: 'Couple Portrait',
    category: 'Pre-wedding',
    width: 800,
    height: 600,
    className: 'col-span-1 row-span-1'
  },
  {
    src: '/gallery/9e840f4e9bacd4c50deddeff9e493cf7.jpg',
    alt: 'Romantic Moment',
    category: 'Pre-wedding',
    width: 800,
    height: 600,
    className: 'col-span-1 row-span-1'
  }
];

const categories = ['All', 'Pre-wedding', 'Haldi', 'Mehndi', 'Sangeet', 'Wedding', 'Reception'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50 dark:bg-navy-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center mb-12 text-navy-800 dark:text-pink-100">
          Our Moments
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white'
                  : 'bg-white dark:bg-navy-800 text-navy-600 dark:text-pink-200 hover:bg-pink-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`relative overflow-hidden rounded-lg ${image.className}`}
                onHoverStart={() => setHoveredImage(image.src)}
                onHoverEnd={() => setHoveredImage(null)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredImage === image.src ? 1 : 0,
                    y: hoveredImage === image.src ? 0 : 20
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent flex items-end p-4 group"
                >
                  <p className="text-white text-lg font-light transform transition-transform group-hover:translate-y-0">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 