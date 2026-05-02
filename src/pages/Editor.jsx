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
              </button>
            ))}
          </div>
       </section>
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
    <div className="space-y-10">
       <div className="space-y-8">
         {/* TEXT CONTENT */}
         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Basic Information</h4>
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

         {/* MEDIA SECTION */}
         <div className="space-y-6 pt-6 border-t border-stone-100 dark:border-slate-800">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">Media & Photos</h4>
            
            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Photo Mempelai</p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                     <p className="text-[9px] font-bold opacity-40 uppercase">Pria</p>
                     <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 group">
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
                     <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-stone-100 dark:border-slate-700 group">
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

            <div className="space-y-4">
               <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Premium Presets</p>
               <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    'https://images.unsplash.com/photo-1519741497674-611481863552',
                    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc',
                    'https://images.unsplash.com/photo-1519225421980-715cb0215aed',
                    'https://images.unsplash.com/photo-1522673607200-164883eeca48'
                  ].map((url, i) => (
                    <button 
                      key={i} 
                      onClick={() => updateData({ backgroundImage: `${url}?auto=format&fit=crop&w=1200&q=80` })}
                      className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-[#C5A059] transition-all"
                    >
                      <img src={`${url}?auto=format&fit=crop&w=100&q=80`} className="w-full h-full object-cover" />
                    </button>
                  ))}
               </div>
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

        <main className="flex-1 relative overflow-hidden flex items-center justify-center p-4 lg:p-12 bg-stone-50/50 dark:bg-slate-950/20">
          <div className={`absolute bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 floating-toolbar px-5 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-4 z-30 border ${theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-stone-100'}`}>
            <button onClick={() => setZoom(z => Math.max(20, z-10))} className="p-1 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-full transition-colors text-stone-400"><span className="material-symbols-outlined text-[16px]">remove</span></button>
            <span className={`text-[12px] font-bold w-10 text-center ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z+10))} className="p-1 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-full transition-colors text-stone-400"><span className="material-symbols-outlined text-[16px]">add</span></button>
          </div>

          <motion.div 
            style={{ 
              scale: zoom / 100,
              fontFamily: data.fontFamily === 'serif' ? '"Noto Serif", serif' : '"Manrope", sans-serif'
            }}
            className="w-full max-w-[450px] aspect-[4/5] bg-white rounded-sm relative p-8 lg:p-16 flex flex-col items-center justify-center border border-stone-200 shadow-2xl overflow-hidden"
          >
             <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700" style={{ backgroundImage: `url(${data.backgroundImage})` }}></div>
             <div className="relative z-10 flex flex-col items-center text-center gap-4 lg:gap-8 w-full">
               <div className="text-stone-400 text-[8px] lg:text-[10px] uppercase tracking-[0.4em] font-bold">The Wedding of</div>
               <h1 className="text-[32px] lg:text-[48px] text-stone-900 leading-[1] relative font-serif" style={{ color: data.primaryColor }}>
                 {data.partner1}<br/><span className="text-[20px] lg:text-[32px] italic mx-4 font-light" style={{ color: data.accentColor }}>&</span><br/>{data.partner2}
               </h1>
               <div className="w-12 lg:w-16 h-[1px] bg-stone-200"></div>
               <div className="text-stone-600 space-y-1 lg:space-y-2">
                 <p className="font-bold uppercase tracking-[0.2em] text-[9px] lg:text-[11px]">{new Date(data.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                 <p className="text-[14px] lg:text-[20px] text-stone-800">Two Thousand Twenty-Four</p>
               </div>
               <div className="text-stone-400 text-[10px] lg:text-[13px] leading-relaxed italic">{data.venue}<br/>{data.address}</div>
             </div>
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
