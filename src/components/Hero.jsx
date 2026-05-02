import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[550px] w-full bg-white rounded-2xl stitch-card-shadow overflow-hidden flex flex-col items-center relative pb-20 paper-texture border border-white"
    >
      {/* Visual Image Layer */}
      <div className="w-full h-[320px] relative overflow-hidden">
        <img 
          alt="Wedding flowers" 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" 
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]" 
        />
        {/* Soft Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
      </div>

      {/* Text Content Layer */}
      <div className="w-full px-12 -mt-12 relative z-10 flex flex-col items-center text-center">
        <span className="font-bold text-[11px] text-primary tracking-[0.3em] uppercase mb-6 bg-white/90 px-5 py-1.5 rounded-full shadow-sm border border-stone-100">
          Join us to celebrate
        </span>
        
        <h2 className="serif text-[52px] text-stone-900 mb-8 leading-[1.1] tracking-tight">
          Eleanor <br />
          <span className="text-[32px] text-tertiary italic font-light lowercase">and</span> <br />
          James
        </h2>
        
        <div className="flex flex-col gap-1.5 text-[16px] text-stone-500 uppercase tracking-[0.1em] mb-12">
          <p className="font-semibold text-stone-800">Saturday, October 14th</p>
          <p>Two Thousand Twenty Four</p>
        </div>
        
        <div className="w-12 h-[2px] bg-primary-container/40 mb-10"></div>
        
        <div className="flex flex-col gap-2">
          <p className="serif text-[26px] text-stone-900 font-medium">The Botanical Gardens</p>
          <p className="text-stone-500 italic">San Francisco, California</p>
        </div>
      </div>

      {/* Decorative Blur Blobs (Subtle Background Layers) */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-100/30 blur-[100px] rounded-full"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-stone-200/30 blur-[100px] rounded-full"></div>
    </motion.div>
  );
};

export default Hero;
