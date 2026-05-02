import React from 'react';
import { motion } from 'framer-motion';

const Catalog = ({ onSelectTemplate }) => {
  const templates = [
    { 
      id: 'classic', 
      name: 'Classic Elegance', 
      primaryColor: '#0F172A', 
      accentColor: '#D4AF37', 
      fontFamily: 'serif',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'emerald', 
      name: 'Emerald Garden', 
      primaryColor: '#064E3B', 
      accentColor: '#D4AF37', 
      fontFamily: 'serif',
      image: 'https://images.unsplash.com/photo-1522673607200-164883eeca48?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'midnight', 
      name: 'Midnight Luxe', 
      primaryColor: '#1a1a1a', 
      accentColor: '#C5A059', 
      fontFamily: 'sans',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80'
    },
    { 
      id: 'bohemian', 
      name: 'Bohemian Dream', 
      primaryColor: '#7c4d3a', 
      accentColor: '#e5c0a1', 
      fontFamily: 'serif',
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80'
    },
  ];

  return (
    <div className="p-10 max-w-[1200px] mx-auto flex flex-col gap-10">
      <header>
        <h1 className="serif text-3xl text-stone-900">Design Catalog</h1>
        <p className="text-stone-500 mt-1">Select a starting point for your premium digital invitation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template, i) => (
          <motion.div 
            key={template.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm group hover:shadow-xl transition-all duration-500"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src={template.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={template.name} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button 
                  onClick={() => onSelectTemplate(template)}
                  className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-stone-900 hover:text-white transition-all active:scale-95"
                >
                  Select Design
                </button>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center bg-white relative z-10">
              <div>
                <h3 className="serif font-bold text-lg text-stone-800">{template.name}</h3>
                <div className="flex gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.primaryColor }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: template.accentColor }} />
                </div>
              </div>
              <span className="material-symbols-outlined text-stone-200">arrow_forward</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
