'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Event } from '../types';
import { format, parse } from 'date-fns';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Map = dynamic(() => import('@react-google-maps/api').then(mod => mod.GoogleMap), {
  ssr: false,
});
const Marker = dynamic(() => import('@react-google-maps/api').then(mod => mod.Marker), {
  ssr: false,
});

interface EventCardProps {
  event: Event;
  index: number;
  isOtherHovered: boolean;
  onHover: (isHovered: boolean) => void;
}

const eventAnimations: Record<string, React.ReactNode> = {
  haldi: (
    <motion.div
      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
      animate={{
        y: [0, -10, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-4xl">💛</span>
    </motion.div>
  ),
  mehndi: (
    <motion.div
      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-4xl">🌺</span>
    </motion.div>
  ),
  sangeet: (
    <motion.div
      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <span className="text-4xl">💃</span>
    </motion.div>
  ),
  wedding: (
    <motion.div
      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
      animate={{
        scale: [1, 1.2, 1],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-4xl">💑</span>
    </motion.div>
  ),
  reception: (
    <motion.div
      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
      animate={{
        rotate: [-10, 10, -10],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <span className="text-4xl">🎉</span>
    </motion.div>
  ),
};

const eventBackgrounds = {
  haldi: {
    default: '/gallery/events/2.png',
    hover: '/gallery/events/2.png'
  },
  mehndi: {
    default: '/gallery/events/3.png',
    hover: '/gallery/events/3.png'
  },
  sangeet: {
    default: '/gallery/events/3.png',
    hover: '/gallery/events/4.png'
  },
  wedding: {
    default: '/gallery/events/4.png',
    hover: '/gallery/events/1.png'
  },
  reception: {
    default: '/gallery/events/4.png',
    hover: '/gallery/events/4.png'
  }
};

export default function EventCard({ event, index, isOtherHovered, onHover }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHover(false);
  };

  const addToCalendar = () => {
    const startDate = new Date(`${event.date}T${event.time}`);
    const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.notes || '')}&location=${encodeURIComponent(event.location.address)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const formatTime = (timeString: string) => {
    try {
      const parsedTime = parse(timeString, 'h:mm a', new Date());
      return format(parsedTime, 'h:mm a');
    } catch (error) {
      return timeString;
    }
  };

  const eventKey = event.name.toLowerCase().split(' ')[0];
  const backgrounds = eventBackgrounds[eventKey as keyof typeof eventBackgrounds];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isOtherHovered ? 0.5 : 1,
        y: 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 dark:shadow-navy-900/50"
      style={{ minHeight: '400px' }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={false}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={backgrounds.default}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </motion.div>

      {/* Hover Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={backgrounds.hover}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col">
        {isHovered && eventAnimations[eventKey]}

        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-light text-white dark:text-white">{event.name}</h3>
          <button
            onClick={addToCalendar}
            className="text-pink-300 hover:text-pink-200 dark:text-pink-200 dark:hover:text-pink-100"
          >
            <CalendarIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center text-white/90 dark:text-white/80">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>{format(new Date(event.date), 'EEEE, MMMM do, yyyy')}</span>
        </div>

        <div className="flex items-center text-white/90 dark:text-white/80">
          <ClockIcon className="h-5 w-5 mr-2" />
          <span>{formatTime(event.time)}</span>
        </div>

        <div className="flex items-center text-white/90 dark:text-white/80">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <div>
            <p>{event.location.name}</p>
            <a
              href={event.location.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-300 hover:text-pink-200 dark:text-pink-200 dark:hover:text-pink-100 text-sm"
            >
              View on Map
            </a>
          </div>
        </div>

        {event.notes && (
          <div className="mt-4 p-4 bg-black/30 dark:bg-black/50 backdrop-blur-sm rounded-lg text-white/90 dark:text-white/80 text-sm">
            {event.notes}
          </div>
        )}

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 200 }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 rounded-lg overflow-hidden"
            >
              {event.location.embedUrl ? (
                <iframe
                  src={event.location.embedUrl}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : event.location.coordinates && (
                <Map
                  mapContainerStyle={{ width: '100%', height: '200px' }}
                  center={event.location.coordinates}
                  zoom={15}
                  options={{
                    styles: [
                      {
                        featureType: "all",
                        elementType: "all",
                        stylers: [{ hue: "#ffd5e0" }]
                      }
                    ]
                  }}
                >
                  <Marker position={event.location.coordinates} />
                </Map>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
} 