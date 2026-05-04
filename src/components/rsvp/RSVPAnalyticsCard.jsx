import { motion } from 'framer-motion';
import LuxeTypography from '../ui/LuxeTypography';

/**
 * RSVPAnalyticsCard - A modular metric card for real-time engagement tracking.
 */
const RSVPAnalyticsCard = ({ label, value, icon, color, bg, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`${bg} p-8 lg:p-10 rounded-[40px] shadow-sm border border-white flex flex-col gap-6 relative overflow-hidden group hover:shadow-xl transition-all duration-500`}
    >
       <div className="flex justify-between items-start">
          <div className={`w-14 h-14 rounded-2xl ${bg === 'bg-white' ? 'bg-stone-50' : 'bg-white/50'} flex items-center justify-center`}>
             <span className={`material-symbols-outlined ${color} text-2xl group-hover:scale-125 transition-transform duration-500`}>{icon}</span>
          </div>
          <div className="absolute -right-4 -top-4 opacity-[0.03] rotate-12 pointer-events-none">
             <span className="material-symbols-outlined text-[120px]">{icon}</span>
          </div>
       </div>
       <div className="space-y-1">
          <LuxeTypography variant="caption" className="text-stone-400 font-black">{label.toUpperCase()}</LuxeTypography>
          <LuxeTypography variant="h1" className={`${color} tabular-nums leading-none`}>
            {value}
          </LuxeTypography>
       </div>
    </motion.div>
  );
};

export default RSVPAnalyticsCard;
