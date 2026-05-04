import { motion } from 'framer-motion';
import LuxeTypography from '../ui/LuxeTypography';

/**
 * ContextualToolbar - Element-specific editing tools that appear in a floating bar.
 */
const ContextualToolbar = ({ 
  selectedElement, 
  onClose, 
  onMoveSection, 
  onChangeAsset 
}) => {
  if (!selectedElement) return null;

  const isSection = selectedElement.type === 'section';

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-8 bg-slate-900/95 backdrop-blur-3xl px-12 py-6 rounded-[50px] shadow-2xl border border-white/10"
    >
      <div className="flex items-center gap-4 pr-8 border-r border-white/10">
         <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
         <LuxeTypography variant="caption" className="text-white/60">
           {selectedElement.type.toUpperCase()}: <span className="text-white">{selectedElement.id || 'ELEMENT'}</span>
         </LuxeTypography>
      </div>
      
      <div className="flex items-center gap-10">
         {isSection ? (
            <div className="flex items-center gap-6">
               <button 
                 onClick={() => onMoveSection(selectedElement.id, 'up')}
                 className="text-white/40 hover:text-white transition-all flex items-center gap-2"
               >
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  <LuxeTypography variant="caption" className="font-black">MOVE UP</LuxeTypography>
               </button>
               <button 
                 onClick={() => onMoveSection(selectedElement.id, 'down')}
                 className="text-white/40 hover:text-white transition-all flex items-center gap-2"
               >
                  <span className="material-symbols-outlined text-base">arrow_downward</span>
                  <LuxeTypography variant="caption" className="font-black">MOVE DOWN</LuxeTypography>
               </button>
            </div>
         ) : (
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-white/40 text-base">zoom_in</span>
                  <input type="range" className="w-32 accent-indigo-500" />
               </div>
               <button 
                 onClick={onChangeAsset} 
                 className="flex items-center gap-3 text-white hover:text-indigo-400 transition-all"
               >
                  <span className="material-symbols-outlined text-base">image</span> 
                  <LuxeTypography variant="caption" className="font-black">CHANGE ASSET</LuxeTypography>
               </button>
            </div>
         )}
      </div>
      
      <button 
        onClick={onClose} 
        className="ml-6 px-10 py-4 bg-indigo-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-500 active:scale-95 transition-all"
      >
        APPLY CHANGES
      </button>
    </motion.div>
  );
};

export default ContextualToolbar;
