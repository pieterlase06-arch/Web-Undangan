import { motion } from 'framer-motion';
import Hero from './Hero';
import Couple from './Couple';
import EventDetails from './EventDetails';
import RSVP from './RSVP';
import Guestbook from './Guestbook';
import Countdown from './Countdown';
import MusicToggle from './MusicToggle';

const SectionWrapper = ({ children, id, visibility }) => {
  if (visibility && visibility[id] === false) return null;
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="relative w-full"
    >
      {children}
    </motion.section>
  );
};

const VogueInvitation = ({ data, isEditMode = false }) => {
  const primary = data?.primaryColor || '#000000';
  const isDark = data?.isDarkMode;

  const renderSection = (id) => {
    const custom = (data?.customSections || []).find(s => s.id === id);
    if (custom) {
      return (
        <div className="py-24 border-b border-black border-opacity-5 space-y-12">
           <div className="flex items-center gap-8">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">Editorial / {id.split('-')[1]}</span>
              <div className="flex-1 h-px bg-black opacity-5" />
           </div>
           <h3 className="text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: data?.headingFont || "'Cinzel', serif" }}>{custom.title}</h3>
           {custom.type === 'text' && <p className="text-xl leading-relaxed opacity-60 font-serif italic">"{custom.content}"</p>}
           {custom.type === 'image' && (
             <div className="aspect-video bg-stone-100 overflow-hidden">
                <img src={custom.content} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000" />
             </div>
           )}
           {custom.type === 'divider' && <div className="w-full h-[2px] bg-black" />}
        </div>
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
          <Couple 
            partner1={data?.partner1}
            partner2={data?.partner2}
            partner1Parents={data?.partner1Parents}
            partner2Parents={data?.partner2Parents}
            groomImage={data?.groomImage}
            brideImage={data?.brideImage}
          />
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
    <div className={`min-h-screen relative overflow-hidden flex flex-col ${isDark ? 'bg-black text-white' : 'bg-[#F9F9F9] text-[#1A1A1A]'}`} style={{ fontFamily: data?.bodyFont || "'Inter', sans-serif" }}>
      <MusicToggle url={data?.musicUrl} />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        {(data?.sectionOrder || ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook']).map(id => (
          <SectionWrapper key={id} id={id} visibility={data?.sectionVisibility}>
            {renderSection(id)}
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
};

export default VogueInvitation;
