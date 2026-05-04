import { motion } from 'framer-motion';

/**
 * LuxeAvatar - A professional avatar component for the Guest List.
 */
const LuxeAvatar = ({ 
  name = 'Guest', 
  src, 
  size = 'md',
  className = ''
}) => {
  const sizes = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-lg',
    lg: 'w-20 h-20 text-2xl'
  };

  const initials = name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className={`
      relative rounded-[24px] overflow-hidden flex items-center justify-center font-black 
      bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm
      ${sizes[size]} ${className}
    `}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default LuxeAvatar;
