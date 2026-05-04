import React from 'react';
import { motion } from 'framer-motion';

/**
 * EventDetails - A premium section displaying ceremony and reception information.
 * Uses the "Luxe" industrial aesthetic with refined typography and card layouts.
 */
const EventDetails = ({ data = {} }) => {
  const events = [
    {
      title: 'The Ceremony',
      date: data.akadDate || 'Saturday, January 1, 2027',
      time: data.akadTime || '10:00 AM - 12:00 PM',
      location: data.akadVenue || 'The Grand Palace Ballroom',
      address: data.akadAddress || '123 Royal Ave, Jakarta, Indonesia',
      mapUrl: data.akadMap || '#'
    },
    {
      title: 'The Reception',
      date: data.resepsiDate || 'Saturday, January 1, 2027',
      time: data.resepsiTime || '06:00 PM - 09:00 PM',
      location: data.resepsiVenue || 'The Crystal Garden',
      address: data.resepsiAddress || '456 Garden St, Jakarta, Indonesia',
      mapUrl: data.resepsiMap || '#'
    }
  ];

  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <h1 className="text-[25vw] font-black absolute bottom-0 right-0 select-none">VENUE</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div {...reveal} className="text-center mb-24 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">The Celebration</p>
          <h2 className="serif text-5xl md:text-6xl text-slate-900 font-light italic">Detail Acara</h2>
          <div className="w-12 h-px bg-indigo-600/30 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              {...reveal}
              transition={{ ...reveal.transition, delay: idx * 0.2 }}
              className="group relative"
            >
              <div className="bg-slate-50/50 rounded-[60px] p-12 md:p-16 border border-slate-100 transition-all duration-700 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50">
                <div className="space-y-12">
                  <h3 className="serif text-3xl md:text-4xl text-slate-800 font-medium italic border-b border-slate-200 pb-8 inline-block">
                    {event.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Tanggal</p>
                      <p className="text-lg font-bold text-slate-800">{event.date}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Waktu</p>
                      <p className="text-lg font-bold text-slate-800">{event.time}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-600">Lokasi</p>
                    <div className="space-y-2">
                      <p className="text-2xl font-black text-slate-900 leading-tight tracking-tight">{event.location}</p>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm">{event.address}</p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <motion.a 
                      href={event.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ x: 10 }}
                      className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">explore</span>
                      Buka Google Maps
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
