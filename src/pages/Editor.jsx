import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumInvitation from '../components/PremiumInvitation';
import config from '../config';

const Editor = ({ data, updateData, theme, setView }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [isPublished, setIsPublished] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showCover, setShowCover] = useState(true);

  // Localization / UI Text
  const t = {
    design: 'Desain',
    content: 'Konten',
    layers: 'Lapisan',
    publish: 'Publikasi',
    preview: 'Pratinjau',
    success: 'Published!',
    link: 'Undangan Anda sudah online. Bagikan link ini ke tamu Anda:'
  };

  const renderDesignTab = () => (
    <div className="space-y-10">
       {/* MUSIC SELECTOR */}
       <section className="space-y-6">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Background Music</p>
          <div className="space-y-4">
             <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'romantic', name: 'Romantic Piano', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                  { id: 'classic', name: 'Royal Classic', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
                  { id: 'acoustic', name: 'Acoustic Love', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
                ].map(m => (
                  <button 
                    key={m.id}
                    onClick={() => updateData({ musicId: m.id, musicUrl: m.url })}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${data.musicId === m.id ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]' : 'border-stone-100 dark:border-slate-800 hover:bg-stone-50'}`}
                  >
                     <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">{data.musicId === m.id ? 'pause_circle' : 'play_circle'}</span>
                        <span className="text-[11px] font-bold uppercase tracking-widest">{m.name}</span>
                     </div>
                     {data.musicId === m.id && <span className="material-symbols-outlined text-[18px]">check_circle</span>}
                  </button>
                ))}
             </div>
             <div className="pt-2">
                <input 
                  type="file" 
                  id="music-upload" 
                  className="hidden" 
                  accept="audio/*" 
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
       <section className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
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
       <section className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Premium Typography</p>
          <div className="space-y-3">
             {[
               { name: 'Imperial Luxe', body: "'Cinzel', serif", title: "'Pinyon Script', cursive" },
               { name: 'Royal Garden', body: "'Playfair Display', serif", title: "'Great Vibes', cursive" },
               { name: 'Modern Chic', body: "'Montserrat', sans-serif", title: "'Alex Brush', cursive" },
               { name: 'Classic Serif', body: "'Cormorant Garamond', serif", title: "'Dancing Script', cursive" },
               { name: 'Islamic Elegant', body: "'Lora', serif", title: "'Satisfy', cursive" },
               { name: 'Minimalist', body: "'Inter', sans-serif", title: "'Prata', serif" }
             ].map((font, i) => (
               <button 
                key={i} 
                onClick={() => updateData({ fontFamily: font.body, titleFont: font.title })}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${data.fontFamily === font.body ? 'bg-[#C5A059]/10 border-[#C5A059]' : 'border-stone-100 dark:border-slate-800 hover:bg-stone-50'}`}
               >
                  <div className="space-y-1">
                     <p className={`text-[10px] font-black uppercase tracking-widest ${data.fontFamily === font.body ? 'text-[#C5A059]' : 'text-stone-400'}`}>{font.name}</p>
                     <p className="text-sm font-bold" style={{ fontFamily: font.body }}>Body Font</p>
                     <p className="text-xl italic" style={{ fontFamily: font.title }}>Title Style</p>
                  </div>
                  {data.fontFamily === font.body && <span className="material-symbols-outlined text-[#C5A059]">check_circle</span>}
               </button>
             ))}
          </div>
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-10">
       {/* BASIC INFO */}
       <section id="basic-section" className="space-y-6">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Core Details</p>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Mempelai Pria</label>
                  <input className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.partner1} onChange={(e) => updateData({ partner1: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Mempelai Wanita</label>
                  <input className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.partner2} onChange={(e) => updateData({ partner2: e.target.value })} />
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Tanggal Acara</label>
                  <input type="date" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.date} onChange={(e) => updateData({ date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Jam Mulai</label>
                  <input type="time" className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} value={data.time} onChange={(e) => updateData({ time: e.target.value })} />
                </div>
             </div>
          </div>
       </section>

       {/* MEDIA UPLOAD */}
       <section className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Photos & Media</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Foto Pria</label>
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 group shadow-sm">
                   <img src={data.groomImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                   <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <span className="material-symbols-outlined text-white text-2xl">upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                         const file = e.target.files[0];
                         if (file) updateData({ groomImage: URL.createObjectURL(file) });
                      }} />
                   </label>
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Foto Wanita</label>
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 group shadow-sm">
                   <img src={data.brideImage || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'} className="w-full h-full object-cover" />
                   <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                      <span className="material-symbols-outlined text-white text-2xl">upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                         const file = e.target.files[0];
                         if (file) updateData({ brideImage: URL.createObjectURL(file) });
                      }} />
                   </label>
                </div>
             </div>
          </div>
       </section>

       {/* QUOTE & GIFT */}
       <section className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Kado Digital & Kutipan</p>
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Kutipan Undangan</label>
                <textarea rows="3" className={`w-full border p-4 rounded-2xl text-xs outline-none transition-all ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 text-white' : 'bg-stone-50 border-stone-100 text-stone-900'}`} value={data.quote} onChange={(e) => updateData({ quote: e.target.value })} />
             </div>
             <div className="grid grid-cols-1 gap-4">
                <input placeholder="Bank (BCA/Mandiri)" className={`w-full border-b py-2 text-sm outline-none bg-transparent ${theme === 'dark' ? 'border-slate-700 text-white' : 'border-stone-100 text-stone-900'}`} value={data.bankName1} onChange={(e) => updateData({ bankName1: e.target.value })} />
                <input placeholder="No. Rekening" className={`w-full border-b py-2 text-sm outline-none bg-transparent ${theme === 'dark' ? 'border-slate-700 text-white' : 'border-stone-100 text-stone-900'}`} value={data.bankAccount1} onChange={(e) => updateData({ bankAccount1: e.target.value })} />
                <input placeholder="Atas Nama" className={`w-full border-b py-2 text-sm outline-none bg-transparent ${theme === 'dark' ? 'border-slate-700 text-white' : 'border-stone-100 text-stone-900'}`} value={data.bankOwner1} onChange={(e) => updateData({ bankOwner1: e.target.value })} />
             </div>
          </div>
       </section>

       {/* TOGGLES */}
       <section className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-stone-400'}`}>Tampilkan Fitur</p>
          <div className="grid grid-cols-2 gap-3">
             {[
               { id: 'showGift', name: 'Kado', icon: 'payments' },
               { id: 'showGallery', name: 'Galeri', icon: 'image' },
               { id: 'showStory', name: 'Cerita', icon: 'history_edu' },
               { id: 'showRSVP', name: 'RSVP', icon: 'mail' }
             ].map(s => (
               <button 
                key={s.id}
                onClick={() => updateData({ [s.id]: !data[s.id] })}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${data[s.id] !== false ? 'bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]' : 'border-stone-100 dark:border-slate-800 text-stone-400'}`}
               >
                  <span className="material-symbols-outlined">{s.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{s.name}</span>
               </button>
             ))}
          </div>
       </section>
    </div>
  );

  const renderLayersTab = () => (
    <div className="space-y-4">
       {[
         { id: 'cover', name: 'Cover Frame', icon: 'mail', status: showCover ? 'Active' : 'Hidden', toggle: () => setShowCover(!showCover) },
         { id: 'bg', name: 'Luxury Backdrop', icon: 'image', status: 'Active', toggle: () => { setActiveTab('design'); }, canUpload: true },
         { id: 'timeline', name: 'Love Story Line', icon: 'history_edu', status: data.showStory !== false ? 'Active' : 'Disabled' },
         { id: 'gallery', name: 'Photo Grid', icon: 'grid_view', status: data.showGallery !== false ? 'Active' : 'Disabled' }
       ].map(layer => (
         <div key={layer.id} className={`flex items-center justify-between p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-stone-50/50 border-stone-100'}`}>
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-stone-400">{layer.icon}</span>
               <div className="flex flex-col">
                 <span className={`text-[11px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-stone-700'}`}>{layer.name}</span>
                 <span className="text-[8px] text-stone-400 font-bold uppercase">{layer.status}</span>
               </div>
            </div>
            {layer.toggle && (
               <button onClick={layer.toggle} className="text-stone-300 hover:text-[#C5A059] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">{layer.status === 'Hidden' ? 'visibility_off' : 'visibility'}</span>
               </button>
            )}
         </div>
       ))}
    </div>
  );

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'}`}>
      <header className={`h-16 border-b px-8 flex items-center justify-between z-[100] sticky top-0 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-200'}`}>
        <button onClick={() => setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className={`serif font-black text-xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>LuxeInvite</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsPreviewOpen(true)} className={`px-6 py-2 border rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
            <span className="material-symbols-outlined text-[18px]">visibility</span> {t.preview}
          </button>
          <button onClick={() => setIsPublished(true)} className="px-6 py-2 bg-[#C5A059] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-xl hover:brightness-110 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">publish</span> {t.publish}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className={`w-[350px] border-r flex flex-col h-full z-40 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100'}`}>
           <div className="flex border-b">
              {['design', 'content', 'layers'].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'text-stone-400 hover:bg-stone-50'}`}>
                    {tab}
                 </button>
              ))}
           </div>
           <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {activeTab === 'design' && renderDesignTab()}
              {activeTab === 'content' && renderContentTab()}
              {activeTab === 'layers' && renderLayersTab()}
           </div>
        </aside>

        <main className={`flex-1 relative overflow-y-auto ${theme === 'dark' ? 'bg-[#0b1120]' : 'bg-[#f4f4f5]'}`}>
           {/* FULL CANVAS VIEW */}
           <div className="w-full min-h-full bg-white shadow-inner">
              <PremiumInvitation 
                 data={data} 
                 isEditMode={true} 
                 forceShowCover={showCover} 
                 onEdit={(s) => setActiveTab('content')}
              />
           </div>
        </main>
      </div>

      {/* PUBLISH MODAL */}
      <AnimatePresence>
         {isPublished && (
           <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full p-12 bg-white rounded-[50px] text-center shadow-2xl border border-stone-100">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                 </div>
                 <h2 className="serif text-3xl font-black mb-2 text-stone-900">Success!</h2>
                 <p className="text-stone-400 text-sm mb-8">Undangan premium Anda telah online.</p>
                 <div className="bg-stone-50 p-4 rounded-2xl mb-8 text-[10px] font-mono break-all text-[#C5A059] border border-stone-100">{config.BASE_URL}#/v</div>
                 <div className="space-y-3">
                    <button onClick={() => window.open(config.BASE_URL+'#/v', '_blank')} className="w-full py-4 bg-[#C5A059] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:brightness-110">Open Live Version</button>
                    <button onClick={() => setIsPublished(false)} className="w-full py-4 bg-stone-100 text-stone-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-stone-200">Close</button>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
