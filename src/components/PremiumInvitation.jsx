import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import config from '../config';

const API_URL = config.API_URL;


const PremiumInvitation = ({ data, isEditMode = false, forceShowCover = false, onEdit = () => {} }) => {
  const location = useLocation();
  const [isOpened, setIsOpened] = useState(isEditMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState([]);
  
  // Form States
  const [formName, setFormName] = useState('');
  const [formAttendance, setFormAttendance] = useState('yes');
  const [formGuests, setFormGuests] = useState(1);
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize guest name directly from URL
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
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await fetch(`${API_URL}/message/${id}/like`, { method: 'POST' });
      if (res.ok) {
        const updated = await res.json();
        setMessages(prev => prev.map(m => m.id === id ? updated : m));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Sync isOpened with forceShowCover in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsOpened(!forceShowCover);
    }
  }, [forceShowCover, isEditMode]);
  
  // Theme-specific styles
  const themes = {
    gold: {
      primary: '#C5A059',
      bg: '#FCF9F6',
      text: '#1C1917',
      muted: '#78716C',
      fontSerif: '"Cinzel", serif',
      fontScript: '"Pinyon Script", cursive',
      pattern: 'https://www.transparenttextures.com/patterns/natural-paper.png'
    },
    emerald: {
      primary: '#064E3B',
      bg: '#ECFDF5',
      text: '#064E3B',
      muted: '#065F46',
      fontSerif: '"Playfair Display", serif',
      fontScript: '"Dancing Script", cursive',
      pattern: 'https://www.transparenttextures.com/patterns/xv.png'
    },
    linen: {
      primary: '#44403C',
      bg: '#F5F5F4',
      text: '#1C1917',
      muted: '#A8A29E',
      fontSerif: '"Cormorant Garamond", serif',
      fontScript: '"Great Vibes", cursive',
      pattern: 'https://www.transparenttextures.com/patterns/linen.png'
    }
  };

  const currentTheme = {
    ...(themes[data.themeId] || themes.gold),
    primary: data.primaryColor || (themes[data.themeId] || themes.gold).primary,
    fontSerif: data.fontFamily || (themes[data.themeId] || themes.gold).fontSerif,
    fontScript: data.titleFont || (themes[data.themeId] || themes.gold).fontScript,
  };
  
  const Editable = ({ children, sectionId }) => {
    if (!isEditMode) return children;
    return (
      <div 
        onClick={() => onEdit(sectionId)}
        className="relative group cursor-pointer"
      >
        <div className="absolute -inset-2 border-2 border-dashed border-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl z-[60] pointer-events-none flex items-center justify-center bg-[#C5A059]/5 backdrop-blur-[2px]">
           <div className="bg-[#C5A059] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full -top-4 absolute shadow-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">edit</span>
              Klik untuk Edit
           </div>
        </div>
        {children}
      </div>
    );
  };

  const audioRef = useRef(null);

  // HANDLE MUSIC CHANGE
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Auto-play blocked:", e));
      }
    }
  }, [data.musicUrl]);

  const handleOpen = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRSVPSubmit = async () => {
    if (!formName) return alert("Mohon masukkan nama Anda");
    setIsSubmitting(true);
    try {
      // Send RSVP
      const rsvpRes = await fetch(`${API_URL}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          attendance: formAttendance === 'yes',
          guests: formGuests
        })
      });

      if (!rsvpRes.ok) throw new Error("Gagal mengirim RSVP");

      // Send Message if exists
      if (formMessage) {
        const msgRes = await fetch(`${API_URL}/message`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formName,
            message: formMessage
          })
        });
        if (msgRes.ok) fetchMessages(); // Refresh message list
      }

      setRsvpStatus('confirmed');
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim konfirmasi. Pastikan server aktif.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div 
      className="min-h-screen relative" 
      style={{ 
        backgroundColor: currentTheme.bg, 
        color: currentTheme.text,
        backgroundImage: `url(${currentTheme.pattern})`,
        fontFamily: currentTheme.fontSerif
      }}
    >
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src={data.musicUrl} type="audio/mpeg" />
      </audio>

      {/* Music Control Bar */}
      {isOpened && (
        <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-2">
           <button 
             onClick={toggleMusic}
             className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-stone-900 transition-all hover:scale-110 active:scale-95"
           >
             <span className="material-symbols-outlined">{isPlaying ? 'pause' : 'play_arrow'}</span>
           </button>
           {isPlaying && (
             <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl text-[8px] font-black uppercase tracking-[0.2em] text-stone-900 flex items-center gap-2">
                <div className="flex gap-0.5">
                   {[...Array(4)].map((_, i) => (
                     <motion.div 
                       key={i}
                       animate={{ height: [4, 12, 4] }}
                       transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                       className="w-1 bg-[#C5A059] rounded-full"
                     />
                   ))}
                </div>
                Now Playing
             </div>
           )}
        </div>
      )}

      {/* Floating Action Menu (Mobile Nav) */}
      {isOpened && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-4xl flex items-center gap-8 lg:hidden border border-stone-100">
           {['home', 'couple', 'event', 'gallery', 'gift', 'rsvp'].map(id => (
             <button key={id} onClick={() => {
               document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
               setActiveTab(id);
             }} className={`material-symbols-outlined text-[20px] ${activeTab === id ? 'text-[#C5A059]' : 'text-stone-300'}`}>{
               id === 'home' ? 'home' : 
               id === 'couple' ? 'favorite' : 
               id === 'event' ? 'event' : 
               id === 'gallery' ? 'image' : 
               id === 'gift' ? 'payments' : 'mail'
             }</button>
           ))}
        </div>
      )}

      {/* 1. COVER OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] flex flex-col items-center justify-center text-center p-6 lg:p-20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110" style={{ backgroundImage: `url(${data.backgroundImage})` }}></div>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            
            <div className="relative z-10 space-y-12 max-w-2xl text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <span className="material-symbols-outlined text-4xl text-[#C5A059]">filter_vintage</span>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-80">Wedding Invitation</p>
                <h1 className="script-font text-7xl lg:text-9xl leading-none">{data.partner1} & {data.partner2}</h1>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] font-bold opacity-60">Dear Honorable Guest,</p>
                <div className="serif text-2xl lg:text-3xl font-bold tracking-tight bg-white/10 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/20">
                  {formName || 'Our Special Guest'}
                </div>
              </motion.div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="bg-white text-stone-900 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-4xl flex items-center gap-3 mx-auto transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Buka Undangan
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className={`transition-all duration-1000 ${!isOpened ? 'h-screen overflow-hidden opacity-0' : 'opacity-100'}`}>
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen relative flex items-center justify-center p-6 lg:p-20 overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-20 lg:opacity-30" style={{ backgroundImage: `url(${data.backgroundImage})` }}></div>
           <div className="relative z-10 text-center space-y-8 max-w-3xl">
              <Editable sectionId="basic-section">
                <motion.div {...reveal} className="space-y-6">
                   <span className="material-symbols-outlined text-4xl" style={{ color: currentTheme.primary }}>filter_vintage</span>
                   <p className="script-font text-3xl md:text-4xl italic" style={{ color: currentTheme.primary }}>
                     "{data.quote || 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...'}"
                   </p>
                   <div className="w-20 h-[1px] mx-auto mt-6" style={{ backgroundColor: currentTheme.primary, opacity: 0.3 }}></div>
                </motion.div>
                <motion.h2 {...reveal} transition={{ delay: 0.3 }} className="serif-font text-5xl md:text-8xl font-black tracking-tighter uppercase">
                  {data.partner1} <span className="script-font text-5xl lowercase normal-case">&</span> {data.partner2}
                </motion.h2>
                <motion.p {...reveal} transition={{ delay: 0.5 }} className="serif text-xl md:text-2xl tracking-[0.2em] uppercase font-light opacity-80">
                  {new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </motion.p>
              </Editable>
           </div>
        </section>

        {/* COUPLE SECTION */}
        <section id="couple" className="py-24 lg:py-40 px-6 flex flex-col items-center gap-20 bg-pattern">
           <div className="text-center space-y-4 max-w-xl">
              <h3 className="script-font text-5xl lg:text-6xl" style={{ color: currentTheme.primary }}>Mempelai Bahagia</h3>
              <p className="text-xs uppercase tracking-[0.4em] font-bold opacity-40">Assalamualaikum Warahmatullahi Wabarakatuh</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 max-w-6xl w-full">
              {/* GROOM */}
              <motion.div {...reveal} className="flex flex-col items-center text-center gap-8">
                 <Editable sectionId="media-section">
                    <div className="relative group">
                       <div className="absolute -inset-4 border border-dashed rounded-full animate-spin-slow opacity-20" style={{ borderColor: currentTheme.primary }}></div>
                       <div className="w-64 lg:w-80 aspect-[3/4] rounded-[100px] overflow-hidden border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                          <img src={data.groomImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover" />
                       </div>
                    </div>
                 </Editable>
                 <div className="space-y-3">
                    <h4 className="script-font text-5xl lg:text-6xl" style={{ color: currentTheme.primary }}>{data.partner1}</h4>
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Putra Dari</p>
                    <p className="serif text-lg font-bold">Bapak {data.father1 || 'Nama Ayah'}</p>
                    <p className="serif text-lg font-bold">& Ibu {data.mother1 || 'Nama Ibu'}</p>
                 </div>
              </motion.div>

              {/* BRIDE */}
              <motion.div {...reveal} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center gap-8">
                 <Editable sectionId="media-section">
                    <div className="relative group">
                       <div className="absolute -inset-4 border border-dashed rounded-full animate-spin-slow opacity-20" style={{ borderColor: currentTheme.primary }}></div>
                       <div className="w-64 lg:w-80 aspect-[3/4] rounded-[100px] overflow-hidden border-8 border-white shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                          <img src={data.brideImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover" />
                       </div>
                    </div>
                 </Editable>
                 <div className="space-y-3">
                    <h4 className="script-font text-5xl lg:text-6xl" style={{ color: currentTheme.primary }}>{data.partner2}</h4>
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Putri Dari</p>
                    <p className="serif text-lg font-bold">Bapak {data.father2 || 'Nama Ayah'}</p>
                    <p className="serif text-lg font-bold">& Ibu {data.mother2 || 'Nama Ibu'}</p>
                 </div>
              </motion.div>
           </div>
        </section>

        {/* EVENT SECTION */}
        <section id="event" className="py-24 lg:py-40 px-6 relative overflow-hidden bg-pattern">
           <div className="absolute inset-0 opacity-5" style={{ backgroundColor: currentTheme.primary }}></div>
           <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-16 relative z-10">
              <div className="space-y-4">
                 <h3 className="script-font text-5xl lg:text-7xl" style={{ color: currentTheme.primary }}>Agenda Acara</h3>
                 <p className="text-xs uppercase tracking-[0.4em] font-bold opacity-40 italic">Momen Berharga Kami</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                 <motion.div {...reveal} className="bg-white p-12 lg:p-16 rounded-[60px] shadow-2xl border border-stone-100 flex flex-col items-center gap-8 group hover:-translate-y-2 transition-all duration-500">
                    <span className="material-symbols-outlined text-5xl opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: currentTheme.primary }}>church</span>
                    <div className="space-y-4">
                       <h4 className="serif text-3xl font-black uppercase tracking-tighter">Akad Nikah</h4>
                       <div className="w-12 h-1 bg-stone-100 mx-auto" />
                       <div className="space-y-1">
                          <p className="serif text-xl font-bold">08:00 - 10:00 WIB</p>
                          <p className="text-stone-400 text-sm font-medium">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                       </div>
                       <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">Kediaman Mempelai Wanita, Jl. Melati No. 123, Jakarta</p>
                    </div>
                    <button className="px-8 py-3 border-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>Buka Google Maps</button>
                 </motion.div>

                 <motion.div {...reveal} transition={{ delay: 0.3 }} className="bg-white p-12 lg:p-16 rounded-[60px] shadow-2xl border border-stone-100 flex flex-col items-center gap-8 group hover:-translate-y-2 transition-all duration-500">
                    <span className="material-symbols-outlined text-5xl opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: currentTheme.primary }}>restaurant</span>
                    <div className="space-y-4">
                       <h4 className="serif text-3xl font-black uppercase tracking-tighter">Resepsi</h4>
                       <div className="w-12 h-1 bg-stone-100 mx-auto" />
                       <div className="space-y-1">
                          <p className="serif text-xl font-bold">11:00 - Selesai</p>
                          <p className="text-stone-400 text-sm font-medium">{new Date(data.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                       </div>
                       <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">Ballroom Hotel Grand Luxury, Jl. Sudirman Kav. 1, Jakarta</p>
                    </div>
                    <button className="px-8 py-3 border-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all" style={{ borderColor: currentTheme.primary, color: currentTheme.primary }}>Buka Google Maps</button>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* GIFT SECTION */}
        <section id="gift" className="py-24 lg:py-40 px-6 bg-pattern">
           <div className="max-w-3xl mx-auto text-center space-y-16">
              <div className="space-y-4">
                 <h3 className="script-font text-5xl lg:text-7xl" style={{ color: currentTheme.primary }}>Kado Digital</h3>
                 <p className="text-xs uppercase tracking-[0.3em] font-bold opacity-40 leading-relaxed italic">
                   Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan kasih Anda, kami sediakan sarana berikut:
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <motion.div {...reveal} className="bg-white p-10 rounded-[50px] shadow-2xl border border-stone-100 space-y-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" className="h-8 mx-auto" alt="BCA" />
                    <div className="space-y-2">
                       <p className="text-xs uppercase font-bold tracking-widest opacity-40">Nomor Rekening</p>
                       <p className="text-2xl font-black tracking-widest">123 456 7890</p>
                       <p className="serif text-sm font-bold opacity-60">a.n {data.partner1}</p>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText('1234567890'); alert('Rekening disalin!'); }} className="w-full py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">Salin Rekening</button>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* RSVP SECTION */}
        <section id="rsvp" className="py-24 lg:py-40 px-6 bg-pattern">
           <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-10 lg:p-16 rounded-[80px] shadow-4xl border border-stone-50 text-center space-y-16">
                 <div className="space-y-6">
                    <h3 className="script-font text-5xl lg:text-7xl" style={{ color: currentTheme.primary }}>Konfirmasi</h3>
                    <p className="text-xs uppercase tracking-[0.4em] font-bold opacity-40 italic">Sambut Bahagia Bersama Kami</p>
                 </div>

                 {rsvpStatus ? (
                   <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-12 space-y-4">
                      <div className="w-24 h-24 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                         <span className="material-symbols-outlined text-5xl">check_circle</span>
                      </div>
                      <p className="serif text-2xl font-black uppercase tracking-tighter">Konfirmasi Terkirim!</p>
                      <p className="text-stone-500 text-sm">Terima kasih atas doa dan konfirmasinya. Sampai jumpa!</p>
                   </motion.div>
                 ) : (
                   <div className="space-y-8 text-left">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Nama Lengkap</label>
                         <input 
                           className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all" 
                           value={formName}
                           onChange={(e) => setFormName(e.target.value)}
                           placeholder="Masukkan nama Anda..."
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Konfirmasi Kehadiran</label>
                         <select 
                           className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all appearance-none"
                           value={formAttendance}
                           onChange={(e) => setFormAttendance(e.target.value)}
                         >
                            <option value="yes">Hadir dengan Senang Hati</option>
                            <option value="no">Mohon Maaf Tidak Bisa Hadir</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Jumlah Tamu</label>
                         <input 
                           type="number" 
                           min="1" 
                           max="10" 
                           className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all" 
                           value={formGuests}
                           onChange={(e) => setFormGuests(parseInt(e.target.value))}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Ucapan & Doa</label>
                         <textarea 
                           className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all h-40 resize-none" 
                           placeholder="Tuliskan pesan manis Anda..."
                           value={formMessage}
                           onChange={(e) => setFormMessage(e.target.value)}
                         ></textarea>
                      </div>
                      <button 
                       disabled={isSubmitting}
                       onClick={handleRSVPSubmit}
                       className={`w-full py-6 text-white rounded-[30px] font-black uppercase tracking-[0.3em] text-[12px] shadow-3xl hover:brightness-110 transition-all active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                       style={{ backgroundColor: currentTheme.primary }}
                      >
                        {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
                      </button>
                   </div>
                 )}
              </div>

              {/* MESSAGES LIST (LIVE FEED) */}
              <div className="space-y-8">
                 <div className="flex justify-between items-center px-4">
                    <h4 className="serif text-2xl font-bold">Wishes from Friends</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{messages.length} Messages</span>
                 </div>
                 <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                    {messages.map((m) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        key={m.id} 
                        className="bg-white/50 backdrop-blur-sm p-8 rounded-[40px] border border-white/50 shadow-sm space-y-4"
                      >
                         <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                                  {m.name.charAt(0)}
                               </div>
                               <div>
                                  <p className="serif font-bold text-stone-900">{m.name}</p>
                                  <p className="text-[8px] uppercase tracking-widest opacity-40">{new Date(m.date).toLocaleDateString()}</p>
                               </div>
                            </div>
                            <button 
                              onClick={() => handleLike(m.id)}
                              className="flex items-center gap-1 text-[10px] font-black text-pink-500 hover:scale-110 transition-transform"
                            >
                               <span className="material-symbols-outlined text-[16px] icon-fill">favorite</span>
                               {m.likes || 0}
                            </button>
                         </div>
                         <p className="text-stone-600 text-sm italic leading-relaxed">"{m.message}"</p>
                      </motion.div>
                    ))}
                    {messages.length === 0 && (
                      <div className="p-20 text-center bg-white/30 rounded-[40px] border-2 border-dashed border-white/50">
                         <p className="text-stone-400 italic text-sm">Be the first to send a wish!</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 text-center space-y-8 bg-stone-900 text-white">
           <div className="space-y-2">
              <h2 className="serif text-4xl font-black tracking-tighter uppercase">{data.partner1} & {data.partner2}</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40">Terima Kasih</p>
           </div>
           <div className="w-12 h-[1px] bg-white/20 mx-auto" />
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">© 2024 LuxeInvite Premium Suite</p>
        </footer>

      </div>
    </div>
  );
};

export default PremiumInvitation;
