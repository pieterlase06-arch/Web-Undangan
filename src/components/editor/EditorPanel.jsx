import { motion } from 'framer-motion';
import LuxeTypography from '../ui/LuxeTypography';

/**
 * EditorPanel - A standardized container for all editor side panels.
 */
const EditorPanel = ({ title, onClose, children }) => {
  return (
    <motion.div 
      initial={{ x: -320 }} 
      animate={{ x: 0 }} 
      exit={{ x: -320 }}
      className="w-80 bg-white border-r border-slate-100 flex flex-col p-8 z-[150] shadow-2xl overflow-y-auto no-scrollbar"
    >
       <div className="flex items-center justify-between mb-10">
          <LuxeTypography variant="detail" className="text-slate-400">{title} Orchestrator</LuxeTypography>
          <button onClick={onClose} className="text-slate-400 hover:rotate-90 transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
       </div>
       {children}
    </motion.div>
  );
};

export default EditorPanel;
