'use client';

import { useState, useEffect } from 'react';
import LandingHero from './components/LandingHero';
import EventCard from './components/EventCard';
import PhotoGallery from './components/PhotoGallery';
import FadeInSection from './components/FadeInSection';
import { weddingData } from './config/weddingData';
import { backgroundImages } from './config/backgroundImages';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
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

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-navy-900">
      {/* Hero Section */}
      <LandingHero />

      {/* Events Section */}
      {/* <FadeInSection className="relative"> */}
        <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={isDarkMode ? backgroundImages.events.dark : backgroundImages.events.light}
              alt="Events Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="text-3xl font-light text-center mb-12 text-navy-800 dark:text-pink-100">
              Wedding Events
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(weddingData.events).map(([key, event], index) => (
                <EventCard
                  key={key}
                  event={event}
                  index={index}
                  isOtherHovered={hoveredEvent !== null && hoveredEvent !== key}
                  onHover={(isHovered) => setHoveredEvent(isHovered ? key : null)}
                />
              ))}
            </div>
          </div>
        </section>
      {/* </FadeInSection> */}

      {/* Photo Gallery Section */}
      {/* <FadeInSection className="relative"> */}
        <PhotoGallery />
      {/* </FadeInSection> */}

      {/* Contact Section */}
      {/* <FadeInSection className="relative"> */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={isDarkMode ? backgroundImages.contact.dark : backgroundImages.contact.light}
              alt="Contact Background"
              fill
              className="object-cover"
              priority
            />
            {/* <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-10" /> */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-dark mb-6 text-navy-800 dark:text-pink-100">
                Contact Information
              </h2>
              
              <div className="mb-12 text-center">
                <p className="text-xl text-navy-800 dark:text-pink-100/90 mb-6 leading-relaxed">
                  We cordially invite you to join us in celebrating this beautiful union. Your presence will make our special day even more memorable. We look forward to sharing our joy with you and creating cherished memories together.
                </p>
                <p className="text-lg text-rose-700 italic">
                  "A wedding is not just the celebration of love, it's the coming together of families and friends."
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {weddingData.contacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 bg-pink-800/10 backdrop-blur-md rounded-xl"
                  >
                    <h3 className="text-xl font-medium mb-2 text-navy-800 dark:text-pink-100">
                      {contact.name}
                    </h3>
                    <p className="text-navy-800 dark:text-pink-100 mb-1">{contact.role}</p>
                    <p className="text-navy-800 dark:text-pink-100 mb-1">{contact.phone}</p>
                    <p className="text-navy-800 dark:text-pink-100">{contact.email}</p>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Group QR Code */}
              {weddingData.whatsappGroup && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12"
                >
                  <h3 className="text-xl font-light mb-4 text-navy-800 dark:text-pink-100">
                    Join our WhatsApp Group
                  </h3>
                  <div className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-xl">
                    <QRCodeSVG value={weddingData.whatsappGroup} size={200} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      {/* </FadeInSection> */}

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-navy-600 dark:text-pink-200 bg-pink-50 dark:bg-navy-900">
        <p>
          {weddingData.brideFirstName} & {weddingData.groomFirstName}'s Wedding
          {' • '}
          {new Date(weddingData.weddingDate).getFullYear()}
        </p>
      </footer>
    </div>
  );
}
