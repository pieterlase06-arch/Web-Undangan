import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Countdown - A high-fidelity countdown section for the invitation.
 * Features a minimalist industrial design with smooth animations.
 */
const Countdown = ({ targetDate = '2026-12-31T00:00:00' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 px-6 bg-[#fcf9f6] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden">
        <h1 className="text-[20vw] font-black absolute -top-20 -left-10 select-none">MOMENTS</h1>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 mb-16"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Save The Date</p>
          <h2 className="serif text-4xl md:text-5xl text-slate-800 font-light italic">
            Menghitung Hari Menuju Kebahagiaan
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', damping: 15 }}
              className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 flex flex-col items-center justify-center group hover:bg-indigo-600 transition-all duration-500"
            >
              <AnimatePresence mode="wait">
                <motion.span 
                  key={item.value}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="text-4xl md:text-5xl font-black text-slate-900 mb-2 group-hover:text-white transition-colors"
                >
                  {item.value}
                </motion.span>
              </AnimatePresence>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-indigo-200 transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
