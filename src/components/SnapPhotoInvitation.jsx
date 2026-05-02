import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0a] text-stone-100' : 'bg-stone-50 text-stone-900'} font-sans selection:bg-[#C5A059] selection:text-white`}>
      {/* 1. MINIMAL HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <motion.div {...reveal} className="z-10 space-y-4 mb-20">
          <p className="text-[10px] font-black uppercase tracking-[1em] opacity-40">Save the Date</p>
          <h1 className="text-8xl md:text-[10rem] font-light tracking-tighter leading-none" style={{ color: primary, fontFamily: "'Outfit', sans-serif" }}>
            {data.partner1.split(' ')[0]}<br/>
            <span className="opacity-20">&</span><br/>
            {data.partner2.split(' ')[0]}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm aspect-[3/4] bg-white p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-stone-200 rotate-2 group"
        >
          <div className="w-full h-full overflow-hidden bg-stone-100 relative">
             <img src={data.groomImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-left">
                <p className="text-white font-black uppercase tracking-widest text-[10px]">The Groom</p>
                <h3 className="text-white text-2xl font-bold">{data.partner1}</h3>
             </div>
          </div>
          {/* Polaroid Tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/40 backdrop-blur-md border border-white/20 rotate-1 shadow-sm" />
        </motion.div>

        {/* Floating Text Decor */}
        <div className="absolute top-1/2 -translate-y-1/2 left-10 text-[15rem] font-black opacity-[0.02] pointer-events-none select-none uppercase leading-none">SNAP</div>
      </section>

      {/* 2. BRIDE SNAP */}
      <section className="py-40 px-8 flex flex-col items-center gap-20">
        <motion.div {...reveal} className="text-center space-y-4">
           <h2 className="text-5xl md:text-7xl font-serif italic">Beautiful Moments</h2>
           <p className="text-sm opacity-40 max-w-xs mx-auto">Capturing the soul of our journey together in every frame.</p>
        </motion.div>

        <motion.div 
          {...reveal}
          className="relative w-full max-w-sm aspect-[3/4] bg-white p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-stone-200 -rotate-3 group"
        >
          <div className="w-full h-full overflow-hidden bg-stone-100 relative">
             <img src={data.brideImage} className="w-full h-full object-cover transition-all duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-left">
                <p className="text-white font-black uppercase tracking-widest text-[10px]">The Bride</p>
                <h3 className="text-white text-2xl font-bold">{data.partner2}</h3>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 3. EVENT SNAP */}
      <section className="py-40 px-8 bg-stone-900 text-white relative overflow-hidden">
         <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div {...reveal} className="space-y-10">
               <span className="inline-block px-6 py-2 bg-[#C5A059] text-white text-[10px] font-black uppercase tracking-widest rounded-full">Wedding Event</span>
               <h2 className="text-6xl md:text-8xl font-light leading-none tracking-tighter">Join Our Celebration</h2>
               <p className="text-sm opacity-60 leading-relaxed italic border-l-2 border-[#C5A059] pl-6">"Together with our families, we invite you to share in our joy as we begin our new life together."</p>
            </motion.div>
            <motion.div {...reveal} transition={{ delay: 0.3 }} className="space-y-12">
               <div className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Date & Time</span>
                     <span className="material-symbols-outlined text-[#C5A059]">calendar_today</span>
                  </div>
                  <p className="text-3xl font-light">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="text-xl font-bold opacity-60">{data.time} WIB - Selesai</p>
               </div>
               <div className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] space-y-6">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Location</span>
                     <span className="material-symbols-outlined text-[#C5A059]">location_on</span>
                  </div>
                  <h4 className="text-2xl font-bold">{data.venue}</h4>
                  <p className="text-sm opacity-60 leading-relaxed">{data.address}</p>
                  <a href={data.mapsLink} target="_blank" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors">
                     GET DIRECTIONS <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
               </div>
            </motion.div>
         </div>
         {/* BG Decor */}
         <div className="absolute bottom-0 right-0 text-[30rem] font-black opacity-[0.03] select-none translate-y-1/2">DATE</div>
      </section>

      {/* 4. STORY SNAP */}
      <section className="py-60 px-8 flex flex-col items-center gap-32">
         <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif italic">Snapshot of Us</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Our Love Story</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full max-w-7xl">
            {(data.stories || []).map((s, i) => (
              <motion.div 
                key={i} {...reveal} transition={{ delay: i * 0.2 }}
                className="bg-white p-6 shadow-2xl border border-stone-200 aspect-[3/4] flex flex-col gap-6 rotate-1 hover:rotate-0 transition-transform"
              >
                 <div className="flex-1 bg-stone-50 border border-stone-100 flex items-center justify-center p-6 text-center flex-col gap-4">
                    <span className="text-3xl" style={{ color: primary }}>{s.year}</span>
                    <h4 className="font-bold uppercase tracking-widest text-xs">{s.title}</h4>
                    <p className="text-[10px] opacity-60 italic leading-relaxed">"{s.desc}"</p>
                 </div>
                 <div className="h-10 border-t border-stone-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-stone-200">auto_awesome</span>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-40 text-center border-t border-stone-200">
         <p className="text-[9px] font-black uppercase tracking-[1em] opacity-20 mb-10">LuxeInvite • Snap Photo Edition</p>
         <h2 className="text-6xl md:text-8xl font-light tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>{data.partner1} & {data.partner2}</h2>
      </footer>
    </div>
  );
};

export default SnapPhotoInvitation;
