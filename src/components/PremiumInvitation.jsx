import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import config from '../config';

const API_URL = config.API_URL;

// --- LUXURY SUB-COMPONENTS ---

const SectionTitle = ({ title, subtitle, theme }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center space-y-4 mb-20"
  >
    <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30" style={{ color: theme.primary }}>{subtitle}</span>
    <h2 className="text-6xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{title}</h2>
    <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent mx-auto" />
  </motion.div>
);

const Countdown = ({ targetDate, theme }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = new Date(targetDate).getTime() - new Date().getTime();
      if (distance < 0) return clearInterval(timer);
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
    <div className="flex justify-center gap-4 md:gap-8">
      {[
        { label: 'Days', value: timeLeft.d },
        { label: 'Hours', value: timeLeft.h },
        { label: 'Mins', value: timeLeft.m },
        { label: 'Secs', value: timeLeft.s }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <motion.div 
            whileHover={{ y: -5 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
             <span className="text-2xl md:text-3xl font-black relative z-10" style={{ color: theme.primary }}>{item.value}</span>
          </motion.div>
          <p className="text-[8px] font-black uppercase tracking-widest mt-4 opacity-40">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

const Timeline = ({ theme, stories }) => {
  if (!stories || stories.length === 0) return null;
  return (
    <div className="relative max-w-5xl mx-auto py-20 px-4">
      {/* Center Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-stone-200 to-transparent" />
      
      <div className="space-y-32">
        {stories.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative flex items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
             {/* Dot */}
             <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-2 rounded-full shadow-xl flex items-center justify-center z-20" style={{ borderColor: theme.primary }}>
                <span className="material-symbols-outlined text-[20px]" style={{ color: theme.primary }}>{s.icon || 'auto_awesome'}</span>
             </div>
             
             {/* Card */}
             <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${i % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-[50px] shadow-2xl border border-white/50 hover:shadow-[-20px_20px_60px_rgba(0,0,0,0.1)] transition-all duration-500">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">{s.year}</span>
                   <h4 className="serif text-2xl font-black mb-4" style={{ color: theme.text }}>{s.title}</h4>
                   <p className="text-sm leading-relaxed opacity-60 italic">"{s.desc}"</p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN MASTERPIECE ---

const PremiumInvitation = ({ data, isEditMode = false, forceShowCover = false, onEdit = () => {} }) => {
  const [isOpened, setIsOpened] = useState(isEditMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [rsvpStatus, setRsvpStatus] = useState(null);
  
  const audioRef = useRef(null);
  const location = useLocation();

  const themes = {
    gold: { primary: '#C5A059', bg: '#FCF9F6', text: '#1C1917', fontSerif: '"Cinzel", serif', fontScript: '"Pinyon Script", cursive', pattern: 'https://www.transparenttextures.com/patterns/natural-paper.png' },
    emerald: { primary: '#064E3B', bg: '#ECFDF5', text: '#064E3B', fontSerif: '"Playfair Display", serif', fontScript: '"Dancing Script", cursive', pattern: 'https://www.transparenttextures.com/patterns/xv.png' },
    linen: { primary: '#44403C', bg: '#F5F5F4', text: '#1C1917', fontSerif: '"Cormorant Garamond", serif', fontScript: '"Great Vibes", cursive', pattern: 'https://www.transparenttextures.com/patterns/linen.png' }
  };

  const theme = useMemo(() => ({
    ...(themes[data.themeId] || themes.gold),
    primary: data.primaryColor || (themes[data.themeId] || themes.gold).primary,
    fontSerif: data.fontFamily || (themes[data.themeId] || themes.gold).fontSerif,
    fontScript: data.titleFont || (themes[data.themeId] || themes.gold).fontScript,
  }), [data]);

  useEffect(() => {
    fetchMessages();
    const params = new URLSearchParams(location.search);
    const kpd = params.get('kpd');
    if (kpd) setForm(f => ({ ...f, name: decodeURIComponent(kpd) }));
  }, [location.search]);

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

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleRSVP = async () => {
    if (!form.name) return alert("Please enter your name");
    try {
      await fetch(`${API_URL}/rsvp`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, attendance: true }) });
      if (form.message) await fetch(`${API_URL}/message`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      setRsvpStatus('done');
      fetchMessages();
    } catch (err) { console.log(err); }
  };

  const reveal = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-100px" }, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } };

  return (
    <div className="min-h-screen relative selection:bg-[#C5A059]/20" style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: theme.fontSerif }}>
      <audio ref={audioRef} src={data.musicUrl} loop />
      
      {/* TEXTURE OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url(${theme.pattern})` }} />

      {/* MUSIC CONTROL */}
      <AnimatePresence>
        {isOpened && (
          <motion.button 
            initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            onClick={toggleMusic}
            className="fixed bottom-10 right-10 w-16 h-16 bg-white/80 backdrop-blur-2xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[100] flex items-center justify-center border border-white group"
          >
             <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ backgroundColor: theme.primary }}>
                <span className="material-symbols-outlined text-white text-2xl">{isPlaying ? 'music_note' : 'music_off'}</span>
             </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 1. ENVELOPE / COVER */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.82, 0, 0.18, 1] }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 overflow-hidden"
            style={{ backgroundColor: theme.bg }}
          >
             {/* Dynamic Floral BG */}
             <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[800px] animate-spin-slow" style={{ color: theme.primary }}>filter_vintage</span>
             </div>

             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }} className="relative z-10 text-center space-y-12 max-w-2xl bg-white/40 backdrop-blur-3xl p-16 md:p-24 rounded-[100px] shadow-2xl border border-white">
                <div className="space-y-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">The Wedding of</p>
                   <h1 className="text-6xl md:text-9xl leading-none" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h1>
                </div>
                <div className="w-24 h-px bg-stone-300 mx-auto" />
                <div className="space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Exclusive Invitation For</p>
                   <h2 className="serif text-3xl font-black">{form.name || 'Our Beloved Guest'}</h2>
                </div>
                <button onClick={handleOpen} className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-500 shadow-2xl">
                   <div className="absolute inset-0 bg-stone-900 group-hover:bg-[#C5A059] transition-colors" />
                   <span className="relative z-10 text-white font-black uppercase tracking-[0.4em] text-[10px]">Open Invitation</span>
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN CONTENT SECTIONS */}
      {isOpened && (
        <div className="relative">
          
          {/* A. HERO SECTION - ADAPTIVE DESKTOP */}
          <section className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 px-6 lg:px-24">
             <motion.div {...reveal} className="relative w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative">
                   <div className="w-72 h-[450px] md:w-96 md:h-[600px] border-[16px] border-white shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden rounded-[150px] relative z-10 rotate-3">
                      <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800'} className="w-full h-full object-cover" />
                   </div>
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 animate-pulse opacity-20">
                      <span className="material-symbols-outlined text-[160px]" style={{ color: theme.primary }}>favorite</span>
                   </div>
                </div>
             </motion.div>
             <motion.div {...reveal} transition={{ delay: 0.3 }} className="w-full lg:w-1/2 text-center lg:text-left space-y-12">
                <div className="space-y-6">
                   <p className="text-xs font-black uppercase tracking-[0.6em] opacity-40">Saving the Date for</p>
                   <h2 className="text-8xl md:text-9xl lg:text-[11rem] leading-[0.8]" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8 justify-center lg:justify-start">
                   <div className="text-lg font-black uppercase tracking-[0.3em] pb-4 lg:pb-0 lg:border-r lg:pr-12 border-stone-200">
                      {new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                   </div>
                   <Countdown targetDate={data.date} theme={theme} />
                </div>
             </motion.div>
          </section>

          {/* B. QUOTE SECTION */}
          <section className="py-32 px-6 text-center max-w-4xl mx-auto">
             <motion.div {...reveal} className="bg-white/40 backdrop-blur-2xl p-12 md:p-24 rounded-[100px] shadow-inner border border-white relative">
                <span className="material-symbols-outlined text-7xl opacity-5 absolute top-10 left-10" style={{ color: theme.primary }}>format_quote</span>
                <p className="text-xl md:text-2xl leading-relaxed opacity-70 serif italic font-medium">
                   "{data.quote || 'True love is not just a feeling, it is a promise made for eternity...'}"
                </p>
             </motion.div>
          </section>

          {/* C. MEMPELAI - SIDE BY SIDE ON DESKTOP */}
          <section className="py-32 px-6 max-w-7xl mx-auto space-y-32">
             <SectionTitle title="Mempelai" subtitle="Meet the Couple" theme={theme} />
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 items-center">
                <motion.div {...reveal} className="flex flex-col md:flex-row lg:flex-col items-center gap-12 text-center lg:text-right">
                   <div className="space-y-6 order-2 md:order-1 lg:order-2">
                      <h3 className="text-6xl md:text-7xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1}</h3>
                      <div className="space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Putra Dari</p>
                         <p className="text-sm font-bold opacity-70">{data.partner1Parents || 'Bpk. Ahmad & Ibu Siti'}</p>
                      </div>
                   </div>
                   <div className="w-64 h-64 md:w-80 md:h-80 rounded-[80px] border-[12px] border-white shadow-2xl overflow-hidden rotate-6 order-1 md:order-2 lg:order-1">
                      <img src={data.groomImage} className="w-full h-full object-cover" />
                   </div>
                </motion.div>
                
                <motion.div {...reveal} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row lg:flex-col items-center gap-12 text-center lg:text-left">
                   <div className="w-64 h-64 md:w-80 md:h-80 rounded-[80px] border-[12px] border-white shadow-2xl overflow-hidden -rotate-6">
                      <img src={data.brideImage} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-6">
                      <h3 className="text-6xl md:text-7xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner2}</h3>
                      <div className="space-y-2">
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Putri Dari</p>
                         <p className="text-sm font-bold opacity-70">{data.partner2Parents || 'Bpk. Yusuf & Ibu Aminah'}</p>
                      </div>
                   </div>
                </motion.div>
             </div>
          </section>

          {/* D. LOVE STORY - ZIGZAG MASTERPIECE */}
          {data.showStory !== false && (
            <section className="py-32 px-6">
               <SectionTitle title="Love Story" subtitle="Our Journey" theme={theme} />
               <Timeline theme={theme} stories={data.stories} />
            </section>
          )}

          {/* E. EVENT DETAILS - 3 COLUMN ON DESKTOP */}
          <section className="py-32 px-6 lg:px-24">
             <div className="bg-stone-900 rounded-[80px] lg:rounded-[150px] p-12 md:p-24 lg:p-32 text-white shadow-[0_50px_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${theme.pattern})` }} />
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 items-start">
                   <div className="space-y-8 text-center lg:text-left">
                      <span className="material-symbols-outlined text-6xl opacity-30">church</span>
                      <div className="space-y-4">
                         <h4 className="text-4xl" style={{ fontFamily: theme.fontScript }}>Akad Nikah</h4>
                         <p className="text-lg font-black uppercase tracking-widest">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                         <p className="opacity-40">Pukul {data.time} WIB - Selesai</p>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] pt-4">{data.venue}</p>
                      </div>
                   </div>
                   <div className="space-y-8 text-center lg:text-left lg:border-x border-white/10 lg:px-20">
                      <span className="material-symbols-outlined text-6xl opacity-30">restaurant</span>
                      <div className="space-y-4">
                         <h4 className="text-4xl" style={{ fontFamily: theme.fontScript }}>Resepsi</h4>
                         <p className="text-lg font-black uppercase tracking-widest">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                         <p className="opacity-40">Pukul 11:00 WIB - Selesai</p>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] pt-4">{data.venue}</p>
                      </div>
                   </div>
                   <div className="space-y-8 text-center lg:text-left">
                      <span className="material-symbols-outlined text-6xl opacity-30">location_on</span>
                      <div className="space-y-6">
                         <h4 className="text-4xl" style={{ fontFamily: theme.fontScript }}>Location</h4>
                         <p className="text-sm opacity-50 italic leading-relaxed">{data.address}</p>
                         <a href={data.mapsLink} target="_blank" className="inline-block px-10 py-4 bg-white text-stone-900 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:scale-105 transition-all">Open Google Maps</a>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* F. DIGITAL GIFT - RESTORED */}
          {data.showGift !== false && (
            <section className="py-32 px-6 text-center max-w-4xl mx-auto space-y-16">
               <SectionTitle title="Digital Gift" subtitle="Sending Love" theme={theme} />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(data.bankAccounts || [{ bank: 'BCA', number: '123456789', owner: data.partner1 }]).map((b, i) => (
                    <motion.div key={i} whileHover={{ y: -10 }} className="bg-white/60 backdrop-blur-xl p-10 rounded-[50px] shadow-2xl border border-white space-y-6">
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">{b.bank}</span>
                       <p className="text-2xl font-black tracking-widest text-stone-900">{b.number}</p>
                       <p className="text-[10px] font-bold uppercase opacity-60">a.n {b.owner}</p>
                       <button onClick={() => { navigator.clipboard.writeText(b.number); alert("Number Copied!"); }} className="w-full py-3 bg-stone-100 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-stone-200 transition-colors">Copy Account Number</button>
                    </motion.div>
                  ))}
               </div>
            </section>
          )}

          {/* G. RSVP & WISHES - MASTERPIECE SIDE-BY-SIDE */}
          <section className="py-32 px-6 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-32 items-start max-w-7xl mx-auto">
             <motion.div {...reveal} className="bg-white p-12 md:p-20 rounded-[80px] shadow-2xl border border-stone-100 space-y-12">
                <SectionTitle title="RSVP" subtitle="Confirmation" theme={theme} />
                {rsvpStatus === 'done' ? (
                  <div className="py-20 text-center space-y-6">
                     <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                        <span className="material-symbols-outlined text-4xl">done_all</span>
                     </div>
                     <p className="font-black text-stone-900 uppercase tracking-widest text-xs">Terima Kasih Atas Konfirmasinya!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                     <input className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-3xl outline-none focus:border-stone-900 transition-all text-sm font-medium" placeholder="Nama Anda" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                     <textarea className="w-full px-8 py-5 bg-stone-50 border border-stone-100 rounded-3xl outline-none focus:border-stone-900 transition-all text-sm h-40 font-medium" placeholder="Tuliskan ucapan & doa restu..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                     <button onClick={handleRSVP} className="w-full py-6 bg-stone-900 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all">Submit Confirmation</button>
                  </div>
                )}
             </motion.div>

             <div className="space-y-12 max-h-[1000px] overflow-y-auto no-scrollbar pr-4">
                <div className="sticky top-0 bg-[#fcf9f6]/90 backdrop-blur-md py-6 z-10 border-b border-stone-200">
                   <h3 className="serif text-3xl font-black">Wishes & Prayers</h3>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-30 pt-1">{messages.length} Beautiful Messages</p>
                </div>
                <div className="space-y-8">
                   {messages.map((m, i) => (
                     <motion.div key={i} className="bg-white/60 backdrop-blur-md p-10 rounded-[50px] shadow-lg border border-white space-y-4 group">
                        <div className="flex justify-between items-center">
                           <p className="font-black text-stone-900 text-sm tracking-tight">{m.name}</p>
                           <span className="text-[9px] opacity-20 font-black">{new Date(m.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm opacity-70 leading-relaxed italic">"{m.message}"</p>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* H. FOOTER */}
          <footer className="py-32 text-center space-y-12 border-t border-stone-200">
             <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-40">Our Wedding</p>
                <h3 className="text-7xl md:text-8xl" style={{ fontFamily: theme.fontScript, color: theme.primary }}>{data.partner1} & {data.partner2}</h3>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-10">LuxeInvite • Crafted with Perfection</p>
          </footer>

        </div>
      )}
    </div>
  );
};

export default PremiumInvitation;
