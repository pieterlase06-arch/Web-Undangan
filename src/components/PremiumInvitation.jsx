import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import config from '../config';

const API_URL = config.API_URL;

// --- SUB-COMPONENTS FOR PERFECTION ---

const Countdown = ({ targetDate, theme }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }

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
          <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-stone-50 overflow-hidden relative group">
             <div className="absolute inset-0 bg-stone-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <span className="relative z-10 text-2xl font-black" style={{ color: theme.primary }}>{item.value}</span>
          </div>
          <span className="text-[8px] font-black uppercase tracking-widest mt-3 opacity-40">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Timeline = ({ theme }) => {
  const stories = [
    { year: '2021', title: 'Pertemuan Pertama', desc: 'Awal segalanya dimulai dari sebuah sapaan hangat di sebuah kafe kecil.', icon: 'favorite' },
    { year: '2022', title: 'Menyatakan Rasa', desc: 'Tepat setahun setelahnya, kami memutuskan untuk melangkah bersama.', icon: 'auto_awesome' },
    { year: '2024', title: 'Komitmen Suci', desc: 'Kini kami siap mengikrarkan janji setia di hadapan Sang Pencipta.', icon: 'ring_volume' }
  ];

  return (
    <div className="space-y-12 relative before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-stone-200">
      {stories.map((s, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative pl-16 group"
        >
          <div className="absolute left-0 w-12 h-12 rounded-full bg-white shadow-lg border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-110" style={{ borderColor: theme.primary }}>
             <span className="material-symbols-outlined text-[18px]" style={{ color: theme.primary }}>{s.icon}</span>
          </div>
          <div className="space-y-1">
             <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{s.year}</span>
             <h4 className="serif font-bold text-lg" style={{ color: theme.text }}>{s.title}</h4>
             <p className="text-sm leading-relaxed opacity-60 italic">{s.desc}</p>
          </div>
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
  
  // Form States
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
      fontSerif: '"Cinzel", serif', fontScript: '"Pinyon Script", cursive',
      pattern: 'https://www.transparenttextures.com/patterns/natural-paper.png'
    },
    emerald: {
      primary: '#064E3B', bg: '#ECFDF5', text: '#064E3B', muted: '#065F46',
      fontSerif: '"Playfair Display", serif', fontScript: '"Dancing Script", cursive',
      pattern: 'https://www.transparenttextures.com/patterns/xv.png'
    },
    linen: {
      primary: '#44403C', bg: '#F5F5F4', text: '#1C1917', muted: '#A8A29E',
      fontSerif: '"Cormorant Garamond", serif', fontScript: '"Great Vibes", cursive',
      pattern: 'https://www.transparenttextures.com/patterns/linen.png'
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
        <div className="absolute -inset-2 border-2 border-dashed border-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-[60] pointer-events-none flex items-center justify-center bg-[#C5A059]/5 backdrop-blur-[2px]">
           <div className="bg-[#C5A059] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full -top-4 absolute shadow-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">edit</span> Edit
           </div>
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
    <div 
      className="min-h-screen relative overflow-x-hidden" 
      style={{ 
        backgroundColor: currentTheme.bg, 
        fontFamily: currentTheme.fontSerif,
        color: currentTheme.text
      }}
    >
      <audio ref={audioRef} src={data.musicUrl} loop />

      {/* FLOATING MUSIC CONTROL */}
      <motion.button 
        onClick={toggleMusic}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpened ? 1 : 0 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-2xl z-[100] flex items-center justify-center border border-stone-100 group"
      >
         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ backgroundColor: currentTheme.primary }}>
            <span className="material-symbols-outlined text-white">{isPlaying ? 'music_note' : 'music_off'}</span>
         </div>
      </motion.button>

      {/* COVER (AMPLOP) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.5, ease: [0.82, 0, 0.18, 1] }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 text-center"
            style={{ backgroundColor: currentTheme.bg }}
          >
             {/* Decorative Corner Flowers */}
             <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover rounded-bl-full" />
             </div>
             <div className="absolute bottom-0 left-0 w-64 h-64 opacity-20 pointer-events-none rotate-180">
                <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover rounded-bl-full" />
             </div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="space-y-8 z-10"
             >
                <div className="space-y-2">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Wedding Invitation</p>
                   <h1 className="text-6xl lg:text-8xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h1>
                </div>
                
                <div className="py-8 border-y border-stone-200">
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Kepada Bapak/Ibu/Saudara/i</p>
                   <h2 className="serif text-2xl font-black mt-2 text-stone-900">{formName || 'Tamu Undangan'}</h2>
                </div>

                <button 
                  onClick={handleOpen}
                  className="px-12 py-5 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-110 active:scale-95 transition-all group overflow-hidden relative"
                >
                   <div className="absolute inset-0 bg-[#C5A059] -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                   <span className="relative z-10 flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px]">drafts</span>
                      Buka Undangan
                   </span>
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT SECTIONS */}
      {isOpened && (
        <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-32">
          
          {/* 1. HERO SECTION */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center space-y-12">
             <motion.div {...reveal} className="relative">
                <div className="w-64 h-96 lg:w-80 lg:h-[500px] border-[12px] border-white shadow-2xl overflow-hidden rounded-[100px] relative z-10">
                   <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                </div>
                {/* Decorative Floral */}
                <div className="absolute -top-10 -right-10 w-40 h-40 animate-spin-slow opacity-20">
                   <span className="material-symbols-outlined text-[160px]" style={{ color: currentTheme.primary }}>filter_vintage</span>
                </div>
             </motion.div>
             <motion.div {...reveal} transition={{ delay: 0.3 }} className="space-y-4">
                <h2 className="text-7xl lg:text-9xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h2>
                <div className="flex items-center gap-6 justify-center">
                   <div className="w-12 h-px bg-stone-200" />
                   <p className="text-sm font-black uppercase tracking-[0.3em]">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                   <div className="w-12 h-px bg-stone-200" />
                </div>
             </motion.div>
             
             {/* COUNTDOWN */}
             <motion.div {...reveal} transition={{ delay: 0.5 }}>
                <Countdown targetDate={data.date} theme={currentTheme} />
             </motion.div>
          </section>

          {/* 2. QUOTE SECTION */}
          <section className="text-center max-w-2xl mx-auto space-y-8 py-20 relative">
             <span className="material-symbols-outlined text-6xl opacity-10" style={{ color: currentTheme.primary }}>format_quote</span>
             <motion.p {...reveal} className="text-lg italic leading-relaxed font-serif opacity-70">
                "{data.quote || 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.'}"
             </motion.p>
             <div className="w-16 h-px bg-stone-200 mx-auto" />
          </section>

          {/* 3. MEMPELAI SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-20 items-center">
             <Editable sectionId="content">
                <motion.div {...reveal} className="space-y-12 text-center lg:text-right">
                   <div className="space-y-4">
                      <h3 className="text-5xl lg:text-6xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1}</h3>
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Putra dari Bpk. Ahmad & Ibu Siti</p>
                   </div>
                   <div className="w-48 h-48 rounded-full border-8 border-white shadow-xl mx-auto lg:ml-auto lg:mr-0 overflow-hidden">
                      <img src={data.groomImage} className="w-full h-full object-cover" />
                   </div>
                </motion.div>
             </Editable>
             
             <Editable sectionId="content">
                <motion.div {...reveal} transition={{ delay: 0.2 }} className="space-y-12 text-center lg:text-left order-first lg:order-none">
                   <div className="w-48 h-48 rounded-full border-8 border-white shadow-xl mx-auto lg:mr-auto lg:ml-0 overflow-hidden">
                      <img src={data.brideImage} className="w-full h-full object-cover" />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-5xl lg:text-6xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner2}</h3>
                      <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Putri dari Bpk. Yusuf & Ibu Aminah</p>
                   </div>
                </motion.div>
             </Editable>
          </section>

          {/* 4. LOVE STORY SECTION */}
          {data.showStory !== false && (
            <section className="max-w-3xl mx-auto space-y-16">
               <div className="text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">How We Met</span>
                  <h3 className="text-5xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>Love Story</h3>
               </div>
               <Timeline theme={currentTheme} />
            </section>
          )}

          {/* 5. ACARA SECTION */}
          <section className="bg-white/50 backdrop-blur-md rounded-[60px] p-12 lg:p-24 shadow-2xl border border-white/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50/50 -translate-y-1/2 translate-x-1/2 rounded-full" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <motion.div {...reveal} className="space-y-8 text-center md:text-left">
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-lg" style={{ backgroundColor: currentTheme.primary }}>
                      <span className="material-symbols-outlined text-white">church</span>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-4xl" style={{ fontFamily: currentTheme.fontScript }}>Akad Nikah</h4>
                      <div className="space-y-2">
                         <p className="text-lg font-bold">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                         <p className="opacity-60 text-sm">Pukul {data.time} WIB - Selesai</p>
                      </div>
                      <p className="text-sm font-bold uppercase tracking-widest">{data.venue}</p>
                   </div>
                </motion.div>

                <motion.div {...reveal} transition={{ delay: 0.2 }} className="space-y-8 text-center md:text-left">
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-lg" style={{ backgroundColor: currentTheme.primary }}>
                      <span className="material-symbols-outlined text-white">restaurant</span>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-4xl" style={{ fontFamily: currentTheme.fontScript }}>Resepsi Pernikahan</h4>
                      <div className="space-y-2">
                         <p className="text-lg font-bold">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                         <p className="opacity-60 text-sm">Pukul 11:00 WIB - Selesai</p>
                      </div>
                      <p className="text-sm font-bold uppercase tracking-widest">{data.venue}</p>
                   </div>
                </motion.div>
             </div>
             
             {data.mapsLink && (
               <motion.div {...reveal} className="mt-16 text-center">
                  <a 
                    href={data.mapsLink} 
                    target="_blank" 
                    className="inline-flex items-center gap-3 px-10 py-4 bg-stone-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-stone-800 transition-all"
                  >
                     <span className="material-symbols-outlined text-[18px]">location_on</span>
                     Buka Google Maps
                  </a>
               </motion.div>
             )}
          </section>

          {/* 6. GALLERY SECTION */}
          {data.showGallery !== false && (
            <section className="space-y-12">
               <div className="text-center space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Sweet Memories</span>
                  <h3 className="text-5xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>Captured Moments</h3>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                  {[1,2,3,4,5,6].map((i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 0.98 }}
                      className={`rounded-3xl overflow-hidden shadow-xl border-4 border-white ${i % 3 === 0 ? 'md:row-span-2' : ''}`}
                    >
                       <img src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80&sig=${i}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
               </div>
            </section>
          )}

          {/* 7. GIFT SECTION */}
          {data.showGift !== false && (
            <section className="max-w-3xl mx-auto space-y-12 text-center bg-white/30 p-12 lg:p-20 rounded-[60px] border border-white shadow-xl">
               <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Digital Envelope</span>
                  <h3 className="text-5xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>Kado Digital</h3>
                  <p className="text-sm opacity-60 max-w-sm mx-auto mt-4 leading-relaxed italic">Doa restu Anda adalah karunia yang sangat berharga bagi kami. Namun apabila Anda ingin memberikan tanda kasih, dapat melalui:</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  {[
                    { bank: data.bankName1 || 'BCA', acc: data.bankAccount1 || '1234567890', owner: data.bankOwner1 || 'Mempelai' },
                    { bank: 'Mandiri', acc: '0987654321', owner: 'Mempelai' }
                  ].map((bank, i) => (
                    <motion.div key={i} {...reveal} className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 space-y-4">
                       <p className="font-black uppercase tracking-widest text-[10px] opacity-40">{bank.bank}</p>
                       <p className="text-xl font-black serif tracking-widest">{bank.acc}</p>
                       <p className="text-[10px] font-bold opacity-60">a.n {bank.owner}</p>
                       <button 
                         onClick={() => { navigator.clipboard.writeText(bank.acc); alert("Nomor rekening berhasil disalin!"); }}
                         className="flex items-center gap-2 mx-auto text-[10px] font-black uppercase tracking-widest hover:text-[#C5A059] transition-colors"
                       >
                          <span className="material-symbols-outlined text-[16px]">content_copy</span> Salin No. Rekening
                       </button>
                    </motion.div>
                  ))}
               </div>
            </section>
          )}

          {/* 8. RSVP & WISHES SECTION */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
             {/* RSVP FORM */}
             <motion.div {...reveal} className="bg-white p-10 lg:p-16 rounded-[50px] shadow-2xl space-y-8">
                <div className="space-y-2">
                   <h3 className="text-4xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>RSVP</h3>
                   <p className="text-xs uppercase tracking-widest font-bold opacity-40">Konfirmasi Kehadiran</p>
                </div>
                
                {rsvpStatus === 'confirmed' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center space-y-4">
                     <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
                     <p className="font-bold">Terima kasih! Konfirmasi Anda telah kami terima.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-4">Nama Lengkap</label>
                        <input className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Masukkan Nama Anda" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-4">Kehadiran</label>
                        <select className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm appearance-none" value={formAttendance} onChange={(e) => setFormAttendance(e.target.value)}>
                           <option value="yes">Hadir</option>
                           <option value="no">Tidak Hadir</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-4">Jumlah Tamu</label>
                        <input type="number" min="1" max="10" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm" value={formGuests} onChange={(e) => setFormGuests(e.target.value)} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-4">Ucapan Doa</label>
                        <textarea className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm h-32" value={formMessage} onChange={(e) => setFormMessage(e.target.value)} placeholder="Berikan ucapan manis Anda..." />
                     </div>
                     <button 
                       onClick={handleRSVPSubmit}
                       disabled={isSubmitting}
                       className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-stone-800 disabled:opacity-50 transition-all"
                     >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
                     </button>
                  </div>
                )}
             </motion.div>

             {/* GUEST WISHES FEED */}
             <div className="space-y-8 max-h-[800px] overflow-y-auto no-scrollbar pr-4">
                <div className="sticky top-0 bg-stone-50/80 backdrop-blur-md py-4 z-10 border-b border-stone-200">
                   <h3 className="text-xl font-bold serif">Wishes for the Couple</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{messages.length} Ucapan Masuk</p>
                </div>
                <div className="space-y-6">
                   {messages.map((m, i) => (
                     <motion.div 
                       key={m.id}
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="bg-white p-8 rounded-[40px] shadow-lg border border-stone-100 space-y-4 group relative overflow-hidden"
                     >
                        <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: currentTheme.primary }} />
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="font-black text-stone-900 text-sm">{m.name}</p>
                              <p className="text-[8px] font-bold opacity-30 uppercase tracking-widest">{new Date(m.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                           </div>
                           <button 
                             onClick={() => handleLike(m.id)}
                             className="flex items-center gap-2 px-3 py-1 bg-stone-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all group/btn"
                           >
                              <span className={`material-symbols-outlined text-[14px] ${m.likes > 0 ? 'fill-red-500 text-red-500' : ''}`}>favorite</span>
                              <span className="text-[10px] font-black">{m.likes || 0}</span>
                           </button>
                        </div>
                        <p className="text-sm opacity-70 italic leading-relaxed">"{m.message}"</p>
                     </motion.div>
                   ))}
                </div>
             </div>
          </section>

          {/* FOOTER */}
          <footer className="text-center py-20 space-y-8 border-t border-stone-200">
             <h3 className="text-5xl" style={{ fontFamily: currentTheme.fontScript, color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h3>
             <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Sampai Jumpa di Hari Bahagia Kami</p>
             <div className="pt-20">
                <p className="text-[9px] font-bold uppercase tracking-widest opacity-20">Created with Love by LuxeInvite</p>
             </div>
          </footer>

        </div>
      )}
    </div>
  );
};

export default PremiumInvitation;
