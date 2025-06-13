'use client';

import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence, motion } from 'framer-motion';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { weddingData } from '../config/weddingData';
import { backgroundImages } from '../config/backgroundImages';

interface UploadFormData {
  name: string;
  event: string;
  caption?: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  className?: string;
}

const categories = Object.entries(weddingData.events).map(([key, event]) => event.name);
categories.unshift('All');

const galleryImages: GalleryImage[] = [
  {
    src: '/gallery/tumblr_808ef5b713afd7bd68377b881baccccd_5792732b_640.jpg',
    alt: 'Pre-wedding Moment',
    category: 'Haldi Ceremony',
    width: 640,
    height: 960,
    className: 'col-span-1 row-span-2' // Tall image
  },
  {
    src: '/gallery/98f177cc0d30f8d5a10b6ca1a5ac984a.jpg',
    alt: 'Couple Portrait',
    category: 'Haldi Ceremony',
    width: 800,
    height: 600,
    className: 'col-span-1 row-span-1'
  },
  {
    src: '/gallery/6dc8f7335e4fd72f05d105c8ad7d498a.jpg',
    alt: 'Romantic Moment',
    category: 'Haldi Ceremony',
    width: 800,
    height: 600,
    className: 'col-span-1 row-span-1'
  },
  {
    src: '/gallery/9e840f4e9bacd4c50deddeff9e493cf7.jpg',
    alt: 'Couple Portrait',
    category: 'Haldi Ceremony',
    width: 800,
    height: 600,
    className: 'grid-cols-4 col-span-1  row-span-1'
  },
  {
    src: '/gallery/88f754a74144e19d7ee8bbf408725f34.jpg',
    alt: 'Couple Portrait',
    category: 'Haldi Ceremony',
    width: 800,
    height: 600,
    className: 'grid-cols-4 col-span-1 row-span-1'
  }
];

export default function PhotoGallery() {
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [uploadFormData, setUploadFormData] = useState<UploadFormData>({
    name: '',
    event: Object.keys(weddingData.events)[0],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Here you would handle the actual form submission
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadModal(false);
    }, 2000);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Here you would implement the actual upload logic
    // For now, we'll just simulate it
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setShowUploadModal(false);
      // You would typically show a success message here
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5242880, // 5MB
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={isDarkMode ? backgroundImages.gallery.dark : backgroundImages.gallery.light}
          alt="Gallery Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-light text-center mb-12 text-navy-800 dark:text-pink-100">
            Photo Gallery
          </h2>
          {/* <button
            onClick={() => setShowUploadModal(true)}
            className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
          >
            Upload Photos Clicked By You :)
          </button> */}
        </div>

        {/* Event Filter */}
        {/* <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedEvent('all')}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedEvent === 'all'
                ? 'bg-rose-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            All Events
          </button>
          {Object.entries(weddingData.events).map(([key, event]) => (
            <button
              key={key}
              onClick={() => setSelectedEvent(key)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedEvent === key
                  ? 'bg-rose-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              {event.name}
            </button>
          ))}
        </div> */}

        {/* Category Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-rose-500 text-white dark:bg-rose-600'
                  : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
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
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredImage === image.src ? 1 : 0,
                    y: hoveredImage === image.src ? 0 : 20
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent flex items-end p-4 group dark:from-black/90"
                >
                  <p className="text-white text-lg font-light transform group-hover:translate-y-0">{image.alt}</p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* <div className="mb-8 flex gap-2 overflow-x-auto pb-2"> */}
        <div className="flex gap-8 overflow-x-auto pb-2  z-10 justify-center items-center mb-8">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
          >
            Upload Photos Clicked By You :)
          </button>
        </div>
        {/* </div> */}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-navy-800 rounded-xl p-6 max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-light text-gray-800 dark:text-white">Upload Photos</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name (optional)
                  </label>
                  <input
                    type="text"
                    value={uploadFormData.name}
                    onChange={(e) =>
                      setUploadFormData({ ...uploadFormData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event
                  </label>
                  <select
                    value={uploadFormData.event}
                    onChange={(e) =>
                      setUploadFormData({ ...uploadFormData, event: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Object.entries(weddingData.events).map(([key, event]) => (
                      <option key={key} value={key}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                    isDragActive
                      ? 'border-rose-500 bg-rose-50 dark:bg-navy-700'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <input {...getInputProps()} />
                  <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Drag & drop photos here, or click to select
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Maximum file size: 5MB
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 dark:bg-rose-600 dark:hover:bg-rose-700"
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 
 