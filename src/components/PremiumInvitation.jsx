import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import config from '../config';

const API_URL = config.API_URL;

// --- LUXURY ANIMATIONS ---

const FallingPetals = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const petals = [];
    for (let i = 0; i < 25; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 5 + 2,
        d: Math.random() * 1,
        a: Math.random() * 5,
        tilt: Math.random() * 10 - 10
      });
    }
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(197, 160, 89, 0.15)'; // Gold color low opacity
      petals.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y += Math.cos(p.a) + 1 + p.r / 2;
        p.x += Math.sin(p.a) * 2;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[80]" />;
};

const BottomNav = ({ activeSection, onNav, theme }) => {
  const navs = [
    { id: 'hero', icon: 'home', label: 'Home' },
    { id: 'couple', icon: 'favorite', label: 'Couple' },
    { id: 'event', icon: 'event', label: 'Event' },
    { id: 'story', icon: 'history_edu', label: 'Story' },
    { id: 'rsvp', icon: 'mail', label: 'RSVP' }
  ];
  
  return (
    <motion.div 
      initial={{ y: 100 }} animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-white/50 px-6 py-4 rounded-full shadow-2xl z-[500] flex items-center gap-8 md:gap-12"
    >
      {navs.map(n => (
        <button 
          key={n.id} 
          onClick={() => onNav(n.id)}
          className={`flex flex-col items-center gap-1 transition-all ${activeSection === n.id ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ color: activeSection === n.id ? theme.primary : 'inherit' }}>{n.icon}</span>
          <span className="text-[8px] font-black uppercase tracking-widest">{n.label}</span>
        </button>
      ))}
    </motion.div>
  );
};

// --- MAIN LUXURY COMPONENT ---

const PremiumInvitation = ({ data, isEditMode = false, forceShowCover = false, onEdit = () => {} }) => {
  const [isOpened, setIsOpened] = useState(isEditMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [messages, setMessages] = useState([]);
  
  const audioRef = useRef(null);
  const sectionRefs = {
    hero: useRef(null), couple: useRef(null), event: useRef(null), story: useRef(null), rsvp: useRef(null)
  };

  const themes = {
    gold: { primary: '#C5A059', bg: '#FCF9F6', text: '#1C1917', fontSerif: '"Cinzel", serif', fontScript: '"Pinyon Script", cursive' },
    emerald: { primary: '#064E3B', bg: '#ECFDF5', text: '#064E3B', fontSerif: '"Playfair Display", serif', fontScript: '"Dancing Script", cursive' },
    linen: { primary: '#44403C', bg: '#F5F5F4', text: '#1C1917', fontSerif: '"Cormorant Garamond", serif', fontScript: '"Great Vibes", cursive' }
  };

  const theme = useMemo(() => ({
    ...(themes[data.themeId] || themes.gold),
    primary: data.primaryColor || (themes[data.themeId] || themes.gold).primary,
    fontSerif: data.fontFamily || (themes[data.themeId] || themes.gold).fontSerif,
    fontScript: data.titleFont || (themes[data.themeId] || themes.gold).fontScript,
  }), [data]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/messages`);
      if (res.ok) setMessages(await res.json());
    } catch (err) { console.log(err); }
  };

  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.play();
  };

  const scrollTo = (id) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const reveal = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 1.2 } };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: theme.fontSerif }}>
      <audio ref={audioRef} src={data.musicUrl} loop />
      <FallingPetals />
      
      {isOpened && <BottomNav activeSection={activeSection} onNav={scrollTo} theme={theme} />}

      <AnimatePresence>
        {!isOpened && (
          <motion.div exit={{ y: '-100%' }} transition={{ duration: 1.5, ease: [0.82, 0, 0.18, 1] }} className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#FCF9F6] p-6">
             <div className="text-center space-y-12 max-w-lg">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40">The Wedding of</p>
                   <h1 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h1>
                </motion.div>
                <div className="w-px h-20 bg-stone-300 mx-auto" />
                <button onClick={handleOpen} className="px-16 py-6 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-105 transition-all">Buka Undangan</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpened && (
        <div className="space-y-40 lg:space-y-80 pb-40">
           {/* HERO */}
           <section ref={sectionRefs.hero} className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-16">
              <motion.div {...reveal} className="lg:w-1/2 flex justify-center">
                 <div className="w-72 h-[450px] md:w-96 md:h-[650px] rounded-[150px] border-[20px] border-white shadow-2xl overflow-hidden rotate-2">
                    <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800'} className="w-full h-full object-cover" />
                 </div>
              </motion.div>
              <motion.div {...reveal} transition={{ delay: 0.3 }} className="lg:w-1/2 text-center lg:text-left space-y-8">
                 <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40">Wedding Invitation</p>
                 <h2 className="text-7xl md:text-8xl lg:text-[9rem] leading-tight" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h2>
                 <p className="text-xl font-bold tracking-widest">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </motion.div>
           </section>

           {/* COUPLE */}
           <section ref={sectionRefs.couple} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div {...reveal} className="text-center lg:text-right space-y-10">
                 <div className="w-64 h-64 md:w-80 md:h-80 mx-auto lg:ml-auto rounded-[60px] border-8 border-white shadow-2xl overflow-hidden rotate-6">
                    <img src={data.groomImage} className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-5xl md:text-7xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1}</h3>
                    <p className="text-xs opacity-40 uppercase font-black tracking-widest">Putra dari {data.partner1Parents}</p>
                 </div>
              </motion.div>
              <motion.div {...reveal} transition={{ delay: 0.3 }} className="text-center lg:text-left space-y-10">
                 <div className="w-64 h-64 md:w-80 md:h-80 mx-auto lg:mr-auto rounded-[60px] border-8 border-white shadow-2xl overflow-hidden -rotate-6">
                    <img src={data.brideImage} className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-5xl md:text-7xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner2}</h3>
                    <p className="text-xs opacity-40 uppercase font-black tracking-widest">Putri dari {data.partner2Parents}</p>
                 </div>
              </motion.div>
           </section>

           {/* EVENT */}
           <section ref={sectionRefs.event} className="px-6 lg:px-24">
              <div className="bg-white/80 backdrop-blur-3xl rounded-[100px] p-12 md:p-32 shadow-2xl border border-white grid grid-cols-1 lg:grid-cols-3 gap-20">
                 <motion.div {...reveal} className="space-y-6 text-center">
                    <span className="material-symbols-outlined text-5xl opacity-20" style={{ color: theme.primary }}>church</span>
                    <h4 className="text-3xl" style={{ fontFamily: theme.fontScript }}>Akad Nikah</h4>
                    <p className="font-bold">{data.time} WIB • {data.venue}</p>
                 </motion.div>
                 <motion.div {...reveal} transition={{ delay: 0.2 }} className="space-y-6 text-center lg:border-x border-stone-100 lg:px-10">
                    <span className="material-symbols-outlined text-5xl opacity-20" style={{ color: theme.primary }}>restaurant</span>
                    <h4 className="text-3xl" style={{ fontFamily: theme.fontScript }}>Resepsi</h4>
                    <p className="font-bold">11:00 WIB • {data.venue}</p>
                 </motion.div>
                 <motion.div {...reveal} transition={{ delay: 0.4 }} className="space-y-6 text-center">
                    <span className="material-symbols-outlined text-5xl opacity-20" style={{ color: theme.primary }}>location_on</span>
                    <h4 className="text-3xl" style={{ fontFamily: theme.fontScript }}>Location</h4>
                    <p className="text-xs opacity-60 mb-4">{data.address}</p>
                    <a href={data.mapsLink} target="_blank" className="inline-block px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Buka Maps</a>
                 </motion.div>
              </div>
           </section>

           {/* STORY */}
           {data.showStory !== false && (
             <section ref={sectionRefs.story} className="max-w-4xl mx-auto px-6 space-y-24">
                <div className="text-center space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30">Our Journey</p>
                   <h2 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>Love Story</h2>
                </div>
                <div className="space-y-20 relative before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-stone-200">
                   {(data.stories || []).map((s, i) => (
                     <motion.div key={i} {...reveal} className={`flex items-center gap-10 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <div className="w-1/2 p-8 bg-white rounded-[40px] shadow-xl border border-stone-50">
                           <span className="text-[10px] font-black opacity-30">{s.year}</span>
                           <h4 className="serif text-xl font-bold mb-2">{s.title}</h4>
                           <p className="text-sm opacity-60 italic">{s.desc}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-white border-2 border-[#C5A059] z-10 flex items-center justify-center shrink-0">
                           <span className="material-symbols-outlined text-[18px]" style={{ color: theme.primary }}>{s.icon || 'favorite'}</span>
                        </div>
                        <div className="w-1/2" />
                     </motion.div>
                   ))}
                </div>
             </section>
           )}

           {/* RSVP */}
           <section ref={sectionRefs.rsvp} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
              <motion.div {...reveal} className="bg-white p-12 lg:p-24 rounded-[80px] shadow-2xl space-y-10">
                 <h2 className="text-5xl md:text-7xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>Konfirmasi Kehadiran</h2>
                 <div className="space-y-6">
                    <input className="w-full px-8 py-5 bg-stone-50 rounded-3xl outline-none border border-stone-100" placeholder="Nama Anda" />
                    <textarea className="w-full px-8 py-5 bg-stone-50 rounded-3xl outline-none border border-stone-100 h-40" placeholder="Ucapan Doa..." />
                    <button className="w-full py-6 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl">Kirim Konfirmasi</button>
                 </div>
              </motion.div>
              <div className="space-y-12 h-[800px] overflow-y-auto no-scrollbar pt-10">
                 <h3 className="serif text-3xl font-black mb-10">Wishes for Couple</h3>
                 <div className="space-y-8">
                    {messages.map((m, i) => (
                      <motion.div key={i} className="bg-white/60 p-10 rounded-[50px] shadow-xl border border-white space-y-4">
                         <p className="font-black text-stone-900 text-sm">{m.name}</p>
                         <p className="text-sm opacity-60 italic">"{m.message}"</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </section>

           <footer className="py-20 text-center space-y-10 border-t border-stone-100">
              <h2 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-10">LuxeInvite • Crafted with Perfection</p>
           </footer>
        </div>
      )}
    </div>
  );
};

export default PremiumInvitation;
