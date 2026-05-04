import { motion } from 'framer-motion';

/**
 * LuxeCard - A premium container component for the Studio Workspace.
 * Uses glassmorphism and subtle shadows for a high-end feel.
 */
const LuxeCard = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  padding = 'p-8',
  action = null
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-white rounded-[32px] border border-slate-100 shadow-sm 
        hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500
        ${className}
      `}
    >
      {(title || action) && (
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            {title && <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">{title}</h3>}
            {subtitle && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{subtitle}</p>}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      
      <div className={padding}>
        {children}
      </div>
    </motion.div>
  );
};

export default LuxeCard;
