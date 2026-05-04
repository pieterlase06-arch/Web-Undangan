import { motion } from 'framer-motion';

/**
 * LuxeTypography - Standardized typography component for the LuxeInvite ecosystem.
 * Supports various industrial levels: h1, h2, h3, body, detail, caption.
 */
const LuxeTypography = ({ 
  variant = 'body', 
  children, 
  className = '', 
  style = {},
  italic = false,
  bold = false,
  tracking = 'normal'
}) => {
  const baseClass = "transition-all duration-300";
  
  const variants = {
    h1: "text-6xl md:text-8xl font-black tracking-tighter leading-none serif",
    h2: "text-4xl md:text-6xl font-black tracking-tighter serif",
    h3: "text-2xl md:text-3xl font-black tracking-tight serif",
    h4: "text-xl font-black tracking-tight serif",
    body: "text-base font-medium leading-relaxed",
    detail: "text-[10px] font-black uppercase tracking-[0.4em]",
    caption: "text-[8px] font-bold uppercase tracking-[0.2em]"
  };

  const selectedVariant = variants[variant] || variants.body;
  const combinedClass = `${baseClass} ${selectedVariant} ${italic ? 'italic' : ''} ${bold ? 'font-black' : ''} ${className}`;

  return (
    <div className={combinedClass} style={style}>
      {children}
    </div>
  );
};

export default LuxeTypography;
