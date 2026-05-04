import { motion } from 'framer-motion';

/**
 * LuxeSwitch - A premium toggle switch for binary settings.
 */
const LuxeSwitch = ({ 
  label, 
  checked, 
  onChange, 
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-between py-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          {label}
        </label>
      )}
      
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-300 outline-none
          ${checked ? 'bg-indigo-600' : 'bg-slate-200'}
        `}
      >
        <motion.div
          animate={{ x: checked ? 22 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
};

export default LuxeSwitch;
