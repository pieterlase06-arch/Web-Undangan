import { motion } from 'framer-motion';

/**
 * LuxeBadge - A premium status label for invitations and tracking.
 */
const LuxeBadge = ({ 
  label, 
  variant = 'default', 
  size = 'md',
  className = ''
}) => {
  const themes = {
    default: 'bg-stone-100 text-stone-400',
    success: 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20',
    primary: 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20',
    warning: 'bg-amber-500 text-white shadow-lg shadow-amber-500/20',
    outline: 'border border-stone-200 text-stone-400 bg-transparent'
  };

  const sizes = {
    sm: 'px-3 py-1 text-[8px]',
    md: 'px-5 py-2 text-[10px]',
    lg: 'px-7 py-3 text-[12px]'
  };

  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center justify-center font-black uppercase tracking-[0.2em] rounded-2xl
        ${themes[variant]} ${sizes[size]} ${className}
      `}
    >
      {label}
    </motion.span>
  );
};

export default LuxeBadge;
