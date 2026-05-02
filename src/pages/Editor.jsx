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
      const res = await fetch(`${config.API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const { url } = await res.json();
        updateData({ [field]: url });
      }
    } catch (err) { console.error(err); }
    finally { setIsUploading(false); }
  };

  const addStory = () => {
    const newStories = [...(data.stories || []), { year: '2024', title: 'Judul Cerita', desc: 'Deskripsi cerita Anda...', icon: 'favorite' }];
    updateData({ stories: newStories });
  };

  const updateStory = (index, field, value) => {
    const newStories = [...data.stories];
    newStories[index][field] = value;
    updateData({ stories: newStories });
  };

  const removeStory = (index) => {
    const newStories = data.stories.filter((_, i) => i !== index);
    updateData({ stories: newStories });
  };

  const renderDesignTab = () => (
    <div className="space-y-10">
       <section className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Background Music</p>
          <select className="w-full p-4 rounded-2xl border border-stone-100 outline-none text-sm" value={data.musicId} onChange={(e) => updateData({ musicId: e.target.value, musicUrl: e.target.value === 'custom' ? data.musicUrl : `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${e.target.selectedIndex + 1}.mp3` })}>
             <option value="romantic">Romantic Piano</option>
             <option value="classic">Royal Classic</option>
             <option value="acoustic">Acoustic Love</option>
             <option value="custom">Custom URL</option>
          </select>
          {data.musicId === 'custom' && (
            <input className="w-full border-b py-2 text-xs outline-none" placeholder="Paste MP3 URL here..." value={data.musicUrl} onChange={(e) => updateData({ musicUrl: e.target.value })} />
          )}
       </section>

       <section className="space-y-6 pt-6 border-t border-stone-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Appearance</p>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold opacity-40 uppercase">Primary Color</label>
                <input type="color" className="w-full h-10 rounded-lg cursor-pointer" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold opacity-40 uppercase">Font Theme</label>
                <select className="w-full p-2 border-b outline-none text-xs" value={data.fontFamily} onChange={(e) => updateData({ fontFamily: e.target.value })}>
                   <option value="'Cinzel', serif">Imperial Luxe</option>
                   <option value="'Playfair Display', serif">Royal Garden</option>
                   <option value="'Montserrat', sans-serif">Modern Chic</option>
                </select>
             </div>
          </div>
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-10">
       <section className="space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Mempelai & Orang Tua</p>
          <div className="space-y-6">
             <div className="space-y-4 p-4 bg-stone-50 rounded-2xl">
                <input className="w-full bg-transparent border-b py-2 text-sm font-bold outline-none" placeholder="Nama Pria" value={data.partner1} onChange={(e) => updateData({ partner1: e.target.value })} />
                <input className="w-full bg-transparent border-b py-2 text-xs outline-none" placeholder="Orang Tua Pria (Bpk. ... & Ibu ...)" value={data.partner1Parents} onChange={(e) => updateData({ partner1Parents: e.target.value })} />
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden flex-shrink-0">
                      {data.groomImage && <img src={data.groomImage} className="w-full h-full object-cover" />}
                   </div>
                   <input type="file" className="text-[10px]" onChange={(e) => handleImageUpload(e.target.files[0], 'groomImage')} />
                </div>
             </div>
             <div className="space-y-4 p-4 bg-stone-50 rounded-2xl">
                <input className="w-full bg-transparent border-b py-2 text-sm font-bold outline-none" placeholder="Nama Wanita" value={data.partner2} onChange={(e) => updateData({ partner2: e.target.value })} />
                <input className="w-full bg-transparent border-b py-2 text-xs outline-none" placeholder="Orang Tua Wanita (Bpk. ... & Ibu ...)" value={data.partner2Parents} onChange={(e) => updateData({ partner2Parents: e.target.value })} />
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden flex-shrink-0">
                      {data.brideImage && <img src={data.brideImage} className="w-full h-full object-cover" />}
                   </div>
                   <input type="file" className="text-[10px]" onChange={(e) => handleImageUpload(e.target.files[0], 'brideImage')} />
                </div>
             </div>
          </div>
       </section>

       <section className="space-y-6 pt-6 border-t border-stone-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Cerita Cinta (Love Story)</p>
          <div className="space-y-4">
             {(data.stories || []).map((s, i) => (
               <div key={i} className="p-4 border border-stone-100 rounded-2xl space-y-3 relative">
                  <button onClick={() => removeStory(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
                     <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                  <input className="w-full bg-transparent border-b py-1 text-[10px] font-black uppercase outline-none" placeholder="Tahun" value={s.year} onChange={(e) => updateStory(i, 'year', e.target.value)} />
                  <input className="w-full bg-transparent border-b py-1 text-sm font-bold outline-none" placeholder="Judul" value={s.title} onChange={(e) => updateStory(i, 'title', e.target.value)} />
                  <textarea className="w-full bg-transparent text-xs outline-none h-20" placeholder="Deskripsi" value={s.desc} onChange={(e) => updateStory(i, 'desc', e.target.value)} />
               </div>
             ))}
             <button onClick={addStory} className="w-full py-3 border-2 border-dashed border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:border-[#C5A059] hover:text-[#C5A059] transition-all">+ Tambah Cerita</button>
          </div>
       </section>

       <section className="space-y-6 pt-6 border-t border-stone-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Quote / Kutipan</p>
          <textarea className="w-full p-4 bg-stone-50 rounded-2xl text-xs outline-none h-32" value={data.quote} onChange={(e) => updateData({ quote: e.target.value })} placeholder="Masukkan kutipan romantis atau ayat suci..." />
       </section>
    </div>
  );

  const renderLayersTab = () => (
    <div className="space-y-4">
       <div className="flex items-center justify-between p-4 rounded-2xl border border-stone-100">
          <div className="flex items-center gap-4">
             <span className="material-symbols-outlined text-stone-400">mail</span>
             <span className="text-[11px] font-black uppercase tracking-widest text-stone-700">Cover Frame</span>
          </div>
          <button onClick={() => setShowCover(!showCover)} className="text-stone-300 hover:text-[#C5A059]">
             <span className="material-symbols-outlined text-[18px]">{showCover ? 'visibility' : 'visibility_off'}</span>
          </button>
       </div>
    </div>
  );

  return (
    <div className={`h-screen flex flex-col overflow-hidden bg-[#fcf9f6]`}>
      <header className="h-16 border-b px-8 flex items-center justify-between z-[100] bg-white border-stone-200">
        <button onClick={() => setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 flex items-center gap-2">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="serif font-black text-xl tracking-tighter text-stone-900">LuxeInvite</span>
        </button>
        
        <div className="hidden md:flex items-center bg-stone-100 rounded-xl p-1 gap-1">
           {[{ id: 'mobile', icon: 'smartphone' }, { id: 'tablet', icon: 'tablet_android' }, { id: 'desktop', icon: 'desktop_windows' }].map(d => (
             <button key={d.id} onClick={() => setDevice(d.id)} className={`p-2 rounded-lg transition-all ${device === d.id ? 'bg-white text-[#C5A059] shadow-sm' : 'text-stone-400'}`}>
                <span className="material-symbols-outlined text-[18px]">{d.icon}</span>
             </button>
           ))}
        </div>

        <div className="flex items-center gap-4">
          {isUploading && <span className="text-[10px] font-bold text-[#C5A059] animate-pulse">UPLOADING...</span>}
          <button onClick={() => setIsPublished(true)} className="px-6 py-2 bg-[#C5A059] text-white rounded-lg text-[12px] font-bold uppercase tracking-widest shadow-xl hover:brightness-110">Publish</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="w-[380px] border-r flex flex-col h-full bg-white border-stone-100">
           <div className="flex border-b">
              {['design', 'content', 'layers'].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'text-stone-400'}`}>{tab}</button>
              ))}
           </div>
           <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {activeTab === 'design' && renderDesignTab()}
              {activeTab === 'content' && renderContentTab()}
              {activeTab === 'layers' && renderLayersTab()}
           </div>
        </aside>

        <main className="flex-1 relative overflow-hidden bg-[#f4f4f5] flex items-center justify-center p-6 md:p-12">
           <motion.div animate={{ width: device === 'mobile' ? '400px' : device === 'tablet' ? '768px' : '100%', height: device === 'desktop' ? '100%' : '85vh', borderRadius: device === 'desktop' ? '0px' : '40px' }} className="bg-white shadow-2xl overflow-hidden relative border-[8px] border-stone-900 transition-all duration-500">
              <div className="w-full h-full overflow-y-auto no-scrollbar">
                 <PremiumInvitation data={data} isEditMode={true} forceShowCover={showCover} onEdit={(s) => setActiveTab('content')} />
              </div>
           </motion.div>
        </main>
      </div>

      {/* PUBLISH MODAL */}
      <AnimatePresence>
         {isPublished && (
           <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full p-12 bg-white rounded-[50px] text-center shadow-2xl">
                 <h2 className="serif text-3xl font-black mb-2 text-stone-900">Live!</h2>
                 <p className="text-stone-400 text-sm mb-8">Undangan Anda telah online.</p>
                 <div className="bg-stone-50 p-4 rounded-2xl mb-8 text-[10px] font-mono break-all text-[#C5A059]">{config.BASE_URL}#/v</div>
                 <button onClick={() => setIsPublished(false)} className="w-full py-4 bg-[#C5A059] text-white rounded-2xl font-black uppercase tracking-widest text-[10px]">Close</button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
