import { motion } from 'framer-motion';
import { useState } from 'react';

const CustomCanvasInvitation = ({ data, isEditMode = false }) => {
  const isDark = data.isDarkMode;
  const primary = data.primaryColor || '#1C1917';
  
  // Custom states for "Free Editing"
  const [bgImage, setBgImage] = useState(data.bgImage || '');

  return (
    <div 
      className={`min-h-screen relative flex flex-col items-center justify-center p-10 overflow-hidden ${isDark ? 'bg-stone-950 text-white' : 'bg-white text-stone-900'}`}
      style={{ 
        backgroundImage: data.bgImage ? `url(${data.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* 1. OVERLAY FOR LEGIBILITY */}
      {data.bgImage && <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />}

      <div className="relative z-10 w-full max-w-4xl space-y-20 text-center">
         {/* CUSTOMIZABLE HERO */}
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
            <h1 
              className="text-8xl md:text-[12rem] font-bold leading-none tracking-tighter"
              style={{ color: primary, fontFamily: data.fontFamily || 'serif' }}
            >
               {data.partner1} <br/> 
               <span className="opacity-20">&</span> <br/>
               {data.partner2}
            </h1>
            <div className="w-24 h-1 bg-[#C5A059] mx-auto" style={{ backgroundColor: primary }} />
            <p className="text-2xl font-light tracking-[0.5em] uppercase opacity-60">
               {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
         </motion.div>

         {/* BLANK CANVAS SLOTS */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] space-y-6">
               <h3 className="text-3xl font-serif">The Groom</h3>
               <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img src={data.groomImage} className="w-full h-full object-cover" />
               </div>
               <p className="font-bold">{data.partner1}</p>
            </div>
            <div className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] space-y-6">
               <h3 className="text-3xl font-serif">The Bride</h3>
               <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <img src={data.brideImage} className="w-full h-full object-cover" />
               </div>
               <p className="font-bold">{data.partner2}</p>
            </div>
         </div>

         {/* FREE TEXT SECTION */}
         <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
            <p className="text-lg italic opacity-80 leading-relaxed font-serif">"{data.quote}"</p>
            <div className="pt-10 border-t border-white/10">
               <h4 className="text-xl font-bold uppercase tracking-widest mb-4">Location</h4>
               <p className="opacity-60">{data.venue}</p>
               <p className="opacity-40 text-sm">{data.address}</p>
            </div>
         </motion.div>
      </div>

      {/* FLOATING DECOR */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px]" />
    </div>
  );
};

export default CustomCanvasInvitation;
