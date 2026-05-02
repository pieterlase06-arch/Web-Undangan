import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PremiumInvitation from '../components/PremiumInvitation';
import config from '../config';

const Editor = ({ data, updateData, setView: setViewProp }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('konten');
  const [isPublished, setIsPublished] = useState(false);
  const [device, setDevice] = useState('mobile'); 
  const [showCover, setShowCover] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  const setView = setViewProp || ((v) => navigate(v));

  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="space-y-6">
       <section className="space-y-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Gaya & Tema</p>
          <div className="p-6 bg-stone-100 rounded-2xl space-y-4 border border-stone-200">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase">Mode Gelap (Dark)</span>
                <button onClick={() => updateData({ isDarkMode: !data.isDarkMode })} className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${data.isDarkMode ? 'bg-[#C5A059]' : 'bg-stone-300'}`}>
                   <motion.div animate={{ x: data.isDarkMode ? 24 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-md" />
                </button>
             </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
             <div className="space-y-2">
                <label className="text-[9px] font-black text-stone-400 uppercase">Warna Aksen</label>
                <div className="flex gap-3">
                   <input type="color" className="w-12 h-12 rounded-xl cursor-pointer border-2 border-white shadow-md" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                   <input className="flex-1 bg-stone-100 rounded-xl px-4 text-xs font-mono text-stone-900 outline-none border border-stone-200" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[9px] font-black text-stone-400 uppercase">Jenis Font</label>
                <select className="w-full p-3 bg-stone-100 rounded-xl outline-none text-xs font-bold text-stone-900 border border-stone-200" value={data.fontFamily} onChange={(e) => updateData({ fontFamily: e.target.value })}>
                   <option value="'Cinzel', serif">Imperial Serif (Cinzel)</option>
                   <option value="'Playfair Display', serif">Classic Serif (Playfair)</option>
                   <option value="'Montserrat', sans-serif">Modern Sans (Montserrat)</option>
                </select>
             </div>
          </div>
       </section>

       <section className="space-y-4 pt-6 border-t border-stone-100">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Musik Latar</p>
          <input className="w-full p-3 bg-stone-100 rounded-xl text-[10px] text-stone-900 outline-none border border-stone-200" placeholder="URL Lagu MP3..." value={data.musicUrl} onChange={(e) => updateData({ musicUrl: e.target.value })} />
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-8 pb-10">
       <section className="space-y-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Informasi Mempelai</p>
          <div className="space-y-4">
             <div className="p-4 bg-stone-50 rounded-2xl space-y-4 border border-stone-100 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-xl bg-white shadow-lg overflow-hidden relative group border border-stone-100">
                      {data.groomImage ? <img src={data.groomImage} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-stone-100 flex items-center justify-center"><span className="material-symbols-outlined text-stone-300">person</span></div>}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                         <span className="material-symbols-outlined text-[18px]">upload</span>
                         <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], 'groomImage')} />
                      </label>
                   </div>
                   <div className="flex-1 space-y-2">
                      <input className="w-full bg-transparent border-b border-stone-200 py-1 text-sm font-black text-stone-900 outline-none focus:border-stone-900" placeholder="Nama Pria" value={data.partner1} onChange={(e) => updateData({ partner1: e.target.value })} />
                      <input className="w-full bg-transparent py-1 text-[10px] text-stone-500 font-bold outline-none" placeholder="Orang Tua Pria" value={data.partner1Parents} onChange={(e) => updateData({ partner1Parents: e.target.value })} />
                   </div>
                </div>
             </div>
             <div className="p-4 bg-stone-50 rounded-2xl space-y-4 border border-stone-100 shadow-sm">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-xl bg-white shadow-lg overflow-hidden relative group border border-stone-100">
                      {data.brideImage ? <img src={data.brideImage} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-stone-100 flex items-center justify-center"><span className="material-symbols-outlined text-stone-300">person</span></div>}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                         <span className="material-symbols-outlined text-[18px]">upload</span>
                         <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], 'brideImage')} />
                      </label>
                   </div>
                   <div className="flex-1 space-y-2">
                      <input className="w-full bg-transparent border-b border-stone-200 py-1 text-sm font-black text-stone-900 outline-none focus:border-stone-900" placeholder="Nama Wanita" value={data.partner2} onChange={(e) => updateData({ partner2: e.target.value })} />
                      <input className="w-full bg-transparent py-1 text-[10px] text-stone-500 font-bold outline-none" placeholder="Orang Tua Wanita" value={data.partner2Parents} onChange={(e) => updateData({ partner2Parents: e.target.value })} />
                   </div>
                </div>
             </div>
          </div>
       </section>

       <section className="space-y-4 pt-6 border-t border-stone-100">
          <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Detail Acara</p>
          <div className="p-6 bg-stone-100/50 rounded-3xl space-y-6 border border-stone-100">
             <div className="space-y-2">
                <label className="text-[9px] font-black text-stone-400 uppercase">Tanggal</label>
                <input type="date" className="w-full p-3 bg-white border border-stone-200 rounded-xl outline-none text-xs font-bold text-stone-900" value={data.date} onChange={(e) => updateData({ date: e.target.value })} />
             </div>
             <div className="space-y-2">
                <label className="text-[9px] font-black text-stone-400 uppercase">Nama Lokasi</label>
                <input className="w-full p-3 bg-white border border-stone-200 rounded-xl outline-none text-xs font-bold text-stone-900" placeholder="Gedung..." value={data.venue} onChange={(e) => updateData({ venue: e.target.value })} />
             </div>
             <div className="space-y-2">
                <label className="text-[9px] font-black text-stone-400 uppercase">Google Maps</label>
                <input className="w-full p-3 bg-white border border-stone-200 rounded-xl outline-none text-[9px] font-mono text-stone-500" placeholder="Link..." value={data.mapsLink} onChange={(e) => updateData({ mapsLink: e.target.value })} />
             </div>
          </div>
       </section>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <header className="h-14 border-b px-6 flex items-center justify-between z-[100] bg-white border-stone-100">
        <div className="flex items-center gap-4">
           <button onClick={() => isSidebarOpen && window.innerWidth < 1024 ? setIsSidebarOpen(false) : setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 flex items-center gap-3 group">
             <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center transition-all">
               <span className="material-symbols-outlined text-[18px]">chevron_left</span>
             </div>
             <span className="serif font-black text-xl tracking-tighter text-stone-900 hidden md:inline">LuxeInvite</span>
           </button>
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 bg-stone-100 rounded-lg text-stone-600">
              <span className="material-symbols-outlined text-[18px]">{isSidebarOpen ? 'close' : 'menu'}</span>
           </button>
        </div>
        
        <div className="hidden md:flex items-center bg-stone-100 rounded-2xl p-1 gap-1">
           {[{ id: 'mobile', icon: 'smartphone', label: 'HP' }, { id: 'tablet', icon: 'tablet_android', label: 'Tab' }, { id: 'desktop', icon: 'desktop_windows', label: 'PC' }].map(d => (
             <button key={d.id} onClick={() => setDevice(d.id)} className={`flex items-center gap-2 p-2 px-4 rounded-xl transition-all ${device === d.id ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400'}`}>
                <span className="material-symbols-outlined text-[16px]">{d.icon}</span>
                <span className="text-[9px] font-black uppercase tracking-widest">{d.label}</span>
             </button>
           ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {isUploading && <div className="flex items-center gap-2 animate-pulse"><div className="w-2 h-2 bg-[#C5A059] rounded-full" /><span className="text-[9px] font-black text-[#C5A059] hidden md:inline">SAVING...</span></div>}
          <button onClick={() => setIsPublished(true)} className="px-4 md:px-6 py-2 bg-stone-950 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#C5A059]">Publish</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside 
              initial={{ x: -400 }} animate={{ x: 0 }} exit={{ x: -400 }}
              className="fixed lg:relative w-full md:w-[360px] border-r flex flex-col h-full bg-white border-stone-50 z-[150] shadow-2xl lg:shadow-none"
            >
               <div className="flex border-b border-stone-100 bg-stone-50/50">
                  {['desain', 'konten', 'lapisan'].map(tab => (
                     <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-[9px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-stone-900' : 'text-stone-300'}`}>
                        {tab}
                        {activeTab === tab && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A059]" />}
                     </button>
                  ))}
               </div>
               <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                  {activeTab === 'desain' && renderDesignTab()}
                  {activeTab === 'konten' && renderContentTab()}
                  {activeTab === 'lapisan' && (
                    <div className="space-y-4">
                       <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-4 shadow-sm">
                          <p className="text-[9px] font-black uppercase tracking-widest text-stone-500">Tampilan</p>
                          <div className="flex items-center justify-between">
                             <span className="text-xs font-bold text-stone-900">Cover Luar</span>
                             <button onClick={() => setShowCover(!showCover)} className={`w-10 h-5 rounded-full flex items-center px-0.5 ${showCover ? 'bg-[#C5A059]' : 'bg-stone-200'}`}>
                                <motion.div animate={{ x: showCover ? 20 : 0 }} className="w-4 h-4 bg-white rounded-full shadow-md" />
                             </button>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1 relative overflow-hidden bg-[#f4f6f8] flex items-center justify-center p-4 md:p-12">
           <motion.div animate={{ width: device === 'mobile' ? '100%' : device === 'tablet' ? '760px' : '100%', maxWidth: device === 'mobile' ? '380px' : 'none', height: device === 'desktop' ? '100%' : '88vh', borderRadius: device === 'desktop' ? '0px' : '40px' }} className="bg-white shadow-2xl overflow-hidden relative border-[10px] border-stone-950 transition-all duration-700">
              <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                 <PremiumInvitation data={data} isEditMode={true} forceShowCover={showCover} onEdit={(s) => { setActiveTab('konten'); setIsSidebarOpen(true); }} />
              </div>
           </motion.div>
        </main>
      </div>

      <AnimatePresence>
         {isPublished && (
           <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-stone-900/80 backdrop-blur-xl">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full p-8 md:p-12 bg-white rounded-[60px] text-center shadow-2xl border border-white">
                 <h2 className="serif text-4xl font-black mb-4 text-stone-900">Publikasi Berhasil!</h2>
                 <p className="text-stone-400 text-xs mb-10">Undangan Anda sudah online dan siap dibagikan.</p>
                 <div className="bg-stone-50 p-6 rounded-3xl mb-10 text-[10px] font-mono break-all text-[#C5A059] flex items-center justify-between border border-stone-100">
                    <span className="truncate mr-4">{config.BASE_URL}#/v</span>
                    <button onClick={() => { navigator.clipboard.writeText(config.BASE_URL+'#/v'); alert('Link Tersalin!'); }} className="material-symbols-outlined text-[18px] shrink-0">content_copy</button>
                 </div>
                 <button onClick={() => setIsPublished(false)} className="w-full py-5 bg-stone-950 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px]">Selesai</button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
