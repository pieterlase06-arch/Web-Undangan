import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import config from '../config';

const API_URL = config.API_URL;

// --- LUXURY ANIMATIONS ---

const FallingPetals = ({ isDark }) => {
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
        a: Math.random() * 5
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = isDark ? 'rgba(197, 160, 89, 0.3)' : 'rgba(197, 160, 89, 0.15)';
      petals.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        p.y += 1 + p.r / 2; p.x += Math.sin(p.a) * 2;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDark]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[80]" />;
};

const BottomNav = ({ activeSection, onNav, theme }) => {
  const navs = [
    { id: 'hero', icon: 'home' }, { id: 'couple', icon: 'favorite' }, { id: 'event', icon: 'event' }, { id: 'story', icon: 'history_edu' }, { id: 'rsvp', icon: 'mail' }
  ];
  return (
    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-4 rounded-full shadow-2xl z-[500] flex items-center gap-10">
      {navs.map(n => (
        <button key={n.id} onClick={() => onNav(n.id)} className={`transition-all ${activeSection === n.id ? 'scale-125' : 'opacity-40 hover:opacity-100'}`}>
          <span className="material-symbols-outlined text-[22px]" style={{ color: activeSection === n.id ? theme.primary : 'white' }}>{n.icon}</span>
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
  
  const isDark = data.isDarkMode === true;
  const audioRef = useRef(null);
  const sectionRefs = { hero: useRef(null), couple: useRef(null), event: useRef(null), story: useRef(null), rsvp: useRef(null) };

  const themes = {
    gold: { primary: '#C5A059', bg: '#FCF9F6', darkBg: '#0C0A09', text: '#1C1917', darkText: '#F5F5F4', fontSerif: '"Cinzel", serif', fontScript: '"Pinyon Script", cursive' },
    emerald: { primary: '#10B981', bg: '#ECFDF5', darkBg: '#064E3B', text: '#064E3B', darkText: '#ECFDF5', fontSerif: '"Playfair Display", serif', fontScript: '"Dancing Script", cursive' },
    linen: { primary: '#A8A29E', bg: '#F5F5F4', darkBg: '#1C1917', text: '#1C1917', darkText: '#F5F5F4', fontSerif: '"Cormorant Garamond", serif', fontScript: '"Great Vibes", cursive' }
  };

  const theme = useMemo(() => {
    const base = themes[data.themeId] || themes.gold;
    return {
      ...base,
      primary: data.primaryColor || base.primary,
      bg: isDark ? base.darkBg : base.bg,
      text: isDark ? base.darkText : base.text,
      fontSerif: data.fontFamily || base.fontSerif,
      fontScript: data.titleFont || base.fontScript,
    };
  }, [data, isDark]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/messages`);
      if (res.ok) setMessages(await res.json());
    } catch (err) { console.log(err); }
  };

  const handleOpen = () => { setIsOpened(true); setIsPlaying(true); if (audioRef.current) audioRef.current.play(); };
  const scrollTo = (id) => { sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' }); setActiveSection(id); };
  const reveal = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 1.2 } };

  return (
    <div className="min-h-screen relative transition-colors duration-1000" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: theme.fontSerif }}>
      <audio ref={audioRef} src={data.musicUrl} loop />
      <FallingPetals isDark={isDark} />
      
      {isOpened && <BottomNav activeSection={activeSection} onNav={scrollTo} theme={theme} />}

      <AnimatePresence>
        {!isOpened && (
          <motion.div exit={{ y: '-100%' }} transition={{ duration: 1.5, ease: [0.82, 0, 0.18, 1] }} className="fixed inset-0 z-[1000] flex items-center justify-center p-6" style={{ backgroundColor: theme.bg }}>
             <div className="text-center space-y-12 max-w-lg relative z-10">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                   <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">The Wedding of</p>
                   <h1 className="text-6xl md:text-9xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h1>
                </motion.div>
                <div className="w-px h-24 bg-gradient-to-b from-stone-300 to-transparent mx-auto" />
                <button onClick={handleOpen} className="px-16 py-6 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-[#C5A059] transition-all">Buka Undangan</button>
             </div>
             {/* Decorative BG in Dark Mode */}
             {isDark && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-900/50 to-stone-950 pointer-events-none" />}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpened && (
        <div className="space-y-40 lg:space-y-80 pb-40">
           {/* HERO */}
           <section ref={sectionRefs.hero} className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 gap-20">
              <motion.div {...reveal} className="lg:w-1/2 flex justify-center">
                 <div 
                   onClick={() => isEditMode && onEdit('groomImage')}
                   className={`w-72 h-[450px] md:w-96 md:h-[650px] rounded-[150px] border-[20px] shadow-2xl overflow-hidden rotate-2 relative ${isEditMode ? 'cursor-pointer group' : ''}`} 
                   style={{ borderColor: isDark ? '#1C1917' : 'white' }}
                 >
                    <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800'} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    {isDark && <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay" />}
                    {isEditMode && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <span className="material-symbols-outlined text-white text-5xl">photo_camera</span>
                      </div>
                    )}
                 </div>
              </motion.div>
              <motion.div {...reveal} transition={{ delay: 0.3 }} className="lg:w-1/2 text-center lg:text-left space-y-10">
                 <p className="text-xs font-black uppercase tracking-[0.8em] opacity-40">Wedding Invitation</p>
                 <h2 className="text-8xl md:text-[10rem] lg:text-[12rem] leading-none" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h2>
                 <p className="text-xl font-bold tracking-[0.3em] uppercase">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </motion.div>
           </section>

           {/* COUPLE */}
           <section ref={sectionRefs.couple} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <motion.div {...reveal} className="text-center lg:text-right space-y-12">
                 <div className="w-64 h-64 md:w-80 md:h-80 mx-auto lg:ml-auto rounded-[60px] border-8 shadow-2xl overflow-hidden rotate-6" style={{ borderColor: isDark ? '#1C1917' : 'white' }}>
                    <img src={data.groomImage} className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1}</h3>
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.4em]">Putra dari {data.partner1Parents}</p>
                 </div>
              </motion.div>
              <motion.div {...reveal} transition={{ delay: 0.3 }} className="text-center lg:text-left space-y-12">
                 <div className="w-64 h-64 md:w-80 md:h-80 mx-auto lg:mr-auto rounded-[60px] border-8 shadow-2xl overflow-hidden -rotate-6" style={{ borderColor: isDark ? '#1C1917' : 'white' }}>
                    <img src={data.brideImage} className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner2}</h3>
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.4em]">Putri dari {data.partner2Parents}</p>
                 </div>
              </motion.div>
           </section>

           {/* EVENT */}
           <section ref={sectionRefs.event} className="px-6 lg:px-24">
              <div className="rounded-[100px] p-12 md:p-32 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-24 relative overflow-hidden" style={{ backgroundColor: isDark ? '#110F0E' : 'white', border: isDark ? '1px solid #1C1917' : 'none' }}>
                 <motion.div {...reveal} className="space-y-8 text-center relative z-10">
                    <span className="material-symbols-outlined text-6xl opacity-20" style={{ color: theme.primary }}>church</span>
                    <h4 className="text-4xl" style={{ fontFamily: theme.fontScript }}>Akad Nikah</h4>
                    <p className="text-lg font-bold">{data.time} WIB • {data.venue}</p>
                 </motion.div>
                 <motion.div {...reveal} transition={{ delay: 0.2 }} className="space-y-8 text-center lg:border-x border-stone-800 lg:px-10 relative z-10">
                    <span className="material-symbols-outlined text-6xl opacity-20" style={{ color: theme.primary }}>restaurant</span>
                    <h4 className="text-4xl" style={{ fontFamily: theme.fontScript }}>Resepsi</h4>
                    <p className="text-lg font-bold">11:00 WIB • {data.venue}</p>
                 </motion.div>
                 <motion.div {...reveal} transition={{ delay: 0.4 }} className="space-y-8 text-center relative z-10">
                    <span className="material-symbols-outlined text-6xl opacity-20" style={{ color: theme.primary }}>location_on</span>
                    <h4 className="text-4xl" style={{ fontFamily: theme.fontScript }}>Location</h4>
                    <p className="text-sm opacity-60 max-w-xs mx-auto italic">{data.address}</p>
                    <a href={data.mapsLink} target="_blank" className="inline-block px-10 py-4 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover:bg-[#C5A059] transition-all">Open Maps</a>
                 </motion.div>
              </div>
           </section>

           {/* STORY */}
           {data.showStory !== false && (
             <section ref={sectionRefs.story} className="max-w-5xl mx-auto px-6 space-y-32">
                <div className="text-center space-y-6">
                   <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">Our Journey</p>
                   <h2 className="text-7xl md:text-9xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>Love Story</h2>
                </div>
                <div className="space-y-32 relative before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-stone-800">
                   {(data.stories || []).map((s, i) => (
                     <motion.div key={i} {...reveal} className={`flex items-center gap-16 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <div className="w-1/2 p-10 rounded-[50px] shadow-2xl border" style={{ backgroundColor: isDark ? '#110F0E' : 'white', borderColor: isDark ? '#1C1917' : '#F5F5F4' }}>
                           <span className="text-[10px] font-black opacity-30 tracking-widest">{s.year}</span>
                           <h4 className="serif text-2xl font-bold mb-4">{s.title}</h4>
                           <p className="text-sm opacity-60 leading-relaxed italic">"{s.desc}"</p>
                        </div>
                        <div className="w-16 h-16 rounded-full bg-stone-900 border-2 z-10 flex items-center justify-center shrink-0 shadow-2xl" style={{ borderColor: theme.primary }}>
                           <span className="material-symbols-outlined text-[24px]" style={{ color: theme.primary }}>{s.icon || 'auto_awesome'}</span>
                        </div>
                        <div className="w-1/2" />
                     </motion.div>
                   ))}
                </div>
             </section>
           )}

           {/* RSVP */}
           <section ref={sectionRefs.rsvp} className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
              <motion.div {...reveal} className="p-12 lg:p-24 rounded-[80px] shadow-2xl space-y-12 border" style={{ backgroundColor: isDark ? '#110F0E' : 'white', borderColor: isDark ? '#1C1917' : '#F5F5F4' }}>
                 <h2 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>Konfirmasi Kehadiran</h2>
                 <div className="space-y-6">
                    <input className="w-full px-8 py-5 bg-stone-900/50 rounded-3xl outline-none border border-stone-800 text-white placeholder:text-stone-600" placeholder="Nama Anda" />
                    <textarea className="w-full px-8 py-5 bg-stone-900/50 rounded-3xl outline-none border border-stone-800 h-48 text-white placeholder:text-stone-600" placeholder="Tuliskan ucapan doa..." />
                    <button className="w-full py-6 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.5em] text-[11px] shadow-2xl hover:bg-[#C5A059] transition-all">Submit Invitation</button>
                 </div>
              </motion.div>
              <div className="space-y-16 h-[1000px] overflow-y-auto no-scrollbar pt-10 px-4">
                 <h3 className="serif text-4xl font-black mb-12 tracking-tighter">Beautiful Wishes</h3>
                 <div className="space-y-10">
                    {messages.map((m, i) => (
                      <motion.div key={i} className="p-10 rounded-[60px] shadow-xl border relative overflow-hidden" style={{ backgroundColor: isDark ? '#110F0E' : 'white', borderColor: isDark ? '#1C1917' : '#F5F5F4' }}>
                         <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: theme.primary }} />
                         <p className="font-black text-sm uppercase tracking-widest opacity-80 mb-2">{m.name}</p>
                         <p className="text-sm opacity-60 leading-relaxed italic">"{m.message}"</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
           </section>

           <footer className="py-40 text-center space-y-12 border-t" style={{ borderColor: isDark ? '#1C1917' : '#F5F5F4' }}>
              <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">Forever & Always</p>
                 <h2 className="text-8xl md:text-[10rem]" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h2>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-10">LuxeInvite • Industrial Full-Stack Edition</p>
           </footer>
        </div>
      )}
    </div>
  );
};

export default PremiumInvitation;
