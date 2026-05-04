import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

/**
 * LuxeSelect - A premium dropdown component for the Studio.
 * Optimized for choosing fonts, templates, and layouts.
 */
const LuxeSelect = ({ 
  label, 
  value, 
  options, 
  onChange, 
  className = '',
  placeholder = 'Select option...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  
  const selectedOption = options.find(opt => opt.id === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`space-y-2 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 
            text-[11px] font-bold text-slate-700 outline-none hover:bg-white hover:border-slate-200 transition-all
            ${isOpen ? 'border-indigo-600 ring-4 ring-indigo-50 bg-white' : ''}
          `}
        >
          <span className="truncate">{selectedOption?.label || placeholder}</span>
          <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-[1000] w-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
            >
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-5 py-4 text-left text-[11px] font-bold transition-all
                    ${value === option.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}
                  `}
                  style={option.style}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LuxeSelect;
