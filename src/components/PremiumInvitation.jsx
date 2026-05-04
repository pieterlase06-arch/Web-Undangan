import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

// Import Refactored Modular Components
import Hero from './Hero';
import EventDetails from './EventDetails';
import RSVP from './RSVP';
import Guestbook from './Guestbook';
import Countdown from './Countdown';
import MusicToggle from './MusicToggle';

const API_URL = config.API_URL;

const SectionWrapper = ({ children, id, visibility, spacing, padding, animation, isHighlighted }) => {
  if (visibility && visibility[id] === false) return null;

  const variants = {
    reveal: { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } },
    slide: { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 } },
    zoom: { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 } }
  };

  const selectedVariant = variants[animation] || variants.reveal;

  return (
    <motion.section 
      initial={selectedVariant.initial}
      whileInView={selectedVariant.whileInView}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      style={{ 
        paddingTop: `${spacing}px`, 
        paddingBottom: `${spacing}px`, 
        paddingLeft: `${padding}px`, 
        paddingRight: `${padding}px` 
      }}
      className="relative w-full group"
    >
      <AnimatePresence>
        {isHighlighted && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none ring-[12px] ring-indigo-500/30 ring-inset bg-indigo-500/5 animate-pulse"
          />
        )}
      </AnimatePresence>
      {children}
    </motion.section>
  );
};

const PremiumInvitation = ({ data, isEditMode = false, onElementSelect, updateData, highlightedId }) => {
  const [isOpened, setIsOpened] = useState(isEditMode);

  // DESIGN TOKENS
  const primary = data?.primaryColor || '#C5A059';
  const bgColor = data?.bgColor || '#FCF9F6';
  const surfaceColor = data?.surfaceColor || '#FFFFFF';
  const textColor = data?.textColor || '#1C1917';
  
  const headingFont = data?.headingFont || "'Cinzel', serif";
  const bodyFont = data?.bodyFont || "'Inter', sans-serif";
  const accentFont = data?.accentFont || "'Pinyon Script', cursive";
  
  const borderRadius = `${data?.borderRadius || 40}px`;
  const shadow = `0 ${data?.shadowStrength || 20}px ${data?.shadowStrength * 3 || 60}px rgba(0,0,0,0.08)`;
  const layoutMode = data?.layoutMode || 'card';
  const containerWidth = data?.containerWidth || 'max-w-5xl';
  const animation = data?.entranceAnimation || 'reveal';

  const spacing = parseInt(data?.contentSpacing || '120');
  const padding = parseInt(data?.containerPadding || '40');

  const CardWrapper = ({ children, className = "" }) => (
    <div 
      className={`${containerWidth} mx-auto transition-all duration-700 ${layoutMode === 'card' ? 'p-12 md:p-24' : ''} ${className}`}
      style={{ 
        backgroundColor: layoutMode === 'card' ? surfaceColor : 'transparent',
        borderRadius: layoutMode === 'card' ? borderRadius : '0px',
        boxShadow: layoutMode === 'card' ? shadow : 'none',
        border: layoutMode === 'card' ? '1px solid rgba(0,0,0,0.03)' : 'none'
      }}
    >
      {children}
    </div>
  );

  const ImageEngine = ({ src, transform, type, id, className = "" }) => {
    const t = transform || { scale: 1, x: 0, y: 0 };
    const containerRef = useRef(null);

    const handleDragEnd = (event, info) => {
      if (!isEditMode) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const deltaX = (info.offset.x / width) * 100;
      const deltaY = (info.offset.y / height) * 100;
      const newX = t.x + deltaX;
      const newY = t.y + deltaY;

      if (type === 'custom') {
        updateData({ customSections: data?.customSections?.map(s => s.id === id ? { ...s, transform: { ...s.transform, x: newX, y: newY } } : s) });
      } else {
        updateData({ [`${type}Transform`]: { ...(data[`${type}Transform`] || {scale:1,x:0,y:0}), x: newX, y: newY } });
      }
    };

    return (
      <div 
        ref={containerRef}
        onClick={(e) => { if (isEditMode) { e.stopPropagation(); onElementSelect({ type, id }); } }}
        className={`overflow-hidden relative bg-stone-50 group/engine cursor-move transition-all ${className} ${isEditMode ? 'ring-4 ring-transparent hover:ring-indigo-600/40' : ''}`}
      >
        <motion.img 
          src={src} 
          drag={isEditMode}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={{ scale: t.scale, x: `${t.x}%`, y: `${t.y}%` }}
          transition={{ duration: isEditMode ? 0.1 : 0.4 }}
          className="w-full h-full object-cover origin-center select-none pointer-events-none"
        />
        {isEditMode && (
           <div className="absolute inset-0 border-4 border-indigo-600/20 pointer-events-none opacity-0 group-hover/engine:opacity-100 transition-all">
              <div className="absolute top-4 left-4 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase shadow-2xl flex items-center gap-2">
                 <span className="material-symbols-outlined text-[14px]">open_with</span> Direct Pan
              </div>
           </div>
        )}
      </div>
    );
  };

  const renderSection = (id) => {
    const custom = (data?.customSections || []).find(s => s.id === id);
    if (custom) {
      return (
        <CardWrapper className="space-y-16">
           {custom.title && (
             <div className="text-center space-y-4">
                <h3 className="text-5xl md:text-7xl" style={{ fontFamily: accentFont, color: primary }}>{custom.title}</h3>
                <div className="w-16 h-px bg-current mx-auto opacity-10" />
             </div>
           )}
           
           {custom.type === 'text' && (
             <p 
               onClick={() => isEditMode && onElementSelect({ type: 'custom', id: custom.id })}
               className={`text-xl leading-relaxed opacity-80 font-serif cursor-pointer mx-auto max-w-3xl ${isEditMode ? 'hover:bg-indigo-50 rounded-[32px] p-10' : ''}`} 
               style={{ 
                 color: custom.style?.color || textColor, 
                 fontSize: `${custom.style?.fontSize || 24}px`,
                 textAlign: custom.style?.textAlign || 'center'
               }}
             >
                {custom.content}
             </p>
           )}

           {custom.type === 'image' && (
             <ImageEngine src={custom.content} transform={custom.transform} type="custom" id={custom.id} className="w-full aspect-[16/10] rounded-[48px] shadow-2xl" />
           )}

           {custom.type === 'grid' && (
             <div className={`grid gap-6 md:gap-10`} style={{ gridTemplateColumns: `repeat(${custom.style?.columns || 2}, 1fr)` }}>
                {(Array.isArray(custom.content) ? custom.content : []).map((img, idx) => (
                   <ImageEngine key={idx} src={img} type="custom" id={custom.id} className="w-full aspect-square rounded-[32px] shadow-xl" />
                ))}
             </div>
           )}

           {custom.type === 'divider' && (
             <div 
               onClick={() => isEditMode && onElementSelect({ type: 'custom', id: custom.id })}
               className={`w-40 mx-auto cursor-pointer ${isEditMode ? 'hover:bg-indigo-50 p-6 rounded-full' : ''}`}
             >
                <div style={{ height: `${custom.style?.thickness || 2}px`, backgroundColor: primary }} className="w-full opacity-40" />
             </div>
           )}
        </CardWrapper>
      );
    }

    switch (id) {
      case 'hero':
        return (
          <Hero 
            partner1={data?.partner1}
            partner2={data?.partner2}
            date={data?.dateText}
            year={data?.yearText}
            venue={data?.venue}
            location={data?.location}
            image={data?.heroBgImage}
          />
        );
      case 'couple':
        return (
          <div className={`${containerWidth} mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center px-6`}>
             {[
               { name: data?.partner1, parents: data?.partner1Parents, img: data?.groomImage, role: 'THE GROOM', t: data?.groomTransform, type: 'groom' },
               { name: data?.partner2, parents: data?.partner2Parents, img: data?.brideImage, role: 'THE BRIDE', t: data?.brideTransform, type: 'bride' }
             ].map((p, i) => (
               <div key={i} className="text-center space-y-12">
                  <div className="relative mx-auto w-80 h-[480px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden" style={{ borderRadius: borderRadius }}>
                     <ImageEngine src={p.img} transform={p.t} type={p.type} className="w-full h-full" />
                  </div>
                  <div className="space-y-4">
                     <p className="text-[10px] font-black tracking-[0.4em] opacity-20 uppercase" style={{ color: textColor }}>{p.role}</p>
                     <h3 className="text-7xl" style={{ fontFamily: accentFont, color: primary }}>{p.name}</h3>
                     <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 italic" style={{ color: textColor }}>Putra dari {p.parents}</p>
                  </div>
               </div>
             ))}
          </div>
        );
      case 'event':
        return <EventDetails data={data} />;
      case 'countdown':
        return <Countdown targetDate={data?.countdownDate} />;
      case 'rsvp':
        return <RSVP data={data} />;
      case 'guestbook':
        return <Guestbook data={data} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: bgColor, color: textColor, fontFamily: bodyFont }}>
      <MusicToggle url={data?.musicUrl} />
      
      <div className="relative z-10 flex flex-col items-center">
        {(data?.sectionOrder || ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook']).map((id) => (
          <SectionWrapper key={id} id={id} visibility={data?.sectionVisibility || {}} spacing={spacing} padding={padding} animation={animation} isHighlighted={highlightedId === id}>
             {renderSection(id)}
          </SectionWrapper>
        ))}
      </div>

      <footer className="py-60 text-center">
         <h2 className="text-8xl" style={{ fontFamily: accentFont, color: primary }}>{data?.partner1} & {data?.partner2}</h2>
         <p className="text-[11px] font-black uppercase tracking-[1.2em] opacity-5 mt-16">The Eternal Covenant</p>
      </footer>
    </div>
  );
};

export default PremiumInvitation;
