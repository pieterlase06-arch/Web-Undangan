import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden" style={{ minHeight: '100vh', padding: 0 }}>
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-xl uppercase tracking-widest mb-4 block font-light">The Wedding of</span>
          <h1 className="text-6xl md:text-8xl mb-6 serif italic">Romeo & Juliet</h1>
          <p className="text-2xl font-light mb-8 script">01 . 01 . 2027</p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <a href="#rsvp" className="btn">Reserve Your Spot</a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-1 h-12 bg-white/30 rounded-full flex justify-center">
          <div className="w-1 h-4 bg-white rounded-full mt-1" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
