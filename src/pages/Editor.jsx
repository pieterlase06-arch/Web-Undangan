import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumInvitation from '../components/PremiumInvitation';
import config from '../config';

const Editor = ({ data, updateData, theme, setView }) => {
  const [activeTab, setActiveTab] = useState('design');
  const [isPublished, setIsPublished] = useState(false);
  const [device, setDevice] = useState('mobile'); 
  const [showCover, setShowCover] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file, field) => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${config.API_URL}/upload`, { method: 'POST', body: formData });
      if (res.ok) {
        const { url } = await res.json();
        updateData({ [field]: url });
      }
    } catch (err) { console.error(err); }
    finally { setIsUploading(false); }
  };

  const addStory = () => {
    const newStories = [...(data.stories || []), { year: '2024', title: 'Moment Baru', desc: 'Deskripsi moment...', icon: 'favorite' }];
    updateData({ stories: newStories });
  };

  const addBank = () => {
    const newBanks = [...(data.bankAccounts || []), { bank: 'BCA', number: '', owner: '' }];
    updateData({ bankAccounts: newBanks });
  };

  const updateBank = (index, field, value) => {
    const newBanks = [...data.bankAccounts];
    newBanks[index][field] = value;
    updateData({ bankAccounts: newBanks });
  };

  const renderDesignTab = () => (
    <div className="space-y-10">
       <section className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Design Tokens</p>
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-3">
                <label className="text-[10px] font-black opacity-30 uppercase">Primary Branding Color</label>
                <div className="flex gap-4">
                   <input type="color" className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-lg" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                   <input className="flex-1 bg-stone-50 rounded-2xl px-6 text-sm font-mono outline-none" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                </div>
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black opacity-30 uppercase">Typography Style</label>
                <select className="w-full p-4 bg-stone-50 rounded-2xl outline-none text-sm font-bold" value={data.fontFamily} onChange={(e) => updateData({ fontFamily: e.target.value })}>
                   <option value="'Cinzel', serif">Imperial Serif (Cinzel)</option>
                   <option value="'Playfair Display', serif">Classic Serif (Playfair)</option>
                   <option value="'Montserrat', sans-serif">Modern Sans (Montserrat)</option>
                </select>
             </div>
          </div>
       </section>

       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Audio Experience</p>
          <input className="w-full p-4 bg-stone-50 rounded-2xl text-xs outline-none" placeholder="Background Music MP3 URL..." value={data.musicUrl} onChange={(e) => updateData({ musicUrl: e.target.value })} />
          <p className="text-[9px] opacity-40 italic px-4">Pastikan URL berakhir dengan .mp3 agar dapat diputar otomatis.</p>
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-12 pb-20">
       <section className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Mempelai Pria & Wanita</p>
          <div className="space-y-8">
             {/* PRIA */}
             <div className="p-8 bg-stone-50 rounded-[40px] space-y-6 border border-stone-100">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-3xl bg-white shadow-xl overflow-hidden relative group">
                      {data.groomImage && <img src={data.groomImage} className="w-full h-full object-cover" />}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                         <span className="material-symbols-outlined">upload</span>
                         <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], 'groomImage')} />
                      </label>
                   </div>
                   <div className="flex-1">
                      <input className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-xl font-black outline-none focus:border-stone-900" placeholder="Nama Pria" value={data.partner1} onChange={(e) => updateData({ partner1: e.target.value })} />
                      <input className="w-full bg-transparent py-2 text-xs opacity-50 outline-none" placeholder="Putra dari Bpk. ... & Ibu ..." value={data.partner1Parents} onChange={(e) => updateData({ partner1Parents: e.target.value })} />
                   </div>
                </div>
             </div>
             {/* WANITA */}
             <div className="p-8 bg-stone-50 rounded-[40px] space-y-6 border border-stone-100">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 rounded-3xl bg-white shadow-xl overflow-hidden relative group">
                      {data.brideImage && <img src={data.brideImage} className="w-full h-full object-cover" />}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                         <span className="material-symbols-outlined">upload</span>
                         <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], 'brideImage')} />
                      </label>
                   </div>
                   <div className="flex-1">
                      <input className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-xl font-black outline-none focus:border-stone-900" placeholder="Nama Wanita" value={data.partner2} onChange={(e) => updateData({ partner2: e.target.value })} />
                      <input className="w-full bg-transparent py-2 text-xs opacity-50 outline-none" placeholder="Putri dari Bpk. ... & Ibu ..." value={data.partner2Parents} onChange={(e) => updateData({ partner2Parents: e.target.value })} />
                   </div>
                </div>
             </div>
          </div>
       </section>

       <section className="space-y-6 pt-10 border-t border-stone-100">
          <div className="flex items-center justify-between">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Love Journey</p>
             <button onClick={addStory} className="text-[10px] font-black text-[#C5A059]">+ TAMBAH</button>
          </div>
          <div className="space-y-4">
             {(data.stories || []).map((s, i) => (
               <div key={i} className="p-6 bg-white border border-stone-100 rounded-3xl space-y-4 shadow-sm relative group">
                  <button onClick={() => updateData({ stories: data.stories.filter((_, idx) => idx !== i) })} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400">
                     <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                     <input className="bg-stone-50 p-2 rounded-xl text-[10px] font-black outline-none" placeholder="Tahun" value={s.year} onChange={(e) => { const st = [...data.stories]; st[i].year = e.target.value; updateData({ stories: st }); }} />
                     <input className="bg-stone-50 p-2 rounded-xl text-[10px] font-black outline-none" placeholder="Icon (ID)" value={s.icon} onChange={(e) => { const st = [...data.stories]; st[i].icon = e.target.value; updateData({ stories: st }); }} />
                  </div>
                  <input className="w-full bg-transparent border-b py-1 text-sm font-bold outline-none" placeholder="Judul Moment" value={s.title} onChange={(e) => { const st = [...data.stories]; st[i].title = e.target.value; updateData({ stories: st }); }} />
                  <textarea className="w-full bg-transparent text-xs outline-none h-20" placeholder="Ceritakan moment ini..." value={s.desc} onChange={(e) => { const st = [...data.stories]; st[i].desc = e.target.value; updateData({ stories: st }); }} />
               </div>
             ))}
          </div>
       </section>

       <section className="space-y-6 pt-10 border-t border-stone-100">
          <div className="flex items-center justify-between">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Digital Gift (Rekening)</p>
             <button onClick={addBank} className="text-[10px] font-black text-[#C5A059]">+ TAMBAH</button>
          </div>
          <div className="space-y-4">
             {(data.bankAccounts || []).map((b, i) => (
               <div key={i} className="p-6 bg-stone-50 rounded-3xl space-y-3 relative group border border-stone-100">
                  <button onClick={() => updateData({ bankAccounts: data.bankAccounts.filter((_, idx) => idx !== i) })} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-red-400">
                     <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <input className="w-full bg-transparent border-b py-1 text-[10px] font-black outline-none" placeholder="Nama Bank (e.g. BCA)" value={b.bank} onChange={(e) => updateBank(i, 'bank', e.target.value)} />
                  <input className="w-full bg-transparent border-b py-1 text-sm font-bold outline-none" placeholder="Nomor Rekening" value={b.number} onChange={(e) => updateBank(i, 'number', e.target.value)} />
                  <input className="w-full bg-transparent py-1 text-xs opacity-50 outline-none" placeholder="Atas Nama" value={b.owner} onChange={(e) => updateBank(i, 'owner', e.target.value)} />
               </div>
             ))}
          </div>
       </section>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <header className="h-16 border-b px-8 flex items-center justify-between z-[100] bg-white border-stone-100">
        <button onClick={() => setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="serif font-black text-xl tracking-tighter text-stone-900">LuxeInvite</span>
        </button>
        
        <div className="hidden md:flex items-center bg-stone-50 rounded-2xl p-1 gap-1">
           {[{ id: 'mobile', icon: 'smartphone' }, { id: 'tablet', icon: 'tablet_android' }, { id: 'desktop', icon: 'desktop_windows' }].map(d => (
             <button key={d.id} onClick={() => setDevice(d.id)} className={`p-2 px-4 rounded-xl transition-all ${device === d.id ? 'bg-white text-[#C5A059] shadow-sm' : 'text-stone-400'}`}>
                <span className="material-symbols-outlined text-[18px]">{d.icon}</span>
             </button>
           ))}
        </div>

        <div className="flex items-center gap-6">
          {isUploading && <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#C5A059] rounded-full animate-ping" /><span className="text-[10px] font-black text-[#C5A059]">UPLOADING...</span></div>}
          <button onClick={() => setIsPublished(true)} className="px-8 py-2 bg-[#C5A059] text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:brightness-110">Publish</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="w-[420px] border-r flex flex-col h-full bg-white border-stone-50">
           <div className="flex border-b border-stone-50">
              {['design', 'content', 'layers'].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-5 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'text-stone-300'}`}>{tab}</button>
              ))}
           </div>
           <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              {activeTab === 'design' && renderDesignTab()}
              {activeTab === 'content' && renderContentTab()}
              {activeTab === 'layers' && (
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-6 rounded-3xl bg-stone-50 border border-stone-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Cover Animation</span>
                      <button onClick={() => setShowCover(!showCover)} className="text-[#C5A059]">
                         <span className="material-symbols-outlined">{showCover ? 'visibility' : 'visibility_off'}</span>
                      </button>
                   </div>
                </div>
              )}
           </div>
        </aside>

        <main className="flex-1 relative overflow-hidden bg-[#f8f9fa] flex items-center justify-center p-8 lg:p-12">
           <motion.div animate={{ width: device === 'mobile' ? '420px' : device === 'tablet' ? '820px' : '100%', height: device === 'desktop' ? '100%' : '88vh', borderRadius: device === 'desktop' ? '0px' : '60px' }} className="bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative border-[10px] border-stone-900 transition-all duration-700 ease-in-out">
              <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                 <PremiumInvitation data={data} isEditMode={true} forceShowCover={showCover} onEdit={(s) => setActiveTab('content')} />
              </div>
           </motion.div>
        </main>
      </div>

      <AnimatePresence>
         {isPublished && (
           <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full p-16 bg-white rounded-[60px] text-center shadow-2xl border border-white">
                 <h2 className="serif text-4xl font-black mb-4 text-stone-900">It's Live!</h2>
                 <p className="text-stone-400 text-sm mb-10">Undangan mewah Anda telah resmi dipublikasikan.</p>
                 <div className="bg-stone-50 p-6 rounded-3xl mb-10 text-[11px] font-mono break-all text-[#C5A059] border border-stone-100">{config.BASE_URL}#/v</div>
                 <button onClick={() => setIsPublished(false)} className="w-full py-5 bg-stone-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#C5A059] transition-colors">Selesai</button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
