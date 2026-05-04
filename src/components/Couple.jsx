import { motion } from 'framer-motion';

/**
 * Couple - A professional section introducing the bride and groom.
 * Features elegant image framing and typography.
 */
const Couple = ({ 
  partner1 = "Eleanor", 
  partner2 = "James", 
  partner1Parents = "Mr. & Mrs. Smith", 
  partner2Parents = "Mr. & Mrs. Doe",
  groomImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800",
  brideImage = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800"
}) => {
  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
        {/* Groom Panel */}
        <motion.div {...reveal} className="space-y-12 text-center md:text-right flex flex-col items-center md:items-end">
          <div className="relative w-80 h-[480px] rounded-[60px] overflow-hidden shadow-2xl group">
            <img src={groomImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Groom" />
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay" />
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-black tracking-[0.4em] text-indigo-600 uppercase">The Groom</p>
            <h3 className="serif text-6xl text-slate-900 font-light italic">{partner1}</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Putra dari {partner1Parents}</p>
          </div>
        </motion.div>

        {/* Bride Panel */}
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.3 }} className="space-y-12 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="relative w-80 h-[480px] rounded-[60px] overflow-hidden shadow-2xl group">
            <img src={brideImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Bride" />
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-overlay" />
          </div>
          <div className="space-y-4">
            <p className="text-[10px] font-black tracking-[0.4em] text-indigo-600 uppercase">The Bride</p>
            <h3 className="serif text-6xl text-slate-900 font-light italic">{partner2}</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Putri dari {partner2Parents}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Couple;
