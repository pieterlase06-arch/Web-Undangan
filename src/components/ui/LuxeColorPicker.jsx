import { motion } from 'framer-motion';

/**
 * LuxeColorPicker - A refined color selection component.
 * Supports preset palettes and custom hex input.
 */
const LuxeColorPicker = ({ 
  label, 
  value, 
  onChange, 
  presets = ['#C5A059', '#0F172A', '#064E3B', '#7C2D12', '#4338CA', '#DB2777'],
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          {label}
        </label>
      )}
      
      <div className="flex flex-wrap gap-3 p-1">
        {presets.map(color => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(color)}
            className={`
              w-8 h-8 rounded-full border-2 shadow-sm transition-all
              ${value === color ? 'border-indigo-600 scale-110 shadow-lg' : 'border-white'}
            `}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        
        {/* Custom Color Input */}
        <div className="relative group">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer opacity-0 absolute inset-0 z-10"
          />
          <div 
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center bg-slate-50 group-hover:bg-slate-100 transition-all"
            style={{ backgroundColor: presets.includes(value) ? 'transparent' : value }}
          >
            <span className="material-symbols-outlined text-base text-slate-400">add</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
        <div className="w-5 h-5 rounded-md shadow-inner" style={{ backgroundColor: value }} />
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-[10px] font-mono font-bold text-slate-600 w-full"
        />
      </div>
    </div>
  );
};

export default LuxeColorPicker;
