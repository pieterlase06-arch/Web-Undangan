import { motion } from 'framer-motion';
import LuxeTypography from '../ui/LuxeTypography';
import LuxeBadge from '../ui/LuxeBadge';

/**
 * TemplateCard - A high-fidelity card representing an invitation style in the catalog.
 */
const TemplateCard = ({ template, index, onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[60px] overflow-hidden border border-white shadow-2xl group hover:border-[#C5A059] transition-all duration-500 hover:-translate-y-4"
    >
      <div className="h-80 overflow-hidden relative">
         <img 
           src={template.image} 
           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
           alt={template.name}
         />
         <div className="absolute top-8 left-8">
            <LuxeBadge variant="outline" className="bg-white/90 backdrop-blur-xl border-white/50 text-stone-900">
              {template.category}
            </LuxeBadge>
         </div>
      </div>
      <div className="p-12 space-y-8">
        <div className="space-y-3">
          <LuxeTypography variant="h2" className="text-stone-900 tracking-tight">
            {template.name}
          </LuxeTypography>
          <LuxeTypography variant="body" className="text-stone-400 italic">
            "{template.description}"
          </LuxeTypography>
        </div>
        <button 
          onClick={() => onSelect(template.id)}
          className="w-full py-5 bg-stone-950 text-white rounded-3xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[#C5A059] transition-all shadow-xl active:scale-95"
        >
          Apply Template
        </button>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
