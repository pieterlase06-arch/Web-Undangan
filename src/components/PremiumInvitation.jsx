import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import config from '../config';

const API_URL = config.API_URL;

// --- SUB-COMPONENTS ---

const Countdown = ({ targetDate, theme }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
      {[
        { label: 'Days', value: timeLeft.d },
        { label: 'Hours', value: timeLeft.h },
        { label: 'Mins', value: timeLeft.m },
        { label: 'Secs', value: timeLeft.s }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-stone-50 overflow-hidden">
             <span className="text-xl md:text-2xl font-black" style={{ color: theme.primary }}>{item.value}</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest mt-3 opacity-40">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Timeline = ({ theme, stories }) => {
  if (!stories || stories.length === 0) return null;
  return (
    <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-6 md:before:left-1/2 before:w-px before:bg-stone-200">
      {stories.map((s, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
        >
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg border-2 flex items-center justify-center z-10" style={{ borderColor: theme.primary }}>
             <span className="material-symbols-outlined text-[18px]" style={{ color: theme.primary }}>{s.icon || 'favorite'}</span>
          </div>
          <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:text-left md:pr-16' : 'md:text-right md:pl-16'}`}>
             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{s.year}</span>
             <h4 className="serif font-bold text-lg" style={{ color: theme.text }}>{s.title}</h4>
             <p className="text-sm leading-relaxed opacity-60 italic">{s.desc}</p>
          </div>
          <div className="hidden md:block w-1/2" />
        </motion.div>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---

const PremiumInvitation = ({ data, isEditMode = false, forceShowCover = false, onEdit = () => {} }) => {
  const location = useLocation();
  const [isOpened, setIsOpened] = useState(isEditMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [messages, setMessages] = useState([]);
  
  const [formName, setFormName] = useState('');
  const [formAttendance, setFormAttendance] = useState('yes');
  const [formGuests, setFormGuests] = useState(1);
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const kpd = params.get('kpd');
    if (kpd) setFormName(decodeURIComponent(kpd));
    fetchMessages();
  }, [location.search]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/messages`);
      if (res.ok) {
        const d = await res.json();
        setMessages(d);
      }
    } catch (err) { console.error(err); }
  };

  const handleLike = async (id) => {
    try {
      const res = await fetch(`${API_URL}/message/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const updated = await res.json();
        setMessages(prev => prev.map(m => m.id === id ? updated : m));
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (isEditMode) setIsOpened(!forceShowCover);
  }, [forceShowCover, isEditMode]);
  
  const themes = {
    gold: {
      primary: '#C5A059', bg: '#FCF9F6', text: '#1C1917', muted: '#78716C',
      fontSerif: '"Cinzel", serif', fontScript: '"Pinyon Script", cursive'
    },
    emerald: {
      primary: '#064E3B', bg: '#ECFDF5', text: '#064E3B', muted: '#065F46',
      fontSerif: '"Playfair Display", serif', fontScript: '"Dancing Script", cursive'
    },
    linen: {
      primary: '#44403C', bg: '#F5F5F4', text: '#1C1917', muted: '#A8A29E',
      fontSerif: '"Cormorant Garamond", serif', fontScript: '"Great Vibes", cursive'
    }
  };

  const currentTheme = useMemo(() => ({
    ...(themes[data.themeId] || themes.gold),
    primary: data.primaryColor || (themes[data.themeId] || themes.gold).primary,
    fontSerif: data.fontFamily || (themes[data.themeId] || themes.gold).fontSerif,
    fontScript: data.titleFont || (themes[data.themeId] || themes.gold).fontScript,
  }), [data]);
  
  const Editable = ({ children, sectionId }) => {
    if (!isEditMode) return children;
    return (
      <div onClick={() => onEdit(sectionId)} className="relative group cursor-pointer">
        <div className="absolute -inset-2 border-2 border-dashed border-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-[60] pointer-events-none flex items-center justify-center bg-[#C5A059]/5">
           <div className="bg-[#C5A059] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full -top-4 absolute shadow-xl">Edit</div>
        </div>
        {children}
      </div>
    );
  };

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) audioRef.current.play().catch(e => console.log(e));
    }
  }, [data.musicUrl]);

  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.play().catch(e => console.log(e));
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleRSVPSubmit = async () => {
    if (!formName) return alert("Mohon masukkan nama");
    setIsSubmitting(true);
    try {
      await fetch(`${API_URL}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formName, attendance: formAttendance === 'yes', guests: formGuests })
      });
      if (formMessage) {
        await fetch(`${API_URL}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formName, message: formMessage })
        });
        fetchMessages();
      }
      setRsvpStatus('confirmed');
    } catch (err) { alert("Error sending RSVP"); }
    finally { setIsSubmitting(false); }
  };

  const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ backgroundColor: currentTheme.bg, fontFamily: currentTheme.fontSerif, color: currentTheme.text }}>
      <audio ref={audioRef} src={data.musicUrl} loop />

      {/* MUSIC CONTROL */}
      <motion.button onClick={toggleMusic} initial={{ opacity: 0 }} animate={{ opacity: isOpened ? 1 : 0 }} className="fixed bottom-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-2xl z-[100] flex items-center justify-center border border-stone-100">
         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ backgroundColor: currentTheme.primary }}>
            <span className="material-symbols-outlined text-white">{isPlaying ? 'music_note' : 'music_off'}</span>
         </div>
      </motion.button>

      {/* COVER */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 1.5, ease: [0.82, 0, 0.18, 1] }} className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: currentTheme.bg }}>
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 z-10 max-w-lg">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Wedding Invitation</p>
                <h1 className="text-5xl md:text-8xl leading-tight" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h1>
                <div className="py-8 border-y border-stone-200">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Kepada Yth.</p>
                   <h2 className="serif text-2xl font-black mt-2 text-stone-900">{formName || 'Tamu Undangan'}</h2>
                </div>
                <button onClick={handleOpen} className="px-12 py-5 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl">Buka Undangan</button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      {isOpened && (
        <div className="max-w-[1400px] mx-auto px-6 py-20 space-y-32 lg:space-y-56">
          
          {/* HERO */}
          <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 text-center lg:text-left">
             <motion.div {...reveal} className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="w-64 h-96 md:w-80 md:h-[500px] border-[12px] border-white shadow-2xl overflow-hidden rounded-[100px] relative z-10">
                   <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 animate-spin-slow opacity-10">
                   <span className="material-symbols-outlined text-[160px]" style={{ color: currentTheme.primary }}>filter_vintage</span>
                </div>
             </motion.div>
             <motion.div {...reveal} transition={{ delay: 0.3 }} className="w-full lg:w-1/2 space-y-12">
                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Save the Date</p>
                   <h2 className="text-7xl md:text-9xl leading-none" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6 justify-center lg:justify-start">
                   <p className="text-lg font-black uppercase tracking-[0.3em]">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                   <div className="hidden md:block w-12 h-px bg-stone-300" />
                   <Countdown targetDate={data.date} theme={currentTheme} />
                </div>
             </motion.div>
          </section>

          {/* QUOTE */}
          <section className="text-center max-w-2xl mx-auto space-y-8 py-20 relative">
             <span className="material-symbols-outlined text-6xl opacity-10" style={{ color: currentTheme.primary }}>format_quote</span>
             <motion.p {...reveal} className="text-lg italic leading-relaxed opacity-70">
                "{data.quote || 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...'}"
             </motion.p>
          </section>

          {/* MEMPELAI */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center">
             <Editable sectionId="content">
                <motion.div {...reveal} className="flex flex-col md:flex-row lg:flex-col items-center gap-10 text-center lg:text-right">
                   <div className="space-y-4">
                      <h3 className="text-5xl md:text-6xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1}</h3>
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Putra dari {data.partner1Parents || 'Bpk. Ahmad & Ibu Siti'}</p>
                   </div>
                   <div className="w-56 h-56 rounded-[60px] border-8 border-white shadow-2xl overflow-hidden rotate-3">
                      <img src={data.groomImage} className="w-full h-full object-cover" />
                   </div>
                </motion.div>
             </Editable>
             <Editable sectionId="content">
                <motion.div {...reveal} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row lg:flex-col items-center gap-10 text-center lg:text-left">
                   <div className="w-56 h-56 rounded-[60px] border-8 border-white shadow-2xl overflow-hidden -rotate-3">
                      <img src={data.brideImage} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-5xl md:text-6xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner2}</h3>
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Putri dari {data.partner2Parents || 'Bpk. Yusuf & Ibu Aminah'}</p>
                   </div>
                </motion.div>
             </Editable>
          </section>

          {/* LOVE STORY */}
          {data.showStory !== false && (
            <section className="max-w-6xl mx-auto space-y-24">
               <div className="text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Our Journey</span>
                  <h3 className="text-5xl md:text-7xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>Love Story</h3>
               </div>
               <Timeline theme={currentTheme} stories={data.stories} />
            </section>
          )}

          {/* ACARA */}
          <section className="bg-white/50 backdrop-blur-xl rounded-[60px] p-10 md:p-32 shadow-2xl border border-white/50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
             <motion.div {...reveal} className="space-y-4 text-center lg:text-left">
                <h4 className="text-4xl" style={{ fontFamily: currentTheme.fontScript }}>Akad Nikah</h4>
                <p className="font-bold">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p className="opacity-60">Pukul {data.time} WIB</p>
                <p className="text-[10px] font-black uppercase tracking-widest">{data.venue}</p>
             </motion.div>
             <motion.div {...reveal} transition={{ delay: 0.2 }} className="space-y-4 text-center lg:text-left">
                <h4 className="text-4xl" style={{ fontFamily: currentTheme.fontScript }}>Resepsi</h4>
                <p className="font-bold">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p className="opacity-60">Pukul 11:00 WIB</p>
                <p className="text-[10px] font-black uppercase tracking-widest">{data.venue}</p>
             </motion.div>
             <motion.div {...reveal} transition={{ delay: 0.4 }} className="space-y-4 text-center lg:text-left">
                <h4 className="text-4xl" style={{ fontFamily: currentTheme.fontScript }}>Location</h4>
                <p className="text-sm opacity-60 italic">{data.address}</p>
                <a href={data.mapsLink} target="_blank" className="inline-block px-8 py-4 bg-stone-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-stone-800 transition-all">Open Maps</a>
             </motion.div>
          </section>

          {/* GALLERY */}
          {data.showGallery !== false && (
            <section className="space-y-16">
               <div className="text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Sweet Memories</span>
                  <h3 className="text-5xl md:text-7xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>Captured Moments</h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {(data.gallery || [1,2,3,4,5,6]).map((img, i) => (
                    <motion.div key={i} whileHover={{ scale: 0.98 }} className="rounded-3xl overflow-hidden shadow-xl aspect-square">
                       <img src={typeof img === 'string' ? img : `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80&sig=${i}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
               </div>
            </section>
          )}

          {/* RSVP & WISHES */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
             <motion.div {...reveal} className="bg-white p-10 lg:p-20 rounded-[60px] shadow-2xl space-y-8">
                <h3 className="text-5xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>RSVP</h3>
                <div className="space-y-6">
                   <input className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nama Anda" />
                   <textarea className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm h-32" value={formMessage} onChange={(e) => setFormMessage(e.target.value)} placeholder="Ucapan Doa..." />
                   <button onClick={handleRSVPSubmit} disabled={isSubmitting} className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-stone-800 transition-all">Kirim</button>
                </div>
             </motion.div>

             <div className="space-y-8 max-h-[800px] overflow-y-auto no-scrollbar pr-4">
                <div className="space-y-6">
                   {messages.map((m) => (
                     <motion.div key={m.id} className="bg-white p-8 rounded-[40px] shadow-lg border border-stone-100 space-y-4 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: currentTheme.primary }} />
                        <p className="font-black text-stone-900 text-sm">{m.name}</p>
                        <p className="text-sm opacity-70 italic">"{m.message}"</p>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          <footer className="text-center py-20 space-y-8 border-t border-stone-200">
             <h3 className="text-5xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h3>
             <p className="text-[9px] font-bold uppercase tracking-widest opacity-20">LuxeInvite - Professional Platform</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default PremiumInvitation;
