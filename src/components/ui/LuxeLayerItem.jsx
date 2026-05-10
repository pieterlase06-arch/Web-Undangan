import { motion } from 'framer-motion';

/**
 * LuxeLayerItem - A high-fidelity industrial component for the Layers Panel.
 * Supports active state, visibility toggles, selection, and hover events for the workspace.
 */
const LuxeLayerItem = ({ 
  label, 
  icon = 'layers', 
  isActive = false, 
  isVisible = true, 
  onSelect, 
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onMouseEnter,
  onMouseLeave,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all
        ${isActive ? 'bg-indigo-50 border border-indigo-100 shadow-sm' : 'bg-transparent border border-transparent hover:bg-slate-50'}
        ${className}
      `}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <span className={`material-symbols-outlined text-lg ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
          {icon}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-indigo-700' : 'text-slate-500 group-hover:text-slate-800'}`}>
          {label}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-0.5 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} className="p-0.5 hover:text-indigo-600 text-slate-300">
              <span className="material-symbols-outlined text-[14px]">expand_less</span>
           </button>
           <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} className="p-0.5 hover:text-indigo-600 text-slate-300">
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
           </button>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isVisible ? 'text-slate-300 hover:text-indigo-600' : 'text-red-400 bg-red-50'}`}
        >
          <span className="material-symbols-outlined text-base">
            {isVisible ? 'visibility' : 'visibility_off'}
          </span>
        </button>
        
        {isActive && (
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
};

export default LuxeLayerItem;
