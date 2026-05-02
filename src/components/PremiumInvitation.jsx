import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumInvitation = ({ data }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  
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
    // Audio context requires user interaction
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
    { id: 'home', icon: 'home' },
    { id: 'couple', icon: 'favorite' },
    { id: 'event', icon: 'event' },
    { id: 'gallery', icon: 'image' },
    { id: 'rsvp', icon: 'mail' }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper for reveal animations
  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white selection:bg-[#C5A059] selection:text-white">
      {/* BACKGROUND MUSIC */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* 1. COVER OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center p-10 text-center"
          >
            {/* Cover Background */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80')` }}>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="uppercase tracking-[0.4em] text-[10px] font-bold text-stone-300"
              >
                Wedding Invitation
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="script-font text-[64px] md:text-[80px] leading-tight text-[#C5A059]"
              >
                {data.partner1} <span className="text-white">&</span> {data.partner2}
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4 mt-8"
              >
                <p className="text-stone-400 text-xs uppercase tracking-widest italic">Kepada Bapak/Ibu/Saudara/i</p>
                <h2 className="serif text-2xl font-bold tracking-tight">{guestName || 'Tamu Undangan'}</h2>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                onClick={handleOpen}
                className="mt-12 px-10 py-4 bg-[#C5A059] text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Buka Undangan
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT - Only scrollable if isOpened */}
      <div className={`transition-all duration-1000 ${!isOpened ? 'h-screen overflow-hidden opacity-0' : 'opacity-1'}`}>
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen relative flex items-center justify-center p-10 overflow-hidden">
           <div className="absolute inset-0 bg-cover bg-fixed bg-center opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=80')` }}></div>
           <div className="relative z-10 text-center space-y-8 max-w-2xl">
              <motion.div {...reveal} className="space-y-4">
                 <p className="script-font text-3xl text-[#C5A059]">Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...</p>
                 <div className="w-20 h-[1px] bg-[#C5A059] mx-auto opacity-50"></div>
              </motion.div>
              <motion.h2 {...reveal} transition={{ delay: 0.2 }} className="serif text-5xl md:text-6xl font-black tracking-tighter">
                {data.partner1} & {data.partner2}
              </motion.h2>
              <motion.p {...reveal} transition={{ delay: 0.4 }} className="serif text-xl text-stone-300">
                {new Date(data.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </motion.p>
           </div>
        </section>

        {/* COUPLE SECTION */}
        <section id="couple" className="py-32 px-6 flex flex-col items-center gap-20">
           <div className="text-center space-y-4">
              <h3 className="script-font text-4xl text-[#C5A059]">Mempelai Pria & Wanita</h3>
              <p className="text-stone-400 text-sm uppercase tracking-widest">Atas Izin Allah SWT Kami Akan Menikah</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
              {/* GROOM */}
              <motion.div {...reveal} className="flex flex-col items-center text-center gap-6">
                 <div className="w-64 aspect-square rounded-full overflow-hidden border-4 border-[#C5A059] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="script-font text-4xl text-[#C5A059]">{data.partner1}</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-300">Putra dari</p>
                    <p className="text-stone-400 italic">Bapak Nama Ayah & Ibu Nama Ibu</p>
                 </div>
                 <button className="flex items-center gap-2 px-6 py-2 border border-stone-700 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    Instagram
                 </button>
              </motion.div>

              {/* BRIDE */}
              <motion.div {...reveal} transition={{ delay: 0.3 }} className="flex flex-col items-center text-center gap-6">
                 <div className="w-64 aspect-square rounded-full overflow-hidden border-4 border-[#C5A059] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-2">
                    <h4 className="script-font text-4xl text-[#C5A059]">{data.partner2}</h4>
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-300">Putri dari</p>
                    <p className="text-stone-400 italic">Bapak Nama Ayah & Ibu Nama Ibu</p>
                 </div>
                 <button className="flex items-center gap-2 px-6 py-2 border border-stone-700 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
                    <span className="material-symbols-outlined text-[16px]">person</span>
                    Instagram
                 </button>
              </motion.div>
           </div>
        </section>

        {/* EVENT SECTION */}
        <section id="event" className="py-32 px-6 bg-[#162036] relative overflow-hidden">
           <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-16 relative z-10">
              <div className="space-y-4">
                 <h3 className="script-font text-4xl text-[#C5A059]">Waktu & Lokasi</h3>
                 <p className="text-stone-400 text-sm uppercase tracking-widest">Insya Allah Acara Akan Dilaksanakan Pada:</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                 {/* AKAD */}
                 <motion.div {...reveal} className="p-10 bg-[#1E293B] rounded-[40px] border border-slate-700/50 shadow-2xl space-y-6">
                    <span className="material-symbols-outlined text-4xl text-[#C5A059]">auto_awesome</span>
                    <h5 className="serif text-2xl font-bold">Akad Nikah</h5>
                    <div className="w-10 h-[1px] bg-[#C5A059] mx-auto opacity-30"></div>
                    <div className="space-y-1 text-stone-300">
                       <p className="font-bold">Pukul 09.00 - 11.00 WIB</p>
                       <p className="text-sm">Bertempat di Kediaman Mempelai Wanita</p>
                    </div>
                 </motion.div>

                 {/* RESEPSI */}
                 <motion.div {...reveal} transition={{ delay: 0.2 }} className="p-10 bg-[#1E293B] rounded-[40px] border border-slate-700/50 shadow-2xl space-y-6">
                    <span className="material-symbols-outlined text-4xl text-[#C5A059]">celebration</span>
                    <h5 className="serif text-2xl font-bold">Resepsi</h5>
                    <div className="w-10 h-[1px] bg-[#C5A059] mx-auto opacity-30"></div>
                    <div className="space-y-1 text-stone-300">
                       <p className="font-bold">Pukul 12.00 - Selesai</p>
                       <p className="text-sm">Bertempat di {data.venue}</p>
                    </div>
                 </motion.div>
              </div>

              <motion.button 
                {...reveal}
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`, '_blank')}
                className="px-12 py-5 bg-[#C5A059] text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                Lihat Lokasi di Google Maps
              </motion.button>
           </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-32 px-6">
           <div className="max-w-6xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                 <h3 className="script-font text-4xl text-[#C5A059]">Galeri Bahagia</h3>
                 <p className="text-stone-400 text-sm uppercase tracking-widest">Momen Indah Kami</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {[
                   '1519741497674-611481863552',
                   '1511285560929-80b456fea0bc',
                   '1519225421980-715cb0215aed',
                   '1522673607200-164883eeca48',
                   '1515934751635-c81c6bc9a2d8',
                   '1465495910484-de3b250fecaa',
                   '1529636760658-ef721473fe31',
                   '1523438885200-e635ba2c371e'
                 ].map((id, i) => (
                    <motion.div 
                      key={id}
                      {...reveal}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square bg-slate-800 rounded-2xl overflow-hidden group cursor-pointer"
                    >
                       <img 
                        src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={`Gallery ${i + 1}`}
                       />
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* RSVP SECTION */}
        <section id="rsvp" className="py-32 px-6 bg-[#162036]">
           <div className="max-w-2xl mx-auto bg-[#1E293B] p-12 rounded-[50px] border border-slate-700/50 shadow-3xl text-center space-y-12">
              <div className="space-y-4">
                 <h3 className="script-font text-4xl text-[#C5A059]">Konfirmasi Kehadiran</h3>
                 <p className="text-stone-400 text-sm italic">Mohon kesediaannya untuk mengonfirmasi kehadiran Anda</p>
              </div>

              {rsvpStatus ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 bg-green-500/10 rounded-3xl border border-green-500/20">
                   <span className="material-symbols-outlined text-green-500 text-5xl mb-4">check_circle</span>
                   <p className="serif text-xl font-bold">Terima Kasih!</p>
                   <p className="text-stone-400 text-sm mt-2">Konfirmasi kehadiran Anda telah kami terima.</p>
                </motion.div>
              ) : (
                <div className="space-y-6 text-left">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-4">Nama Lengkap</label>
                      <input className="w-full bg-[#0F172A] border-none rounded-3xl p-5 text-white outline-none focus:ring-2 focus:ring-[#C5A059]" defaultValue={guestName} />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-4">Konfirmasi</label>
                      <select className="w-full bg-[#0F172A] border-none rounded-3xl p-5 text-white outline-none focus:ring-2 focus:ring-[#C5A059] appearance-none">
                         <option>Hadir</option>
                         <option>Mungkin Hadir</option>
                         <option>Tidak Hadir</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-4">Pesan Singkat</label>
                      <textarea className="w-full bg-[#0F172A] border-none rounded-3xl p-5 text-white outline-none focus:ring-2 focus:ring-[#C5A059] h-32" placeholder="Tulis ucapan selamat Anda..."></textarea>
                   </div>
                   <button 
                    onClick={() => setRsvpStatus('confirmed')}
                    className="w-full py-5 bg-[#C5A059] text-white rounded-3xl font-bold uppercase tracking-widest text-xs shadow-xl hover:brightness-110 transition-all"
                   >
                     Kirim Konfirmasi
                   </button>
                </div>
              )}
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-32 px-6 text-center space-y-8 bg-[#0F172A]">
           <h3 className="script-font text-5xl text-[#C5A059]">{data.partner1} & {data.partner2}</h3>
           <p className="text-stone-500 text-xs uppercase tracking-[0.5em]">Sampai Jumpa di Hari Bahagia Kami</p>
           <div className="pt-20 opacity-30 flex flex-col items-center gap-2">
              <p className="text-[10px] uppercase font-bold tracking-widest">Crafted with Love by</p>
              <h2 className="serif text-xl font-black italic tracking-tighter">LuxeInvite</h2>
           </div>
        </footer>

        {/* STICKY BOTTOM NAV */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[500] px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-6 shadow-2xl">
           {sections.map(s => (
              <button 
                key={s.id} 
                onClick={() => scrollTo(s.id)}
                className="text-white/60 hover:text-[#C5A059] transition-colors p-2"
              >
                 <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
              </button>
           ))}
           <div className="w-[1px] h-6 bg-white/10"></div>
           <button 
            onClick={toggleMusic}
            className={`p-2 rounded-full transition-all ${isPlaying ? 'text-[#C5A059] animate-spin-slow' : 'text-white/40'}`}
           >
              <span className="material-symbols-outlined text-[20px]">{isPlaying ? 'music_note' : 'music_off'}</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumInvitation;
