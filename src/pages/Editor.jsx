import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Editor = ({ setView, data, updateData, lang, theme }) => {
  const [zoom, setZoom] = useState(100);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const t = {
    id: { 
      personalize: 'Personalisasi', 
      partner1: 'Pasangan 1', 
      partner2: 'Pasangan 2', 
      date: 'Tanggal', 
      time: 'Waktu', 
      venue: 'Lokasi',
      themes: 'Tema Premium',
      aesthetics: 'Estetika',
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
      aesthetics: 'Aesthetics',
      publish: 'Publish Site',
      preview: 'Live Preview',
      success: 'Published Successfully!',
      link: 'Your invitation link is ready to share.'
    }
  }[lang];

  return (
    <div className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'}`}>
      {/* 1. TOP APP BAR */}
      <header className={`h-16 border-b px-8 flex items-center justify-between z-50 ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-200'}`}>
        <div className="flex items-center gap-8">
          <button onClick={() => setView('dashboard')} className="text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className={`serif font-black text-xl tracking-tighter ml-2 ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>LuxeInvite</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className={`px-6 py-2 border rounded-lg text-[12px] font-bold uppercase tracking-widest transition-all ${theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-stone-200 text-stone-600 hover:bg-stone-50'}`}
          >
            {t.preview}
          </button>
          <button 
            onClick={() => setIsPublished(true)}
            className="px-6 py-2 bg-[#C5A059] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-xl hover:brightness-110"
          >
            {t.publish}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT SIDEBAR - HIDDEN IN PRODUCTION FOR CLEANER UI, BUT KEPT FOR STRUCTURE */}
        <aside className={`w-[300px] border-r flex flex-col h-full z-40 transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100'}`}>
          <div className="p-6 border-b border-stone-50/10">
             <h2 className={`serif font-bold text-lg ${theme === 'dark' ? 'text-white' : ''}`}>Layers</h2>
          </div>
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {['Background', 'Floral Art', 'Typography', 'RSVP Module'].map(layer => (
              <div key={layer} className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer group transition-colors ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-800' : 'border-stone-50 hover:bg-stone-50'}`}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-stone-400">layers</span>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{layer}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CANVAS */}
        <main className="flex-1 relative overflow-hidden flex items-center justify-center p-12">
          <div className={`absolute top-8 left-1/2 -translate-x-1/2 floating-toolbar px-5 py-2 rounded-full shadow-lg backdrop-blur-md flex items-center gap-4 z-30 border ${theme === 'dark' ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-stone-100'}`}>
            <button onClick={() => setZoom(z => Math.max(50, z-10))} className="p-1 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-full transition-colors text-stone-400"><span className="material-symbols-outlined text-[16px]">remove</span></button>
            <span className={`text-[12px] font-bold w-10 text-center ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z+10))} className="p-1 hover:bg-stone-100 dark:hover:bg-slate-700 rounded-full transition-colors text-stone-400"><span className="material-symbols-outlined text-[16px]">add</span></button>
          </div>

          <motion.div 
            style={{ 
              scale: zoom / 100,
              fontFamily: data.fontFamily === 'serif' ? '"Noto Serif", serif' : '"Manrope", sans-serif'
            }}
            className="w-full max-w-[450px] aspect-[4/5] bg-white rounded-sm relative p-16 flex flex-col items-center justify-center border border-stone-200 shadow-2xl overflow-hidden"
          >
             {/* Background Image Layer */}
             <div 
               className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700" 
               style={{ backgroundImage: `url(${data.backgroundImage})` }}
             ></div>
             
             {/* DESIGN CONTENT */}
             <div className="relative z-10 flex flex-col items-center text-center gap-8 w-full">
               <div className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">The Wedding of</div>
               <h1 className="text-[48px] text-stone-900 leading-[1] relative font-serif" style={{ color: data.primaryColor }}>
                 {data.partner1}<br/>
                 <span className="text-[32px] italic mx-4 font-light" style={{ color: data.accentColor }}>&</span><br/>
                 {data.partner2}
               </h1>
               <div className="w-16 h-[1px] bg-stone-200"></div>
               <div className="text-stone-600 space-y-2">
                 <p className="font-bold uppercase tracking-[0.2em] text-[11px]">{new Date(data.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                 <p className="text-[20px] text-stone-800">Two Thousand Twenty-Four</p>
               </div>
               <div className="text-stone-400 text-[13px] leading-relaxed">
                 {data.venue}<br/>{data.address}
               </div>
             </div>

             <div className="absolute inset-8 border border-stone-100 pointer-events-none z-20"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none z-30"></div>
          </motion.div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className={`w-[350px] border-l flex flex-col h-full z-40 overflow-y-auto custom-scrollbar transition-colors ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100'}`}>
          <div className="p-8 space-y-12">
            <section className="space-y-8">
              <h3 className={`serif text-2xl ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>{t.personalize}</h3>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.partner1}</label>
                  <input 
                    className={`w-full border-b py-3 text-xl outline-none transition-all font-serif ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white focus:border-[#C5A059]' : 'bg-transparent border-stone-100 text-stone-900 focus:border-stone-900'}`} 
                    value={data.partner1} 
                    onChange={(e) => updateData({ partner1: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.partner2}</label>
                  <input 
                    className={`w-full border-b py-3 text-xl outline-none transition-all font-serif ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white focus:border-[#C5A059]' : 'bg-transparent border-stone-100 text-stone-900 focus:border-stone-900'}`} 
                    value={data.partner2} 
                    onChange={(e) => updateData({ partner2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.date}</label>
                    <input 
                      type="date" 
                      className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} 
                      value={data.date} 
                      onChange={(e) => updateData({ date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">{t.time}</label>
                    <input 
                      type="time" 
                      className={`w-full border-b py-2 text-sm outline-none ${theme === 'dark' ? 'bg-transparent border-slate-700 text-white' : 'bg-transparent border-stone-100 text-stone-900'}`} 
                      value={data.time} 
                      onChange={(e) => updateData({ time: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
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
                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${data.themeId === themeItem.id ? 'border-[#C5A059] scale-105 shadow-xl' : 'border-transparent hover:border-stone-200'}`}
                  >
                    <img src={themeItem.img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>
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
                Close Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex flex-col ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}`}
          >
            <div className={`h-16 flex items-center justify-between px-10 border-b sticky top-0 z-50 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-stone-100'} backdrop-blur-md`}>
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Live Guest View</span>
               <button onClick={() => setIsPreviewOpen(false)} className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Exit</button>
            </div>
            
            <div className={`flex-1 overflow-y-auto flex flex-col items-center py-24 px-6 ${theme === 'dark' ? 'bg-slate-950' : 'bg-[#fcf9f6]'}`}>
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="max-w-[500px] w-full bg-white shadow-2xl rounded-2xl p-16 flex flex-col items-center text-center gap-10"
               >
                 {/* Preview content simplified for demo */}
                 <h1 className="serif text-[56px] text-stone-900 leading-tight">
                   {data.partner1}<br/><span className="text-[32px] italic text-[#C5A059]">&</span><br/>{data.partner2}
                 </h1>
                 <p className="serif text-xl text-stone-600">{new Date(data.date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                 <div className="pt-10 w-full">
                    <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-2xl">Confirm RSVP</button>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
