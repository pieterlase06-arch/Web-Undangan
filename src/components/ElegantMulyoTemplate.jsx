import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';

// Import Refactored Modular Components
import Hero from './Hero';
import EventDetails from './EventDetails';
import RSVP from './RSVP';
import Guestbook from './Guestbook';
import Countdown from './Countdown';
import MusicToggle from './MusicToggle';

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

const ElegantMulyoTemplate = ({ data, isEditMode = false, onElementSelect, updateData, highlightedId }) => {
  const [isOpened, setIsOpened] = useState(isEditMode);

  // DESIGN TOKENS
  const primary = data?.primaryColor || '#C5A059'; // Gold
  const bgColor = data?.bgColor || '#F4F1EA'; // Cream/Beige
  const surfaceColor = data?.surfaceColor || '#FFFFFF';
  const textColor = data?.textColor || '#2C1B18'; // Dark Brown
  
  const headingFont = data?.headingFont || "'Playfair Display', serif";
  const bodyFont = data?.bodyFont || "'Inter', sans-serif";
  const accentFont = data?.accentFont || "'Pinyon Script', cursive";
  
  const borderRadius = `${data?.borderRadius || 0}px`; // More square for traditional look
  const shadow = `0 ${data?.shadowStrength || 20}px ${data?.shadowStrength * 3 || 60}px rgba(0,0,0,0.05)`;
  const layoutMode = data?.layoutMode || 'full';
  const containerWidth = data?.containerWidth || 'max-w-4xl';
  const animation = data?.entranceAnimation || 'reveal';

  const spacing = parseInt(data?.contentSpacing || '100');
  const padding = parseInt(data?.containerPadding || '20');

  const CardWrapper = ({ children, className = "" }) => (
    <div 
      className={`${containerWidth} mx-auto transition-all duration-700 ${layoutMode === 'card' ? 'p-8 md:p-16 border border-[#E5E0D5]' : ''} ${className}`}
      style={{ 
        backgroundColor: layoutMode === 'card' ? surfaceColor : 'transparent',
        borderRadius: layoutMode === 'card' ? borderRadius : '0px',
        boxShadow: layoutMode === 'card' ? shadow : 'none',
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
      </div>
    );
  };

  const renderSection = (id) => {
    switch (id) {
      case 'hero':
        return (
          <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
             {/* Floral Decorations */}
             <motion.img 
                initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
                whileInView={{ opacity: 0.6, rotate: 0, scale: 1 }}
                src="/assets/floral-mulyo.png"
                className="absolute top-[-5%] left-[-10%] w-[50%] md:w-[30%] opacity-40 pointer-events-none"
             />
             <motion.img 
                initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
                whileInView={{ opacity: 0.6, rotate: 0, scale: 1 }}
                src="/assets/floral-mulyo.png"
                className="absolute bottom-[-5%] right-[-10%] w-[50%] md:w-[30%] opacity-40 pointer-events-none scale-x-[-1]"
             />

             <div className="z-10 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-[12px] font-bold uppercase tracking-[0.4em] opacity-40">The Wedding Of</p>
                  <h1 className="text-7xl md:text-9xl leading-tight" style={{ fontFamily: headingFont, color: primary }}>
                    {data?.partner1} <br/> & <br/> {data?.partner2}
                  </h1>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <div className="w-12 h-px bg-current mx-auto opacity-20" />
                  <p className="text-xl md:text-2xl font-serif italic opacity-60" style={{ color: textColor }}>{data?.dateText} • {data?.yearText}</p>
                  <div className="w-12 h-px bg-current mx-auto opacity-20" />
                </motion.div>
                
                {!isOpened && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpened(true)}
                    className="px-10 py-4 bg-[#2C1B18] text-white rounded-full text-[12px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#3C2B28] transition-all"
                  >
                    Buka Undangan
                  </motion.button>
                )}
             </div>
          </div>
        );
      case 'couple':
        return (
          <div className={`${containerWidth} mx-auto px-6 space-y-24`}>
             <div className="text-center space-y-6">
                <h2 className="text-5xl md:text-6xl" style={{ fontFamily: headingFont, color: primary }}>Assalamu’alaikum Wr. Wb.</h2>
                <p className="max-w-2xl mx-auto text-lg leading-relaxed opacity-70 italic" style={{ fontFamily: bodyFont }}>
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
                </p>
                <p className="font-bold opacity-40">— QS. Ar-Rum: 21</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                {[
                  { name: data?.partner1, parents: data?.partner1Parents, img: data?.groomImage, role: 'Putra dari', t: data?.groomTransform, type: 'groom' },
                  { name: data?.partner2, parents: data?.partner2Parents, img: data?.brideImage, role: 'Putri dari', t: data?.brideTransform, type: 'bride' }
                ].map((p, i) => (
                  <div key={i} className="text-center space-y-8">
                     <div className="relative mx-auto w-64 h-96 overflow-hidden border-[12px] border-white shadow-xl rotate-[-2deg] odd:rotate-[2deg]" style={{ borderRadius: '4px' }}>
                        <ImageEngine src={p.img} transform={p.t} type={p.type} className="w-full h-full" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-5xl" style={{ fontFamily: accentFont, color: primary }}>{p.name}</h3>
                        <p className="text-[12px] font-bold tracking-[0.1em] opacity-40 italic">{p.role} {p.parents}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'event':
        return (
          <CardWrapper className="bg-white/50 backdrop-blur-sm border border-white/40">
             <EventDetails data={data} />
          </CardWrapper>
        );
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
    <div className="min-h-screen relative selection:bg-[#C5A059] selection:text-white" style={{ backgroundColor: bgColor, color: textColor, fontFamily: bodyFont }}>
      <MusicToggle url={data?.musicUrl} />
      
      {!isOpened && !isEditMode ? (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#F4F1EA]">
           <div className="text-center space-y-10 px-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <p className="text-[10px] font-black tracking-[0.5em] uppercase opacity-40">Special Invitation</p>
                <h2 className="text-6xl md:text-8xl" style={{ fontFamily: headingFont, color: primary }}>{data?.partner1} & {data?.partner2}</h2>
                <div className="h-px w-20 bg-current mx-auto opacity-20" />
              </motion.div>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpened(true)}
                className="px-12 py-5 bg-[#2C1B18] text-white rounded-full text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl"
              >
                Buka Undangan
              </motion.button>
           </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center">
          {(data?.sectionOrder || ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook']).map((id) => (
            <SectionWrapper key={id} id={id} visibility={data?.sectionVisibility || {}} spacing={spacing} padding={padding} animation={animation} isHighlighted={highlightedId === id}>
               {renderSection(id)}
            </SectionWrapper>
          ))}
          
          <footer className="py-40 text-center space-y-8">
             <div className="h-px w-24 bg-current mx-auto opacity-10" />
             <h2 className="text-7xl" style={{ fontFamily: accentFont, color: primary }}>{data?.partner1} & {data?.partner2}</h2>
             <p className="text-[10px] font-black uppercase tracking-[1em] opacity-10">See You on Our Big Day</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ElegantMulyoTemplate;
