import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumInvitation from '../components/PremiumInvitation';

const Catalog = ({ onSelectTemplate, theme }) => {
  const isDark = theme === 'dark';
  const cardClass = isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100';
  const textClass = isDark ? 'text-white' : 'text-stone-900';
  const mutedClass = isDark ? 'text-slate-400' : 'text-stone-500';

  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = [
    { 
      id: 'gold-1', 
      themeId: 'gold',
      name: 'Classic Gold Luxe', 
      primaryColor: '#C5A059', 
      accentColor: '#1C1917', 
      image: './assets/themes/gold.png',
      backgroundImage: './assets/themes/gold.png'
    },
    { 
      id: 'emerald-1', 
      themeId: 'emerald',
      name: 'Emerald Garden', 
      primaryColor: '#064E3B', 
      accentColor: '#D4AF37', 
      image: './assets/themes/emerald.png',
      backgroundImage: './assets/themes/emerald.png'
    },
    { 
      id: 'linen-1', 
      themeId: 'linen',
      name: 'Linen Minimalist', 
      primaryColor: '#44403C', 
      accentColor: '#A8A29E', 
      image: './assets/themes/linen.png',
      backgroundImage: './assets/themes/linen.png'
    },
    { 
      id: 'gold-2', 
      themeId: 'gold',
      name: 'Royal Heritage', 
      primaryColor: '#8B4513', 
      accentColor: '#C5A059', 
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
    },
    { 
      id: 'emerald-2', 
      themeId: 'emerald',
      name: 'Forest Serenity', 
      primaryColor: '#064E3B', 
      accentColor: '#F0FDFA', 
      image: 'https://images.unsplash.com/photo-1522673607200-164883eeca48?auto=format&fit=crop&w=600&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1522673607200-164883eeca48?auto=format&fit=crop&w=1200&q=80'
    },
    { 
      id: 'linen-2', 
      themeId: 'linen',
      name: 'Modern Simplicity', 
      primaryColor: '#1F2937', 
      accentColor: '#D1D5DB', 
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80'
    },
    { 
      id: 'gold-3', 
      themeId: 'gold',
      name: 'Vintage Bloom', 
      primaryColor: '#BE123C', 
      accentColor: '#C5A059', 
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80'
    },
    { 
      id: 'emerald-3', 
      themeId: 'emerald',
      name: 'Ethereal Green', 
      primaryColor: '#0F766E', 
      accentColor: '#F0FDF4', 
      image: 'https://images.unsplash.com/photo-1465495910484-de3b250fecaa?auto=format&fit=crop&w=600&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1465495910484-de3b250fecaa?auto=format&fit=crop&w=1200&q=80'
    },
    { 
      id: 'linen-3', 
      themeId: 'linen',
      name: 'Luxe Monochrome', 
      primaryColor: '#000000', 
      accentColor: '#FFFFFF', 
      image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80'
    },
  ];

  const dummyData = (template) => ({
    partner1: 'Alexander',
    partner2: 'Isabella',
    date: '2024-12-30',
    time: '09:00',
    venue: 'Grand Ballroom Luxe',
    address: 'Jl. Sudirman No. 123, Jakarta',
    themeId: template.themeId,
    backgroundImage: template.backgroundImage,
    primaryColor: template.primaryColor,
    accentColor: template.accentColor,
    fontFamily: 'serif',
    groomImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    brideImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  });

  return (
    <div className="p-4 lg:p-10 max-w-[1400px] mx-auto flex flex-col gap-6 lg:gap-10 transition-colors duration-300 pb-24 lg:pb-10">
      <header className="space-y-2">
        <h1 className={`serif text-3xl lg:text-5xl ${textClass}`}>Design Catalog</h1>
        <p className={`${mutedClass} text-sm lg:text-lg max-w-2xl`}>Pilih dari koleksi desain premium kami. Anda bisa melihat pratinjau (preview) interaktif sebelum memilih.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {templates.map((template, i) => (
          <motion.div 
            key={template.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${cardClass} rounded-[40px] overflow-hidden border shadow-sm group hover:shadow-3xl transition-all duration-700 relative`}
          >
            <div className="aspect-[3/4] relative overflow-hidden bg-stone-100">
              <img src={template.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={template.name} />
              
              {/* HOVER ACTIONS */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-md p-8 gap-4">
                <button 
                  onClick={() => setPreviewTemplate(dummyData(template))}
                  className="w-full py-4 bg-white text-stone-900 rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  Live Preview
                </button>
                <button 
                  onClick={() => onSelectTemplate(template)}
                  className="w-full py-4 bg-[#C5A059] text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Select Design
                </button>
              </div>

              {/* FLOATING BADGE */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md text-white rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20">
                {template.themeId} Edition
              </div>
            </div>

            <div className={`p-8 lg:p-10 flex justify-between items-center transition-colors ${cardClass}`}>
              <div className="space-y-1">
                <h3 className={`serif font-bold text-xl ${textClass}`}>{template.name}</h3>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: template.primaryColor }} />
                      <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: template.accentColor }} />
                   </div>
                   <span className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Premium</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex flex-col bg-white overflow-hidden"
          >
             <div className="h-16 flex items-center justify-between px-6 lg:px-10 border-b sticky top-0 z-[2100] bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Interactive Preview</span>
                   <div className="h-4 w-px bg-stone-200"></div>
                   <span className="serif font-bold text-stone-900">{previewTemplate.partner1} & {previewTemplate.partner2}</span>
                </div>
                <button 
                  onClick={() => setPreviewTemplate(null)} 
                  className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#C5A059] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  Close Preview
                </button>
             </div>
             <div className="flex-1 overflow-y-auto">
                <PremiumInvitation data={previewTemplate} />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
