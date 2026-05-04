import { motion } from 'framer-motion';
import Hero from './Hero';
import Couple from './Couple';
import EventDetails from './EventDetails';
import RSVP from './RSVP';
import Guestbook from './Guestbook';
import Countdown from './Countdown';
import MusicToggle from './MusicToggle';

const FloralDecoration = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[100px] -mr-48 -mt-48" />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-100 rounded-full blur-[100px] -ml-48 -mb-48" />
  </div>
);

const SectionWrapper = ({ children, id, visibility }) => {
  if (visibility && visibility[id] === false) return null;
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
      className="relative w-full"
    >
      {children}
    </motion.section>
  );
};

const FloralInvitation = ({ data, isEditMode = false }) => {
  const primary = data?.primaryColor || '#606C38';
  const isDark = data?.isDarkMode;

  const renderSection = (id) => {
    const custom = (data?.customSections || []).find(s => s.id === id);
    if (custom) {
      return (
        <div className="py-20 text-center space-y-8">
           <h3 className="text-4xl" style={{ fontFamily: data?.accentFont || "'Pinyon Script', cursive", color: primary }}>{custom.title}</h3>
           {custom.type === 'text' && <p className="text-lg italic opacity-60 max-w-2xl mx-auto">"{custom.content}"</p>}
           {custom.type === 'image' && (
             <div className="max-w-3xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-stone-100">
                <img src={custom.content} className="w-full h-full object-cover" />
             </div>
           )}
           {custom.type === 'divider' && <div className="w-24 h-px bg-stone-300 mx-auto" />}
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
    <div className={`min-h-screen relative overflow-hidden flex flex-col items-center ${isDark ? 'bg-stone-900 text-stone-100' : 'bg-[#FEFAE0] text-[#283618]'}`} style={{ fontFamily: data?.bodyFont || "'Prata', serif" }}>
      <MusicToggle url={data?.musicUrl} />
      <FloralDecoration />
      
      <div className="relative z-10 w-full flex flex-col items-center">
        {(data?.sectionOrder || ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook']).map(id => (
          <SectionWrapper key={id} id={id} visibility={data?.sectionVisibility}>
            {renderSection(id)}
          </SectionWrapper>
        ))}
      </div>
    </div>
  );
};

export default FloralInvitation;
