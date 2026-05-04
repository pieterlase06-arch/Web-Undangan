import { motion } from 'framer-motion';

/**
 * LuxeButton - Atomic button component for the Studio Workspace.
 * Designed for a professional, industrial SaaS look.
 */
const LuxeButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  icon = null,
  disabled = false,
  fullWidth = false,
  loading = false
}) => {
  const baseStyles = "relative flex items-center justify-center gap-2 font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200/50",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-200/50",
    outline: "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50",
    dark: "bg-slate-900 text-white hover:bg-black shadow-xl"
  };
  
  const sizes = {
    xs: "px-3 py-1.5 text-[8px] rounded-lg",
    sm: "px-4 py-2 text-[9px] rounded-xl",
    md: "px-6 py-3 text-[10px] rounded-2xl",
    lg: "px-8 py-4 text-[11px] rounded-2xl"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined text-base">{icon}</span>}
          {children}
        </>
      )}
      
      {/* Subtle Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
    </motion.button>
  );
};

export default LuxeButton;
