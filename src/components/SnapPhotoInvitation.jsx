import { motion } from 'framer-motion';
import { useState } from 'react';

const SnapPhotoInvitation = ({ data, isEditMode = false }) => {
  const isDark = data.isDarkMode;
  const primary = data.primaryColor || '#1C1917';
  
  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-stone-950 text-stone-100' : 'bg-white text-stone-900'} font-sans`}>
      {/* HERO SNAP */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
        <motion.div {...reveal} className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Wedding Invitation</p>
          <h1 className="text-7xl md:text-9xl font-serif italic" style={{ color: primary }}>{data.partner1} & {data.partner2}</h1>
          <p className="text-sm font-bold tracking-widest">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-full max-w-sm aspect-[3/4] bg-white p-4 shadow-2xl border border-stone-100 group"
        >
          <div className="w-full h-[85%] overflow-hidden bg-stone-50">
             <img src={data.groomImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
          <div className="h-[15%] flex items-center justify-center italic serif text-xl opacity-60">
             The Groom
          </div>
        </motion.div>
      </section>

      {/* STORY GRID */}
      <section className="py-40 px-6 max-w-5xl mx-auto space-y-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <motion.div {...reveal} className="space-y-6">
              <h2 className="text-5xl font-serif italic">Our Beautiful Memories</h2>
              <p className="text-sm leading-relaxed opacity-60 italic">"Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day."</p>
           </motion.div>
           <motion.div {...reveal} transition={{ delay: 0.3 }} className="relative aspect-square bg-white p-4 shadow-xl rotate-3">
              <img src={data.brideImage} className="w-full h-full object-cover" />
           </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
           {(data.stories || []).map((s, i) => (
             <motion.div key={i} {...reveal} transition={{ delay: i * 0.1 }} className="aspect-square bg-white p-2 shadow-lg -rotate-2 odd:rotate-2">
                <div className="w-full h-full bg-stone-100 flex items-center justify-center p-4 text-center flex-col gap-2">
                   <span className="text-[10px] font-black opacity-30">{s.year}</span>
                   <h4 className="serif text-xs font-bold">{s.title}</h4>
                </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="py-40 bg-stone-50/50 text-center space-y-20">
         <motion.div {...reveal} className="space-y-8">
            <h2 className="text-6xl font-serif italic">Save The Date</h2>
            <div className="flex flex-col md:flex-row justify-center gap-20 items-center">
               <div className="space-y-2">
                  <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Akad Nikah</p>
                  <p className="text-xl font-bold">{data.time} WIB</p>
               </div>
               <div className="w-px h-10 bg-stone-300 hidden md:block" />
               <div className="space-y-2">
                  <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Location</p>
                  <p className="text-xl font-bold">{data.venue}</p>
               </div>
            </div>
            <a href={data.mapsLink} target="_blank" className="inline-block border-b-2 border-stone-900 pb-2 text-[10px] font-black tracking-widest hover:text-[#C5A059] hover:border-[#C5A059] transition-all">GET DIRECTIONS</a>
         </motion.div>
      </section>

      <footer className="py-20 text-center opacity-20 text-[10px] font-black tracking-[0.5em] uppercase">
         LuxeInvite • Snap Photo Edition
      </footer>
    </div>
  );
};

export default SnapPhotoInvitation;
