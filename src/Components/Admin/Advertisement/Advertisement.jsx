'use client';

import React, { useEffect, useState } from 'react';
import { Dumbbell, CalendarCheck, Phone, AlarmClock, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GymAdvertisement() {
  const [showAd, setShowAd] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  useEffect(() => {
    const lastClosed = localStorage.getItem('gymAdClosedAt');
    if (lastClosed) {
      const closedAt = new Date(parseInt(lastClosed, 10));
      const now = new Date();
      const diff = now - closedAt;

      if (diff < 600000) { // 👈 10 minutes
        setShowAd(false);
        const remainingTime = 600000 - diff;

        const timeout = setTimeout(() => {
          setShowAd(true);
          localStorage.removeItem('gymAdClosedAt');
        }, remainingTime);

        return () => clearTimeout(timeout);
      } else {
        localStorage.removeItem('gymAdClosedAt');
        setShowAd(true);
      }
    }
  }, []);

  const handleClose = () => {
    setShowAd(false);
    const now = Date.now();
    localStorage.setItem('gymAdClosedAt', now.toString());

    setTimeout(() => {
      setShowAd(true);
      localStorage.removeItem('gymAdClosedAt');
    }, 600000); // 👈 10 minutes
  };

  if (!showAd) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={!isHovered ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-[95%] max-w-[100%] sm:max-w-4xl bg-gradient-to-br from-black to-zinc-900 text-white flex flex-col items-center justify-center px-4 py-6 rounded-xl shadow-2xl mx-auto my-4"
    >
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-red-500 transition"
        onClick={handleClose}
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 w-full px-2"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-snug">
          🔥 Join <span className="text-yellow-400">FitZone Gym</span> Today!
        </h1>

        <p className="text-sm sm:text-lg text-gray-300">
          Burn calories, build strength, and live healthy with our expert trainers and cutting-edge facilities.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-4 mt-2 sm:mt-4 px-2">
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-xl shadow-md text-sm">
            <Dumbbell className="text-yellow-400 w-4 h-4" />
            <span>Modern Equipment</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-xl shadow-md text-sm">
            <CalendarCheck className="text-yellow-400 w-4 h-4" />
            <span>Flexible Plans</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-2 rounded-xl shadow-md text-sm">
            <AlarmClock className="text-yellow-400 w-4 h-4" />
            <span>24/7 Access</span>
          </div>
        </div>

        <p className="text-base sm:text-xl font-bold text-red-500 animate-pulse mt-4">
          🎉 Flat <span className="text-yellow-400">50% OFF</span> - Limited Time Only!
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-yellow-400 text-black w-full sm:w-auto px-6 py-2 rounded-full text-sm sm:text-lg font-semibold mt-3 shadow-lg hover:bg-yellow-300 transition"
        >
          Join Now
        </motion.button>

        <div className="mt-4 text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          +919372381936
        </div>
      </motion.div>
    </motion.div>
  );
}
