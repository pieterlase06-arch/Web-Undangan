import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumInvitation from '../components/PremiumInvitation';

const Editor = ({ setView, data, updateData, lang, theme }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [zoom, setZoom] = useState(100);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);   // Mobile drawer toggle

  const t = {
    id: { 
      personalize: 'Personalisasi', 
      partner1: 'Pasangan 1', 
      partner2: 'Pasangan 2', 
      date: 'Tanggal', 
      time: 'Waktu', 
      venue: 'Lokasi',
      themes: 'Tema Premium',
      design: 'Desain',
      content: 'Konten',
      layers: 'Lapisan',
      publish: 'Publikasikan',
      preview: 'Pratinjau Langsung',
      success: 'Berhasil Dipublikasikan!',
      link: 'Link undangan Anda sudah siap dibagikan.'
    },
    en: { 
      personalize: 'Personalize', 
      partner1: 'Partner One', 
      partner2: 'Partner Two', 
      date: 'Date', 
      time: 'Time', 
      venue: 'Venue',
      themes: 'Premium Themes',
      design: 'Design',
      content: 'Content',
      layers: 'Layers',
      publish: 'Publish Site',
      preview: 'Live Preview',
      success: 'Published Successfully!',
      link: 'Your invitation link is ready to share.'
    }
  }[lang];

  const renderDesignTab = () => (
    <div className="space-y-12">
       {/* THEME SELECTION */}
       <section className="space-y-6">
          <h3 className={`serif text-xl ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{t.themes}</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'gold', img: './assets/themes/gold.png' },
              { id: 'emerald', img: './assets/themes/emerald.png' },
              { id: 'linen', img: './assets/themes/linen.png' }
            ].map(themeItem => (
              <button 
                key={themeItem.id}
                onClick={() => updateData({ themeId: themeItem.id, backgroundImage: themeItem.img })}
                className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${data.themeId === themeItem.id ? 'border-[#C5A059] scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={themeItem.img} className="w-full h-full object-cover" alt={themeItem.id} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
              </button>
            ))}
          </div>
       </section>

       {/* MUSIC LIBRARY */}
       <section className="space-y-6">
          <div className="flex items-center justify-between">
             <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Music Library</p>
             <span className="material-symbols-outlined text-[18px] text-[#C5A059]">music_note</span>
          </div>
          <div className="space-y-2">
             {[
               { name: 'Classical Wedding', genre: 'Instrumental', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
               { name: 'Modern Acoustic', genre: 'Acoustic', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
               { name: 'Traditional Melodic', genre: 'Tradisional', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
               { name: 'Romantic Piano', genre: 'Piano', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
             ].map((music, i) => (
               <button 
                 key={i}
                 onClick={() => updateData({ musicId: i, musicUrl: music.url })}
                 className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${data.musicId === i ? 'bg-[#C5A059] border-[#C5A059] text-white shadow-lg' : 'bg-transparent border-stone-100 dark:border-slate-800 text-stone-400 hover:border-stone-900'}`}
               >
                  <div className="flex items-center gap-3 text-left">
                     <span className="material-symbols-outlined text-[20px]">play_circle</span>
                     <div>
                        <p className="text-[11px] font-black uppercase tracking-widest">{music.name}</p>
                        <p className="text-[8px] font-bold opacity-60 uppercase">{music.genre}</p>
                     </div>
                  </div>
                  {data.musicId === i && <span className="material-symbols-outlined text-[16px]">check</span>}
               </button>
             ))}
             
             {/* CUSTOM MUSIC UPLOAD */}
             <div className="mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-slate-700">
                <input 
                  type="file" 
                  id="music-upload" 
                  accept="audio/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      updateData({ musicId: 'custom', musicUrl: url });
                    }
                  }}
                />
                <label 
                  htmlFor="music-upload"
                  className={`w-full p-4 rounded-2xl border-2 border-dashed flex items-center justify-center gap-3 cursor-pointer transition-all ${data.musicId === 'custom' ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]' : 'border-stone-200 text-stone-400 hover:border-stone-900'}`}
                >
                   <span className="material-symbols-outlined">upload_file</span>
                   <span className="text-[10px] font-black uppercase tracking-widest">Upload Musik Sendiri</span>
                </label>
             </div>
          </div>
       </section>

       {/* COLOR PALETTES */}
       <section className="space-y-6">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Global Colors</p>
          <div className="grid grid-cols-5 gap-3">
             {[
               { p: '#C5A059', a: '#1C1917' },
               { p: '#064E3B', a: '#D4AF37' },
               { p: '#44403C', a: '#A8A29E' },
               { p: '#BE123C', a: '#C5A059' },
               { p: '#0F172A', a: '#334155' }
             ].map((pal, i) => (
               <button 
                key={i} 
                onClick={() => updateData({ primaryColor: pal.p, accentColor: pal.a })}
                className="group flex flex-col gap-1 items-center"
               >
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-md relative overflow-hidden" style={{ backgroundColor: pal.p }}>
                     <div className="absolute inset-y-0 right-0 w-1/2" style={{ backgroundColor: pal.a }} />
                  </div>
                  {data.primaryColor === pal.p && <div className="w-1 h-1 rounded-full bg-[#C5A059]" />}
               </button>
             ))}
          </div>
       </section>

       {/* TYPOGRAPHY */}
       <section className="space-y-4">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Font Pairing</p>
          <div className="flex gap-2">
             <button onClick={() => updateData({ fontFamily: 'serif' })} className={`flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${data.fontFamily === 'serif' ? 'bg-[#0F172A] text-white shadow-lg' : 'border-stone-100 text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800'}`}>Classy Serif</button>
             <button onClick={() => updateData({ fontFamily: 'sans' })} className={`flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${data.fontFamily === 'sans' ? 'bg-[#0F172A] text-white shadow-lg' : 'border-stone-100 text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800'}`}>Minimal Sans</button>
          </div>
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-12">
       <div className="space-y-10">
         {/* BASIC INFO */}
         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Mempelai & Acara</h4>
            <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.partner1}</label>
                 <input className={`w-full border-b py-3 text-xl outline-none transition-all font-serif ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white focus:border-[#C5A059]' : 'bg-transparent border-stone-100 text-stone-900 focus:border-stone-900'}`} value={data.partner1} onChange={(e) => updateData({ partner1: e.target.value })} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.partner2}</label>
                 <input className={`w-full border-b py-3 text-xl outline-none transition-all font-serif ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white focus:border-[#C5A059]' : 'bg-transparent border-stone-100 text-stone-900 focus:border-stone-900'}`} value={data.partner2} onChange={(e) => updateData({ partner2: e.target.value })} />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.date}</label>
                    <input type="date" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.date} onChange={(e) => updateData({ date: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.time}</label>
                    <input type="time" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.time} onChange={(e) => updateData({ time: e.target.value })} />
                  </div>
               </div>
            </div>
         </div>

         {/* FAMILY INFO */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Info Orang Tua</h4>
            <div className="space-y-6">
               <div className="space-y-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Pihak {data.partner1}</p>
                  <input placeholder="Nama Ayah" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.father1 || ''} onChange={(e) => updateData({ father1: e.target.value })} />
                  <input placeholder="Nama Ibu" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.mother1 || ''} onChange={(e) => updateData({ mother1: e.target.value })} />
               </div>
               <div className="space-y-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Pihak {data.partner2}</p>
                  <input placeholder="Nama Ayah" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.father2 || ''} onChange={(e) => updateData({ father2: e.target.value })} />
                  <input placeholder="Nama Ibu" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.mother2 || ''} onChange={(e) => updateData({ mother2: e.target.value })} />
               </div>
            </div>
         </div>

         {/* MEDIA SECTION */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Media & Photos</h4>
            
            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Photo Mempelai</p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <p className="text-[9px] font-bold opacity-40 uppercase">Pria</p>
                     <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 group shadow-sm hover:shadow-lg transition-all">
                        <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                           <span className="material-symbols-outlined text-white">upload</span>
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) updateData({ groomImage: URL.createObjectURL(file) });
                           }} />
                        </label>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[9px] font-bold opacity-40 uppercase">Wanita</p>
                     <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 group shadow-sm hover:shadow-lg transition-all">
                        <img src={data.brideImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                           <span className="material-symbols-outlined text-white">upload</span>
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) updateData({ brideImage: URL.createObjectURL(file) });
                           }} />
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* QUOTE & VERSE */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Ayah & Kutipan</h4>
            <div className="space-y-4">
               <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Kutipan Undangan</label>
               <textarea 
                  className={`w-full border p-4 rounded-2xl text-xs outline-none transition-all ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 text-white focus:border-[#C5A059]' : 'bg-stone-50 border-stone-100 text-stone-900 focus:border-stone-900'}`} 
                  rows="4"
                  value={data.quote || 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...'} 
                  onChange={(e) => updateData({ quote: e.target.value })} 
               />
            </div>
         </div>

         {/* EVENT DETAILS */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Detail Lokasi</h4>
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Nama Tempat</label>
                 <input className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.venue} onChange={(e) => updateData({ venue: e.target.value })} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Alamat Lengkap</label>
                 <textarea className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.address} onChange={(e) => updateData({ address: e.target.value })} />
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Link Google Maps</label>
                 <input placeholder="https://maps.google.com/..." className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.mapsLink || ''} onChange={(e) => updateData({ mapsLink: e.target.value })} />
               </div>
            </div>
         </div>

         {/* DIGITAL GIFT DETAILS */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Rekening Kado</h4>
            <div className="space-y-6">
               <div className="space-y-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Rekening 1</p>
                  <input placeholder="Nama Bank (BCA/Mandiri)" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.bankName1 || ''} onChange={(e) => updateData({ bankName1: e.target.value })} />
                  <input placeholder="Nomor Rekening" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.bankAccount1 || ''} onChange={(e) => updateData({ bankAccount1: e.target.value })} />
                  <input placeholder="Atas Nama" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.bankOwner1 || ''} onChange={(e) => updateData({ bankOwner1: e.target.value })} />
               </div>
            </div>
         </div>

         {/* SECTION TOGGLES */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Section Settings</h4>
            <div className="space-y-3">
               {[
                 { id: 'showGift', name: 'Kado Digital (Angpau)', icon: 'payments' },
                 { id: 'showGallery', name: 'Galeri Foto', icon: 'image' },
                 { id: 'showStory', name: 'Love Story', icon: 'history_edu' },
                 { id: 'showRSVP', name: 'Form Konfirmasi (RSVP)', icon: 'mail' }
               ].map(s => (
                 <button 
                  key={s.id}
                  onClick={() => updateData({ [s.id]: !data[s.id] })}
                  className="w-full p-4 rounded-2xl border border-stone-100 dark:border-slate-800 flex items-center justify-between hover:bg-stone-50 transition-colors"
                 >
                    <div className="flex items-center gap-3">
                       <span className="material-symbols-outlined text-[20px] text-stone-400">{s.icon}</span>
                       <span className="text-[11px] font-bold uppercase tracking-widest text-stone-600 dark:text-slate-300">{s.name}</span>
                    </div>
                    <div className={`w-10 h-5 rounded-full p-1 transition-colors ${data[s.id] !== false ? 'bg-[#C5A059]' : 'bg-stone-200'}`}>
                       <div className={`w-3 h-3 bg-white rounded-full transition-transform ${data[s.id] !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                 </button>
               ))}
            </div>
         </div>
       </div>
    </div>
  );

  const renderLayersTab = () => (
    <div className="space-y-4">
       {[
         { id: 'bg', name: 'Background Frame', icon: 'image', status: 'Locked' },
         { id: 'floral', name: 'Premium Floral Art', icon: 'filter_vintage', status: 'Active' },
         { id: 'text', name: 'Core Typography', icon: 'text_fields', status: 'Active' },
         { id: 'rsvp', name: 'Interactive RSVP', icon: 'check_circle', status: 'Hidden' },
       ].map(layer => (
         <div key={layer.id} className={`flex items-center justify-between p-4 rounded-2xl border group cursor-pointer hover:translate-x-1 transition-all ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-stone-50/50 border-stone-100 hover:bg-stone-50'}`}>
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-[20px] text-stone-400 group-hover:text-[#C5A059] transition-colors">{layer.icon}</span>
               <div className="flex flex-col">
                 <span className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-stone-700'}`}>{layer.name}</span>
                 <span className="text-[8px] text-stone-400 uppercase font-bold">{layer.status}</span>
               </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-stone-300">{layer.status === 'Hidden' ? 'visibility_off' : 'visibility'}</span>
         </div>
       ))}
    </div>
  );

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'}`}>
      {/* 1. TOP APP BAR */}
      <header className={`h-16 border-b px-4 lg:px-8 flex items-center justify-between z-[100] sticky top-0 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-200'}`}>
        <div className="flex items-center gap-2 lg:gap-8">
          <button onClick={() => setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className={`serif font-black text-lg lg:text-xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-stone-900'} hidden xs:block`}>LuxeInvite</span>
          </button>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className={`px-3 lg:px-6 py-2 border rounded-lg text-[10px] lg:text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span className="hidden sm:block">{t.preview}</span>
          </button>
          <button 
            onClick={() => setIsPublished(true)}
            className="px-3 lg:px-6 py-2 bg-[#C5A059] text-white rounded-lg text-[10px] lg:text-[12px] font-bold uppercase tracking-widest shadow-xl hover:brightness-110 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">publish</span>
            <span className="hidden sm:block">{t.publish}</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT TOOLBAR - ICON ACCESS (Hidden on Mobile) */}
        <aside className={`hidden lg:flex w-16 border-r flex-col items-center py-6 gap-6 z-40 transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100'}`}>
           <button onClick={() => setActiveTab('design')} className={`p-3 rounded-xl transition-all ${activeTab === 'design' ? 'bg-[#C5A059] text-white shadow-lg' : 'text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800'}`}><span className="material-symbols-outlined">palette</span></button>
           <button onClick={() => setActiveTab('content')} className={`p-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-[#C5A059] text-white shadow-lg' : 'text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800'}`}><span className="material-symbols-outlined">edit_note</span></button>
           <button onClick={() => setActiveTab('layers')} className={`p-3 rounded-xl transition-all ${activeTab === 'layers' ? 'bg-[#C5A059] text-white shadow-lg' : 'text-stone-400 hover:bg-stone-50 dark:hover:bg-slate-800'}`}><span className="material-symbols-outlined">layers</span></button>
        </aside>

        <main className="flex-1 relative overflow-hidden flex items-center justify-center p-4 lg:p-12 bg-stone-100/50 dark:bg-slate-950/40">
          {/* FLOATING TOOLBAR */}
          <div className={`absolute bottom-20 lg:bottom-10 left-1/2 -translate-x-1/2 floating-toolbar px-6 py-3 rounded-full shadow-2xl backdrop-blur-xl flex items-center gap-6 z-[100] border ${theme === 'dark' ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-stone-200'}`}>
            <div className="flex items-center gap-4 border-r pr-6 border-stone-200 dark:border-slate-700">
               <button onClick={() => setZoom(z => Math.max(20, z-10))} className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-slate-700 rounded-full transition-colors text-stone-400"><span className="material-symbols-outlined text-[18px]">remove</span></button>
               <span className={`text-[13px] font-black w-12 text-center ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{zoom}%</span>
               <button onClick={() => setZoom(z => Math.min(200, z+10))} className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-slate-700 rounded-full transition-colors text-stone-400"><span className="material-symbols-outlined text-[18px]">add</span></button>
            </div>
            <button onClick={() => setZoom(100)} className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] hover:brightness-110">Reset Zoom</button>
          </div>

          {/* MOBILE PREVIEW FRAME (MOCKUP) */}
          <motion.div 
            style={{ 
              scale: zoom / 100,
              transformOrigin: 'center center'
            }}
            className="relative"
          >
             {/* Phone Outer Shell */}
             <div className="w-[420px] h-[850px] bg-stone-950 rounded-[60px] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[4px] border-stone-800 relative ring-1 ring-white/10">
                {/* Speaker/Camera Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-950 rounded-full z-[100] flex items-center justify-center gap-2 border border-white/5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
                   <div className="w-8 h-1 bg-[#1e293b] rounded-full" />
                </div>

                {/* Internal Screen */}
                <div className="w-full h-full bg-white rounded-[50px] overflow-hidden relative border-2 border-stone-900/50">
                   <div className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth bg-white">
                      {/* Scaling Wrapper: Force the full-page invitation to fit the phone width */}
                      <div className="w-full origin-top" style={{ transform: 'scale(0.75)', width: '133.33%', height: '133.33%' }}>
                        <PremiumInvitation data={data} isEditMode={true} />
                      </div>
                   </div>
                   
                   {/* Bottom Home Indicator */}
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 rounded-full z-50 pointer-events-none" />
                </div>
             </div>

             {/* Side Buttons Mockup */}
             <div className="absolute -left-1.5 top-32 w-1.5 h-14 bg-stone-800 rounded-l-md border-y border-white/5" />
             <div className="absolute -right-1.5 top-44 w-1.5 h-20 bg-stone-800 rounded-r-md border-y border-white/5" />
          </motion.div>
        </main>

        <div className="lg:hidden fixed bottom-6 left-6 right-6 h-16 bg-stone-900 text-white rounded-2xl shadow-2xl z-[80] flex items-center justify-around px-2">
           <button onClick={() => { setActiveTab('design'); setIsDrawerOpen(true); }} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'design' ? 'text-[#C5A059]' : 'text-white/60'}`}>
              <span className="material-symbols-outlined text-[20px]">palette</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Design</span>
           </button>
           <button onClick={() => { setActiveTab('content'); setIsDrawerOpen(true); }} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'content' ? 'text-[#C5A059]' : 'text-white/60'}`}>
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Content</span>
           </button>
           <button onClick={() => { setActiveTab('layers'); setIsDrawerOpen(true); }} className={`flex flex-col items-center gap-1 p-2 ${activeTab === 'layers' ? 'text-[#C5A059]' : 'text-white/60'}`}>
              <span className="material-symbols-outlined text-[20px]">layers</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Layers</span>
           </button>
        </div>

        <AnimatePresence>
          {isDrawerOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDrawerOpen(false)} className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]" />
              <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                exit={{ y: "100%" }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`lg:hidden fixed bottom-0 left-0 right-0 h-[70vh] rounded-t-[40px] z-[120] flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-[#1e293b]' : 'bg-white'}`}
              >
                 <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto my-4" />
                 <div className="flex-1 overflow-y-auto p-8 pb-24">
                    <h2 className="serif text-2xl font-bold mb-8 uppercase tracking-widest text-[#C5A059]">{activeTab}</h2>
                    {activeTab === 'design' && renderDesignTab()}
                    {activeTab === 'content' && renderContentTab()}
                    {activeTab === 'layers' && renderLayersTab()}
                 </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <aside className={`hidden lg:flex w-[350px] border-l flex-col h-full z-40 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100'}`}>
          <div className={`p-6 border-b flex justify-around ${theme === 'dark' ? 'border-slate-800' : 'border-stone-50'}`}>
             <button onClick={() => setActiveTab('design')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'design' ? 'text-[#C5A059] scale-110' : 'text-stone-300'}`}>{t.design}</button>
             <button onClick={() => setActiveTab('content')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'content' ? 'text-[#C5A059] scale-110' : 'text-stone-300'}`}>{t.content}</button>
             <button onClick={() => setActiveTab('layers')} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'layers' ? 'text-[#C5A059] scale-110' : 'text-stone-300'}`}>{t.layers}</button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                {activeTab === 'design' && renderDesignTab()}
                {activeTab === 'content' && renderContentTab()}
                {activeTab === 'layers' && renderLayersTab()}
              </motion.div>
            </AnimatePresence>
          </div>
        </aside>
      </div>

      {/* PUBLISH MODAL */}
      <AnimatePresence>
        {isPublished && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-md w-full p-12 rounded-[40px] text-center shadow-2xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h2 className={`serif text-3xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{t.success}</h2>
              <p className="text-stone-400 text-sm mb-10">{t.link}</p>
              <div className={`p-4 rounded-2xl mb-8 font-mono text-xs break-all ${theme === 'dark' ? 'bg-slate-800 text-[#C5A059]' : 'bg-stone-50 text-stone-600'}`}>
                https://pieterlase06-arch.github.io/Web-Undangan/
              </div>
              <button 
                onClick={() => setIsPublished(false)}
                className="w-full py-4 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIVE PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[200] flex flex-col ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}
          >
            <div className={`h-16 flex items-center justify-between px-6 lg:px-10 border-b sticky top-0 z-[210] ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-stone-100'} backdrop-blur-md`}>
               <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Live Guest View</span>
               <button onClick={() => setIsPreviewOpen(false)} className="bg-stone-900 text-white px-4 lg:px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                 <span className="material-symbols-outlined text-[16px]">close</span>
                 <span>Exit Preview</span>
               </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
               <PremiumInvitation data={data} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
