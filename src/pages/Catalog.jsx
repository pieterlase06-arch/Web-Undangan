import { motion } from 'framer-motion';
import LuxeTypography from '../components/ui/LuxeTypography';
import TemplateCard from '../components/catalog/TemplateCard';

/**
 * Catalog - The design selection hub for new invitation projects.
 */
const Catalog = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'luxury-03',
      name: 'Imperial Gold',
      category: 'Ultra Premium',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800',
      description: 'Classic serif typography paired with elegant golden accents and flowing animations.'
    },
    {
      id: 'snap-photo',
      name: 'Modern Portrait',
      category: 'Minimalist',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800',
      description: 'A clean, image-focused design that captures the essence of your story in every frame.'
    },
    {
      id: 'custom',
      name: 'Creative Canvas',
      category: 'Professional',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800',
      description: 'Total freedom. Start from a blank canvas and build your unique dream invitation.'
    }
  ];

  return (
    <div className="min-h-screen mesh-bg p-10 md:p-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <header className="space-y-6 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="inline-block px-5 py-2 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em]"
          >
             Official 2026 Collection
          </motion.div>
          <LuxeTypography variant="h1" className="text-stone-900 leading-none">
            Choose Your <span className="text-[#C5A059]">Style</span>
          </LuxeTypography>
          <LuxeTypography variant="body" className="text-stone-400 font-bold uppercase tracking-widest leading-relaxed">
            Discover the perfect canvas for your most cherished moments. Handcrafted for the modern couple.
          </LuxeTypography>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {templates.map((t, i) => (
            <TemplateCard 
              key={t.id} 
              template={t} 
              index={i} 
              onSelect={onSelectTemplate} 
            />
          ))}
        </div>
        
        <footer className="pt-20 text-center">
           <div className="inline-flex items-center gap-4 text-stone-300">
              <div className="h-px w-12 bg-current" />
              <LuxeTypography variant="caption" className="tracking-[0.5em]">More styles coming soon</LuxeTypography>
              <div className="h-px w-12 bg-current" />
           </div>
        </footer>
      </div>
    </div>
  );
};

export default Catalog;
