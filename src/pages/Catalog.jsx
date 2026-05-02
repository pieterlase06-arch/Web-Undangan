import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumInvitation from '../components/PremiumInvitation';

const Catalog = ({ onSelectTemplate, theme }) => {
  const isDark = theme === 'dark';
  const cardClass = isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100';
  const textClass = isDark ? 'text-white' : 'text-stone-900';
  const mutedClass = isDark ? 'text-slate-400' : 'text-stone-500';

  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Floral', 'Modern', 'Classic', 'Islamic', 'Premium'];

  const templates = [
    // GOLD SERIES
    { id: 'g1', themeId: 'gold', category: 'Classic', name: 'Classic Gold Luxe', primaryColor: '#C5A059', accentColor: '#1C1917', image: './assets/themes/gold.png', backgroundImage: './assets/themes/gold.png' },
    { id: 'g2', themeId: 'gold', category: 'Floral', name: 'Royal Heritage', primaryColor: '#8B4513', accentColor: '#C5A059', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
    { id: 'g3', themeId: 'gold', category: 'Premium', name: 'Vintage Bloom', primaryColor: '#BE123C', accentColor: '#C5A059', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80' },
    { id: 'g4', themeId: 'gold', category: 'Islamic', name: 'Al-Barakah Gold', primaryColor: '#C5A059', accentColor: '#064E3B', image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80' },
    
    // EMERALD SERIES
    { id: 'e1', themeId: 'emerald', category: 'Modern', name: 'Emerald Garden', primaryColor: '#064E3B', accentColor: '#D4AF37', image: './assets/themes/emerald.png', backgroundImage: './assets/themes/emerald.png' },
    { id: 'e2', themeId: 'emerald', category: 'Floral', name: 'Forest Serenity', primaryColor: '#064E3B', accentColor: '#F0FDFA', image: 'https://images.unsplash.com/photo-1522673607200-164883eeca48?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1522673607200-164883eeca48?auto=format&fit=crop&w=1200&q=80' },
    { id: 'e3', themeId: 'emerald', category: 'Modern', name: 'Ethereal Green', primaryColor: '#0F766E', accentColor: '#F0FDF4', image: 'https://images.unsplash.com/photo-1465495910484-de3b250fecaa?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1465495910484-de3b250fecaa?auto=format&fit=crop&w=1200&q=80' },
    { id: 'e4', themeId: 'emerald', category: 'Islamic', name: 'Madina Emerald', primaryColor: '#064E3B', accentColor: '#C5A059', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80' },

    // LINEN SERIES
    { id: 'l1', themeId: 'linen', category: 'Modern', name: 'Linen Minimalist', primaryColor: '#44403C', accentColor: '#A8A29E', image: './assets/themes/linen.png', backgroundImage: './assets/themes/linen.png' },
    { id: 'l2', themeId: 'linen', category: 'Classic', name: 'Modern Simplicity', primaryColor: '#1F2937', accentColor: '#D1D5DB', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80' },
    { id: 'l3', themeId: 'linen', category: 'Premium', name: 'Luxe Monochrome', primaryColor: '#000000', accentColor: '#FFFFFF', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80' },
    { id: 'l4', themeId: 'linen', category: 'Islamic', name: 'Pure White Mosque', primaryColor: '#1C1917', accentColor: '#F5F5F4', image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&w=1200&q=80' },
    
    // ADDITIONAL VARIANTS
    { id: 'v1', themeId: 'gold', category: 'Floral', name: 'Spring Blossom', primaryColor: '#db2777', accentColor: '#fdf2f8', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80' },
    { id: 'v2', themeId: 'emerald', category: 'Modern', name: 'Urban Chic', primaryColor: '#111827', accentColor: '#10b981', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80' },
    { id: 'v3', themeId: 'linen', category: 'Premium', name: 'Velvet Night', primaryColor: '#312e81', accentColor: '#c084fc', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80', backgroundImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80' },
  ];

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

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
    <div className="p-4 lg:p-10 max-w-[1400px] mx-auto flex flex-col gap-6 lg:gap-10 transition-colors duration-300 pb-32">
      <header className="space-y-6">
        <div className="space-y-2">
           <h1 className={`serif text-3xl lg:text-5xl ${textClass}`}>Design Catalog</h1>
           <p className={`${mutedClass} text-sm lg:text-lg max-w-2xl`}>Jelajahi puluhan koleksi desain premium kami. Cari yang paling sesuai dengan gaya pernikahan impian Anda.</p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
           {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === cat ? 'bg-[#C5A059] border-[#C5A059] text-white shadow-lg scale-105' : 'bg-transparent border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900'}`}
              >
                {cat}
              </button>
           ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template, i) => (
            <motion.div 
              layout
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`${cardClass} rounded-[32px] overflow-hidden border shadow-sm group hover:shadow-2xl transition-all duration-700 relative`}
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-stone-100">
                <img src={template.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={template.name} />
                
                {/* HOVER ACTIONS */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-md p-6 gap-3">
                  <button 
                    onClick={() => setPreviewTemplate(dummyData(template))}
                    className="w-full py-3 bg-white text-stone-900 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    Preview
                  </button>
                  <button 
                    onClick={() => onSelectTemplate(template)}
                    className="w-full py-3 bg-[#C5A059] text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Use Design
                  </button>
                </div>

                {/* TAGS */}
                <div className="absolute top-4 left-4 flex gap-2">
                   <div className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20">
                      {template.category}
                   </div>
                </div>
              </div>

              <div className={`p-6 transition-colors ${cardClass}`}>
                <h3 className={`serif font-bold text-lg leading-tight ${textClass}`}>{template.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                   <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: template.primaryColor }} />
                      <div className="w-4 h-4 rounded-full border border-white" style={{ backgroundColor: template.accentColor }} />
                   </div>
                   <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">{template.themeId} Edition</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
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
                   <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#C5A059]">preview</span>
                   </div>
                   <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#C5A059]">Live Preview Mode</p>
                      <p className="serif font-bold text-stone-900">{previewTemplate.partner1} & {previewTemplate.partner2}</p>
                   </div>
                </div>
                <button 
                  onClick={() => setPreviewTemplate(null)} 
                  className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  Exit Preview
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
