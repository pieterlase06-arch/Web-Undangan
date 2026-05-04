import { motion } from 'framer-motion';
import RSVP from './RSVP';
import Guestbook from './Guestbook';
import MusicToggle from './MusicToggle';

const SectionWrapper = ({ children, id, visibility }) => {
  if (visibility && visibility[id] === false) return null;
  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative w-full"
    >
      {children}
    </motion.section>
  );
};

const SnapPhotoInvitation = ({ data, isEditMode = false }) => {
  const isDark = data?.isDarkMode;
  const partner1 = data?.partner1 || 'Pria';
  const partner2 = data?.partner2 || 'Wanita';
  const dateStr = data?.date || '2026-01-01';

  const photos = [
    data?.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800',
    data?.brideImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800'
  ];

  const renderSection = (id) => {
    switch (id) {
      case 'hero':
        return (
          <header className="text-center py-20 space-y-6">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block border border-current px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                {new Date(dateStr).getFullYear()} Collection
             </motion.div>
             <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none" style={{ fontFamily: data?.headingFont || "'Montserrat', sans-serif" }}>
                {partner1.split(' ')[0]} <span className="text-stone-400">&</span> {partner2.split(' ')[0]}
             </h1>
             <p className="text-xl font-medium tracking-[0.5em] uppercase opacity-40 italic">#FinallyMarried</p>
          </header>
        );
      case 'grid':
        return (
          <section className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
             {photos.map((src, i) => (
               <motion.div 
                 key={i} 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="relative group overflow-hidden rounded-[32px] bg-zinc-200"
               >
                  <img src={src} className="w-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                     <p className="text-white text-[10px] font-black uppercase tracking-widest">Moments / 0{i+1}</p>
                  </div>
               </motion.div>
             ))}
          </section>
        );
      case 'event':
        return (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="p-12 bg-white dark:bg-zinc-900 rounded-[50px] shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-10 text-zinc-900 dark:text-white">
                <h3 className="text-4xl font-black uppercase tracking-tighter">The Couple</h3>
                <div className="space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-stone-100 shrink-0 overflow-hidden"><img src={data?.groomImage} className="w-full h-full object-cover" /></div>
                      <div>
                         <p className="text-sm font-black uppercase">{partner1}</p>
                         <p className="text-[10px] opacity-40 font-bold uppercase">The Groom</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-stone-100 shrink-0 overflow-hidden"><img src={data?.brideImage} className="w-full h-full object-cover" /></div>
                      <div>
                         <p className="text-sm font-black uppercase">{partner2}</p>
                         <p className="text-[10px] opacity-40 font-bold uppercase">The Bride</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-12 bg-zinc-950 text-white rounded-[50px] shadow-2xl space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#C5A059] opacity-20 blur-[80px]" />
                <h3 className="text-4xl font-black uppercase tracking-tighter">The Event</h3>
                <div className="space-y-8">
                   <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Date</p>
                      <p className="text-xl font-bold">{new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                   </div>
                   <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Time</p>
                      <p className="text-xl font-bold">{data?.time} WIB</p>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Venue</p>
                      <p className="text-xl font-bold text-right">{data?.venue}</p>
                   </div>
                </div>
                <a href={data?.mapsLink} target="_blank" className="block w-full py-5 bg-white text-zinc-950 rounded-2xl text-center font-black uppercase tracking-[0.3em] text-[10px]">Open Directions</a>
             </div>
          </section>
        );
      case 'rsvp':
        return <RSVP data={data} />;
      case 'guestbook':
        return <Guestbook data={data} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen relative p-6 md:p-12 space-y-12 ${isDark ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`} style={{ fontFamily: data?.bodyFont || "'Montserrat', sans-serif" }}>
      <MusicToggle url={data?.musicUrl} />
      
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center space-y-24">
        {(data?.sectionOrder || ['hero', 'grid', 'event', 'rsvp', 'guestbook']).map(id => (
          <SectionWrapper key={id} id={id} visibility={data?.sectionVisibility}>
            {renderSection(id)}
          </SectionWrapper>
        ))}
      </div>

      <footer className="py-40 text-center space-y-12">
         <p className="text-2xl font-black uppercase tracking-tighter opacity-10 leading-none select-none">Invitation Invitation Invitation Invitation</p>
         <div className="space-y-6 max-w-lg mx-auto">
            <p className="text-sm font-medium leading-relaxed italic opacity-60">"{data?.quote}"</p>
            <div className="w-12 h-px bg-current mx-auto opacity-20" />
            <h2 className="text-4xl font-black uppercase tracking-tighter">{partner1.split(' ')[0]} & {partner2.split(' ')[0]}</h2>
         </div>
      </footer>
    </div>
  );
};

export default SnapPhotoInvitation;
