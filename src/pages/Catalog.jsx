import { motion } from 'framer-motion';

const Catalog = ({ onSelectTemplate, theme }) => {
  const templates = [
    {
      id: 'luxury-03',
      name: 'Luxury 03',
      category: 'Elegant',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800',
      description: 'Gaya klasik dengan sentuhan emas dan animasi kelopak bunga yang mewah.'
    },
    {
      id: 'snap-photo',
      name: 'Snap Photo',
      category: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800',
      description: 'Fokus pada keindahan foto dengan bingkai Snap dan desain modern minimalis.'
    },
    {
      id: 'custom',
      name: 'Create From Scratch',
      category: 'Pro Builder',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800',
      description: 'Mulai dari nol. Bebas atur background, font, dan tata letak sesuka hati Anda.'
    }
  ];

  return (
    <div className="p-10 space-y-12">
      <div className="space-y-4">
        <h1 className="serif text-5xl font-black text-stone-900 tracking-tighter">Pilih Template</h1>
        <p className="text-stone-400 text-sm uppercase tracking-widest font-bold">Temukan gaya yang paling sesuai dengan momen bahagia Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {templates.map((t, i) => (
          <motion.div 
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] overflow-hidden border border-stone-100 shadow-xl group hover:border-[#C5A059] transition-all"
          >
            <div className="h-64 overflow-hidden relative">
               <img src={t.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#C5A059]">
                  {t.category}
               </div>
            </div>
            <div className="p-10 space-y-6">
              <div className="space-y-2">
                <h3 className="serif text-3xl font-black text-stone-900">{t.name}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{t.description}</p>
              </div>
              <button 
                onClick={() => onSelectTemplate(t.id)}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#C5A059] transition-all shadow-lg"
              >
                Gunakan Desain Ini
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
