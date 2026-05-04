import { motion } from 'framer-motion';

/**
 * LuxeInput - Atomic input component for the Studio Workspace.
 * Features a refined, professional look with focus animations.
 */
const LuxeInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  icon = null,
  className = '',
  helperText = null
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            {icon}
          </span>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 
            ${icon ? 'pl-12' : 'px-5'} pr-5 
            text-[11px] font-bold text-slate-700 outline-none
            focus:bg-white focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-100/50
            transition-all duration-300
          `}
        />
      </div>
      
      {helperText && (
        <p className="text-[8px] font-medium text-slate-400 ml-1 italic">{helperText}</p>
      )}
    </div>
  );
};

export default LuxeInput;
