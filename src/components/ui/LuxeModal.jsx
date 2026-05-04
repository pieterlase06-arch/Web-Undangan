import { motion, AnimatePresence } from 'framer-motion';

/**
 * LuxeModal - A high-fidelity modal component for the Studio.
 * Uses backdrop blur and smooth spring animations.
 */
const LuxeModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'max-w-2xl',
  footer = null
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 lg:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`
              relative w-full ${maxWidth} bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-full
            `}
          >
            {/* Header */}
            <div className="px-10 pt-10 pb-6 flex items-center justify-between border-b border-slate-50">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-800">
                {title}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition-all text-slate-400 hover:text-slate-900"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              {children}
            </div>
            
            {/* Footer */}
            {footer && (
              <div className="px-10 py-8 bg-slate-50 flex items-center justify-end gap-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LuxeModal;
