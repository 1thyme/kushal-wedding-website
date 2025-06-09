'use client';

import { useState } from 'react';
import LandingHero from './components/LandingHero';
import EventCard from './components/EventCard';
import PhotoGallery from './components/PhotoGallery';
import { weddingData } from './config/weddingData';
import { QRCodeSVG } from 'qrcode.react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-navy-900">
      {/* Hero Section */}
      <LandingHero />

      {/* Events Section */}
      <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-pink-50 dark:bg-navy-900">
        <div className="max-w-7xl mx-auto">
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

      {/* Photo Gallery Section */}
      <PhotoGallery />

      {/* Contact Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/gallery/landing-page/background-2.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6 text-white">
              Contact Information
            </h2>
            
            <div className="mb-12 text-center">
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                We cordially invite you to join us in celebrating this beautiful union. Your presence will make our special day even more memorable. We look forward to sharing our joy with you and creating cherished memories together.
              </p>
              <p className="text-lg text-rose-300 italic">
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
                  className="p-6 bg-white/10 backdrop-blur-md rounded-xl"
                >
                  <h3 className="text-xl font-medium mb-2 text-white">
                    {contact.name}
                  </h3>
                  <p className="text-white/90 mb-1">{contact.role}</p>
                  <p className="text-white/90 mb-1">{contact.phone}</p>
                  <p className="text-white/90">{contact.email}</p>
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
                <h3 className="text-xl font-light mb-4 text-white">
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
