import { motion } from 'framer-motion';

/**
 * LuxeSlider - A professional range input component for the Studio.
 * Optimized for zoom controls and image manipulation settings.
 */
const LuxeSlider = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  icon = null,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between px-1">
        {label && (
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
            {label}
          </label>
        )}
        <span className="text-[10px] font-black text-indigo-600 font-mono">
          {value}{typeof value === 'number' && step < 1 ? '' : (max > 10 ? '%' : '')}
        </span>
      </div>
      
      <div className="relative flex items-center group">
        {icon && (
          <span className="material-symbols-outlined text-base text-slate-400 mr-3 group-hover:text-indigo-600 transition-colors">
            {icon}
          </span>
        )}
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="
            flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer
            accent-indigo-600 hover:bg-slate-200 transition-all
          "
        />
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border: 3px solid #4f46e5;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
          transition: all 0.2s ease;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 6px 15px rgba(79, 70, 229, 0.4);
        }
      `}} />
    </div>
  );
};

export default LuxeSlider;
