import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Editor = ({ setView, data, updateData }) => {
  const [activeTab, setActiveTab] = useState('layers');
  const [zoom, setZoom] = useState(100);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#fcf9f6]">
      {/* 1. TOP APP BAR */}
      <header className="h-16 bg-white border-b border-stone-200 px-8 flex items-center justify-between z-50">
        <div className="flex items-center gap-8">
          <button onClick={() => setView('dashboard')} className="text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="serif font-black text-xl tracking-tighter text-stone-900 ml-2">LuxeInvite</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="px-6 py-2 border border-stone-200 rounded-lg text-[12px] font-bold uppercase tracking-widest text-stone-600 hover:bg-stone-50"
          >
            Live Preview
          </button>
          <button className="px-6 py-2 bg-stone-900 text-white rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-xl">Publish Site</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* LEFT SIDEBAR */}
        <aside className="w-[300px] bg-white border-r border-stone-100 flex flex-col h-full z-40">
          <div className="p-6 border-b border-stone-50">
             <h2 className="serif font-bold text-lg">Editor Layers</h2>
          </div>
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {['Background Texture', 'Floral Overlays', 'Marriage Title', 'Couple Names', 'Date & Venue'].map(layer => (
              <div key={layer} className="flex items-center justify-between p-4 rounded-2xl border border-stone-50 hover:bg-stone-50 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px] text-stone-300">layers</span>
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">{layer}</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-stone-300 opacity-0 group-hover:opacity-100">visibility</span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CANVAS */}
        <main className="flex-1 bg-[#fcf9f6] relative overflow-hidden flex items-center justify-center p-12">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 floating-toolbar px-5 py-2 rounded-full shadow-lg flex items-center gap-4 z-30">
            <button onClick={() => setZoom(z => Math.max(50, z-10))} className="p-1 hover:bg-stone-100 rounded-full transition-colors"><span className="material-symbols-outlined text-[16px]">remove</span></button>
            <span className="text-[12px] font-bold w-10 text-center text-stone-900">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z+10))} className="p-1 hover:bg-stone-100 rounded-full transition-colors"><span className="material-symbols-outlined text-[16px]">add</span></button>
          </div>

          <motion.div 
            style={{ scale: zoom / 100 }}
            className="w-full max-w-[450px] aspect-[4/5] bg-white canvas-container rounded-sm relative p-16 flex flex-col items-center justify-center border border-stone-200 shadow-2xl"
          >
             {/* THE ACTUAL DESIGN PREVIEW */}
             <div className="relative z-10 flex flex-col items-center text-center gap-8 w-full group">
               <div className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">The Wedding Celebration of</div>
               <h1 className="serif text-[48px] text-stone-900 leading-[1] relative" style={{ color: data.primaryColor }}>
                 {data.partner1}<br/>
                 <span className="text-[32px] italic mx-4 font-light" style={{ color: data.accentColor }}>&</span><br/>
                 {data.partner2}
               </h1>
               <div className="w-16 h-[1px] bg-stone-200"></div>
               <div className="text-stone-600 space-y-2">
                 <p className="font-bold uppercase tracking-[0.2em] text-[11px]">{new Date(data.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                 <p className="serif text-[20px] text-stone-800">Two Thousand Twenty-Four</p>
                 <p className="italic text-[12px] text-stone-400">at {data.time} in the afternoon</p>
               </div>
               <div className="text-stone-400 text-[13px] serif leading-relaxed">
                 {data.venue}<br/>{data.address}
               </div>
             </div>
             <div className="absolute inset-8 border border-stone-100 pointer-events-none group-hover:border-stone-200 transition-colors"></div>
             {/* Paper Texture Overlay */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none"></div>
          </motion.div>
        </main>

        {/* RIGHT SIDEBAR: Controls */}
        <aside className="w-[350px] bg-white border-l border-stone-100 flex flex-col h-full z-40 overflow-y-auto custom-scrollbar">
          <div className="p-8 space-y-12">
            <section className="space-y-8">
              <h3 className="serif text-2xl text-stone-900">Personalize</h3>
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Partner One</label>
                  <input 
                    className="w-full border-b border-stone-100 py-3 text-xl outline-none focus:border-stone-900 transition-all font-serif" 
                    value={data.partner1} 
                    onChange={(e) => updateData({ partner1: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Partner Two</label>
                  <input 
                    className="w-full border-b border-stone-100 py-3 text-xl outline-none focus:border-stone-900 transition-all font-serif" 
                    value={data.partner2} 
                    onChange={(e) => updateData({ partner2: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Date</label>
                    <input 
                      type="date" 
                      className="w-full border-b border-stone-100 py-2 text-sm focus:border-stone-900 outline-none" 
                      value={data.date} 
                      onChange={(e) => updateData({ date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Time</label>
                    <input 
                      type="time" 
                      className="w-full border-b border-stone-100 py-2 text-sm focus:border-stone-900 outline-none" 
                      value={data.time} 
                      onChange={(e) => updateData({ time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Venue</label>
                  <input 
                    className="w-full border-b border-stone-100 py-3 text-md outline-none focus:border-stone-900 transition-all" 
                    value={data.venue} 
                    onChange={(e) => updateData({ venue: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <hr className="border-stone-50" />

            <section className="space-y-6">
              <h3 className="serif text-xl text-stone-900">Global Aesthetics</h3>
              <div className="space-y-6">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Accent Tone</label>
                   <div className="flex flex-wrap gap-4">
                     {['#D4AF37', '#735c00', '#064E3B', '#0F172A', '#8B5CF6'].map(c => (
                       <button 
                         key={c} 
                         onClick={() => updateData({ accentColor: c })}
                         style={{ backgroundColor: c }} 
                         className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${data.accentColor === c ? 'border-stone-900 scale-110 shadow-lg' : 'border-white'}`} 
                       />
                     ))}
                   </div>
                 </div>
              </div>
            </section>
          </div>
        </aside>
      </div>

      {/* FULL SCREEN PREVIEW MODAL */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            <div className="h-16 flex items-center justify-between px-10 border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Live Guest Preview Mode</span>
               <button onClick={() => setIsPreviewOpen(false)} className="bg-stone-900 text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Exit Preview</button>
            </div>
            
            <div className="flex-1 overflow-y-auto bg-[#fcf9f6] flex flex-col items-center py-24 px-6 paper-texture">
               {/* THE ACTUAL INVITATION PAGE AS GUEST SEES IT */}
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="max-w-[500px] w-full bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-2xl p-16 flex flex-col items-center text-center gap-10 border border-white"
               >
                 <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-stone-300 text-4xl">favorite</span>
                 </div>
                 
                 <div className="space-y-4">
                   <h2 className="text-[12px] font-bold text-stone-400 uppercase tracking-[0.4em]">Save The Date</h2>
                   <h1 className="serif text-[56px] text-stone-900 leading-[1.1]">
                     {data.partner1}<br/>
                     <span className="text-[36px] italic" style={{ color: data.accentColor }}>&</span><br/>
                     {data.partner2}
                   </h1>
                 </div>

                 <div className="w-16 h-px bg-stone-100"></div>

                 <div className="space-y-4">
                   <p className="serif text-2xl text-stone-800">{new Date(data.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                   <p className="text-sm text-stone-500 italic">Starting at {data.time} PM</p>
                 </div>

                 <div className="space-y-2">
                   <p className="font-bold text-stone-900 uppercase tracking-widest text-xs">{data.venue}</p>
                   <p className="text-stone-400 text-sm max-w-xs">{data.address}</p>
                 </div>

                 <div className="pt-10 w-full">
                    <button className="w-full py-5 bg-[#0F172A] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl hover:brightness-110 transition-all">
                      Confirm RSVP Attendance
                    </button>
                    <p className="text-[10px] text-stone-300 mt-6 uppercase tracking-widest">Designed with LuxeInvite</p>
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
