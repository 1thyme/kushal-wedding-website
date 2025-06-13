'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { format, intervalToDuration } from 'date-fns';
import { weddingData } from '../config/weddingData';
import { backgroundImages } from '../config/backgroundImages';
import Image from 'next/image';

const calculateTimeLeft = (targetDate: string) => {
  const now = new Date();
  const target = new Date(targetDate);
  const diffInSeconds = Math.max(Math.floor((target.getTime() - now.getTime()) / 1000), 0);

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
  const seconds = diffInSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export default function LandingHero() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(weddingData.weddingDate));
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingData.weddingDate));
    }, 1000);
  
    return () => clearInterval(timer);
  }, []);

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
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={isDarkMode ? backgroundImages.hero.dark : backgroundImages.hero.light}
          alt="Wedding Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative min-h-screen flex flex-col items-center justify-center p-4 text-white z-10"
      >
        <div className="text-center space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-xl">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-light mb-4 text-white drop-shadow-lg">
              {weddingData.brideFirstName} & {weddingData.groomFirstName}
            </h1>
            <p className="text-2xl md:text-3xl font-light text-white/90 drop-shadow-md">
              {format(new Date(weddingData.weddingDate), "MMMM do, yyyy")}
            </p>
            {weddingData.weddingHashtag && (
              <p className="text-xl md:text-2xl font-light text-rose-300 mt-2 drop-shadow-md">
                {weddingData.weddingHashtag}
              </p>
            )}
          </motion.div>

          {timeLeft && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-4 gap-4 text-center max-w-lg mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-light">{timeLeft.days}</div>
                <div className="text-sm text-white/90">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-light">{timeLeft.hours}</div>
                <div className="text-sm text-white/90">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-light">{timeLeft.minutes}</div>
                <div className="text-sm text-white/90">Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
                <div className="text-3xl font-light">{timeLeft.seconds}</div>
                <div className="text-sm text-white/90">Seconds</div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <button
              onClick={() =>
                document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 shadow-lg hover:shadow-xl"
            >
              View Events
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}