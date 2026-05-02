import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumInvitation = ({ data }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  
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

  const currentTheme = themes[data.themeId] || themes.gold;
  
  // Initialize guest name directly from URL
  const [guestName] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const kpd = params.get('kpd');
    return kpd ? decodeURIComponent(kpd) : '';
  });

  const audioRef = useRef(null);

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

  const sections = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'couple', icon: 'favorite', label: 'Mempelai' },
    { id: 'event', icon: 'event', label: 'Acara' },
    { id: 'gallery', icon: 'image', label: 'Galeri' },
    { id: 'gift', icon: 'payments', label: 'Hadiah' },
    { id: 'rsvp', icon: 'mail', label: 'RSVP' }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActiveTab(id);
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Dancing+Script:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Great+Vibes&display=swap');
        .script-font { font-family: ${currentTheme.fontScript}; }
        .serif-font { font-family: ${currentTheme.fontSerif}; }
        .bg-pattern { background-image: url(${currentTheme.pattern}); }
        .shadow-4xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.25); }
      `}</style>

      {/* BACKGROUND MUSIC */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* 1. COVER OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-6 lg:p-10 text-center"
          >
            {/* Cover Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms]" style={{ backgroundImage: `url(${data.backgroundImage})` }}>
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 lg:gap-8 max-w-lg w-full">
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex items-center gap-4 w-full"
               >
                  <div className="h-px flex-1 bg-white/30"></div>
                  <span className="uppercase tracking-[0.5em] text-[10px] font-bold text-white/80">Wedding Invitation</span>
                  <div className="h-px flex-1 bg-white/30"></div>
               </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1.2 }}
                className="space-y-2"
              >
                <h1 className="script-font text-[72px] lg:text-[100px] leading-tight text-white drop-shadow-2xl">
                  {data.partner1} <span className="text-[32px] lg:text-[48px] block lg:inline">&</span> {data.partner2}
                </h1>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[40px] w-full space-y-4"
              >
                <p className="text-white/60 text-xs uppercase tracking-widest italic">Kepada Bapak/Ibu/Saudara/i</p>
                <h2 className="serif text-2xl lg:text-3xl font-black text-white tracking-tight">{guestName || 'Tamu Undangan'}</h2>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={handleOpen}
                className="mt-8 px-12 py-5 bg-white text-stone-900 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-[#C5A059] hover:text-white transition-all flex items-center gap-3 active:scale-95"
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
              <motion.div {...reveal} className="space-y-6">
                 <span className="material-symbols-outlined text-4xl" style={{ color: currentTheme.primary }}>filter_vintage</span>
                 <p className="script-font text-3xl md:text-4xl italic" style={{ color: currentTheme.primary }}>
                   "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
                 </p>
                 <p className="text-xs uppercase tracking-widest font-bold opacity-60">QS. Ar-Rum: 21</p>
                 <div className="w-20 h-[1px] mx-auto" style={{ backgroundColor: currentTheme.primary, opacity: 0.3 }}></div>
              </motion.div>
              <motion.h2 {...reveal} transition={{ delay: 0.3 }} className="serif-font text-5xl md:text-8xl font-black tracking-tighter uppercase">
                {data.partner1} <span className="script-font text-5xl lowercase normal-case">&</span> {data.partner2}
              </motion.h2>
              <motion.p {...reveal} transition={{ delay: 0.5 }} className="serif text-xl md:text-2xl tracking-[0.2em] uppercase font-light opacity-80">
                {new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </motion.p>
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
                 <div className="relative group">
                    <div className="absolute -inset-4 border border-dashed rounded-full animate-spin-slow opacity-20" style={{ borderColor: currentTheme.primary }}></div>
                    <div className="w-64 lg:w-80 aspect-[3/4] rounded-[100px] overflow-hidden border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                       <img src={data.groomImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <h4 className="script-font text-5xl lg:text-6xl" style={{ color: currentTheme.primary }}>{data.partner1}</h4>
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Putra Bungsu Dari</p>
                    <p className="serif text-lg font-bold">Bapak Nama Ayah</p>
                    <p className="serif text-lg font-bold">& Ibu Nama Ibu</p>
                 </div>
                 <a href="#" className="flex items-center gap-3 px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    @instagram_pria
                 </a>
              </motion.div>

              {/* BRIDE */}
              <motion.div {...reveal} transition={{ delay: 0.4 }} className="flex flex-col items-center text-center gap-8">
                 <div className="relative group">
                    <div className="absolute -inset-4 border border-dashed rounded-full animate-spin-slow opacity-20" style={{ borderColor: currentTheme.primary }}></div>
                    <div className="w-64 lg:w-80 aspect-[3/4] rounded-[100px] overflow-hidden border-8 border-white shadow-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                       <img src={data.brideImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"} className="w-full h-full object-cover" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <h4 className="script-font text-5xl lg:text-6xl" style={{ color: currentTheme.primary }}>{data.partner2}</h4>
                    <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Putri Pertama Dari</p>
                    <p className="serif text-lg font-bold">Bapak Nama Ayah</p>
                    <p className="serif text-lg font-bold">& Ibu Nama Ibu</p>
                 </div>
                 <a href="#" className="flex items-center gap-3 px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    @instagram_wanita
                 </a>
              </motion.div>
           </div>
        </section>

        {/* EVENT SECTION */}
        <section id="event" className="py-24 lg:py-40 px-6 relative overflow-hidden bg-pattern">
           <div className="absolute inset-0 opacity-5" style={{ backgroundColor: currentTheme.primary }}></div>
           <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-16 relative z-10">
              <div className="space-y-4">
                 <h3 className="script-font text-5xl lg:text-7xl" style={{ color: currentTheme.primary }}>Agenda Acara</h3>
                 <p className="text-xs uppercase tracking-[0.5em] font-bold opacity-40 italic">Momen Sakral Kami</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                 {/* AKAD */}
                 <motion.div {...reveal} className="p-12 lg:p-16 bg-white rounded-[60px] shadow-3xl space-y-8 border border-stone-100 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ backgroundColor: `${currentTheme.primary}10`, color: currentTheme.primary }}>
                       <span className="material-symbols-outlined text-4xl">church</span>
                    </div>
                    <h5 className="serif-font text-3xl font-black uppercase tracking-tighter">Akad Nikah</h5>
                    <div className="w-12 h-1 rounded-full" style={{ backgroundColor: currentTheme.primary }}></div>
                    <div className="space-y-4">
                       <div className="flex flex-col items-center gap-1">
                          <p className="text-xs font-black uppercase tracking-widest opacity-40">Waktu</p>
                          <p className="text-xl font-bold">08:00 - 10:00 WIB</p>
                       </div>
                       <div className="flex flex-col items-center gap-1">
                          <p className="text-xs font-black uppercase tracking-widest opacity-40">Tempat</p>
                          <p className="text-lg italic text-stone-500">Masjid Agung Al-Azhar, Jakarta Selatan</p>
                       </div>
                    </div>
                 </motion.div>

                 {/* RESEPSI */}
                 <motion.div {...reveal} transition={{ delay: 0.3 }} className="p-12 lg:p-16 bg-white rounded-[60px] shadow-3xl space-y-8 border border-stone-100 flex flex-col items-center">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ backgroundColor: `${currentTheme.primary}10`, color: currentTheme.primary }}>
                       <span className="material-symbols-outlined text-4xl">celebration</span>
                    </div>
                    <h5 className="serif-font text-3xl font-black uppercase tracking-tighter">Resepsi</h5>
                    <div className="w-12 h-1 rounded-full" style={{ backgroundColor: currentTheme.primary }}></div>
                    <div className="space-y-4">
                       <div className="flex flex-col items-center gap-1">
                          <p className="text-xs font-black uppercase tracking-widest opacity-40">Waktu</p>
                          <p className="text-xl font-bold">11:00 - Selesai</p>
                       </div>
                       <div className="flex flex-col items-center gap-1">
                          <p className="text-xs font-black uppercase tracking-widest opacity-40">Tempat</p>
                          <p className="text-lg italic text-stone-500">{data.venue}</p>
                       </div>
                    </div>
                 </motion.div>
              </div>

              <motion.button 
                {...reveal}
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`, '_blank')}
                className="group px-12 py-5 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl flex items-center gap-4 transition-all hover:scale-105"
                style={{ backgroundColor: currentTheme.primary }}
              >
                <span className="material-symbols-outlined text-[20px] group-hover:animate-bounce">location_on</span>
                Buka Google Maps
              </motion.button>
           </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-24 lg:py-40 px-6 bg-pattern">
           <div className="max-w-6xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                 <h3 className="script-font text-5xl lg:text-7xl" style={{ color: currentTheme.primary }}>Galeri Bahagia</h3>
                 <p className="text-xs uppercase tracking-[0.6em] font-bold opacity-30">Our Beautiful Memories</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
                 {[
                   '1519741497674-611481863552', '1511285560929-80b456fea0bc', '1519225421980-715cb0215aed', '1522673607200-164883eeca48',
                   '1515934751635-c81c6bc9a2d8', '1465495910484-de3b250fecaa', '1529636760658-ef721473fe31', '1523438885200-e635ba2c371e'
                 ].map((id, i) => (
                    <motion.div 
                      key={id} {...reveal} transition={{ delay: i * 0.1 }}
                      className="aspect-[3/4] bg-stone-100 rounded-[30px] overflow-hidden group cursor-pointer border-4 border-white shadow-xl"
                    >
                       <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* GIFT SECTION (Indo Style) */}
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

                 <motion.div {...reveal} transition={{ delay: 0.3 }} className="bg-white p-10 rounded-[50px] shadow-2xl border border-stone-100 space-y-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" className="h-8 mx-auto" alt="Mandiri" />
                    <div className="space-y-2">
                       <p className="text-xs uppercase font-bold tracking-widest opacity-40">Nomor Rekening</p>
                       <p className="text-2xl font-black tracking-widest">098 765 4321</p>
                       <p className="serif text-sm font-bold opacity-60">a.n {data.partner2}</p>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText('0987654321'); alert('Rekening disalin!'); }} className="w-full py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">Salin Rekening</button>
                 </motion.div>
              </div>
           </div>
        </section>

        {/* RSVP SECTION */}
        <section id="rsvp" className="py-24 lg:py-40 px-6 bg-pattern">
           <div className="max-w-2xl mx-auto bg-white p-12 lg:p-20 rounded-[80px] shadow-4xl border border-stone-50 text-center space-y-16">
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
                      <input className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all" defaultValue={guestName} />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Konfirmasi Kehadiran</label>
                      <select className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all appearance-none">
                         <option>Hadir dengan Senang Hati</option>
                         <option>Mungkin Bisa Hadir</option>
                         <option>Mohon Maaf Tidak Bisa Hadir</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Ucapan & Doa</label>
                      <textarea className="w-full bg-stone-50 border-none rounded-[30px] p-6 text-lg outline-none focus:ring-4 focus:ring-stone-100 transition-all h-40 resize-none" placeholder="Tuliskan pesan manis Anda..."></textarea>
                   </div>
                   <button 
                    onClick={() => setRsvpStatus('confirmed')}
                    className="w-full py-6 text-white rounded-[30px] font-black uppercase tracking-[0.3em] text-[12px] shadow-3xl hover:brightness-110 transition-all active:scale-95"
                    style={{ backgroundColor: currentTheme.primary }}
                   >
                     Kirim Konfirmasi
                   </button>
                </div>
              )}
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-24 lg:py-40 px-6 text-center space-y-12 bg-pattern border-t border-stone-100">
           <h3 className="script-font text-[64px] lg:text-[100px] leading-tight" style={{ color: currentTheme.primary }}>{data.partner1} & {data.partner2}</h3>
           <p className="text-xs uppercase tracking-[0.6em] font-black opacity-30">Thank You For Being Part Of Our Journey</p>
           <div className="pt-20 opacity-30 flex flex-col items-center gap-4">
              <div className="h-px w-20 bg-stone-900"></div>
              <p className="text-[10px] uppercase font-black tracking-widest">Crafted With Love By</p>
              <h2 className="serif text-2xl font-black italic tracking-tighter">LuxeInvite</h2>
           </div>
        </footer>

        {/* STICKY BOTTOM NAV */}
        <div className="fixed bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-[500] flex flex-col items-center gap-4 w-full px-6 max-w-lg">
           <div className="w-full bg-white/70 backdrop-blur-2xl border border-white/50 p-2 rounded-full flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden">
              {sections.map(s => (
                 <button 
                   key={s.id} 
                   onClick={() => scrollTo(s.id)}
                   className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-full transition-all ${activeTab === s.id ? 'bg-stone-900 text-white' : 'text-stone-400 hover:text-stone-900'}`}
                 >
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                    <span className="text-[7px] font-black uppercase tracking-widest hidden sm:block">{s.label}</span>
                 </button>
              ))}
              <div className="w-[1px] h-8 bg-stone-100 mx-2"></div>
              <button 
                onClick={toggleMusic}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isPlaying ? 'bg-[#C5A059] text-white animate-spin-slow' : 'bg-stone-100 text-stone-400'}`}
              >
                 <span className="material-symbols-outlined text-[20px]">{isPlaying ? 'music_note' : 'music_off'}</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumInvitation;
