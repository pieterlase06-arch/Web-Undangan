import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumInvitation from '../components/PremiumInvitation';
import config from '../config';

const Editor = ({ data, updateData, setView }) => {
  const [activeTab, setActiveTab] = useState('konten');
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
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Gaya & Warna</p>
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-3">
                <label className="text-[10px] font-black opacity-30 uppercase">Warna Utama</label>
                <div className="flex gap-4">
                   <input type="color" className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-lg" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                   <input className="flex-1 bg-stone-50 rounded-2xl px-6 text-sm font-mono outline-none" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                </div>
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black opacity-30 uppercase">Jenis Font</label>
                <select className="w-full p-4 bg-stone-50 rounded-2xl outline-none text-sm font-bold" value={data.fontFamily} onChange={(e) => updateData({ fontFamily: e.target.value })}>
                   <option value="'Cinzel', serif">Imperial Serif (Cinzel)</option>
                   <option value="'Playfair Display', serif">Classic Serif (Playfair)</option>
                   <option value="'Montserrat', sans-serif">Modern Sans (Montserrat)</option>
                </select>
             </div>
          </div>
       </section>

       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Musik Latar</p>
          <input className="w-full p-4 bg-stone-50 rounded-2xl text-xs outline-none" placeholder="URL Lagu MP3..." value={data.musicUrl} onChange={(e) => updateData({ musicUrl: e.target.value })} />
          <p className="text-[9px] opacity-40 italic px-4">Gunakan link langsung (.mp3) agar musik bisa diputar otomatis.</p>
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-12 pb-20">
       {/* 1. MEMPELAI */}
       <section className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Informasi Mempelai</p>
          <div className="space-y-8">
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
                      <input className="w-full bg-transparent py-2 text-xs opacity-50 outline-none" placeholder="Nama Orang Tua Pria" value={data.partner1Parents} onChange={(e) => updateData({ partner1Parents: e.target.value })} />
                   </div>
                </div>
             </div>
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
                      <input className="w-full bg-transparent py-2 text-xs opacity-50 outline-none" placeholder="Nama Orang Tua Wanita" value={data.partner2Parents} onChange={(e) => updateData({ partner2Parents: e.target.value })} />
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* 2. ACARA (MISSING BEFORE) */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Detail Acara</p>
          <div className="p-8 bg-stone-50 rounded-[40px] space-y-6 border border-stone-100">
             <div className="space-y-4">
                <label className="text-[10px] font-black opacity-30 uppercase">Tanggal & Waktu</label>
                <div className="grid grid-cols-2 gap-4">
                   <input type="date" className="w-full p-4 bg-white rounded-2xl outline-none text-sm font-bold" value={data.date} onChange={(e) => updateData({ date: e.target.value })} />
                   <input type="text" className="w-full p-4 bg-white rounded-2xl outline-none text-sm font-bold" placeholder="08:00 WIB" value={data.time} onChange={(e) => updateData({ time: e.target.value })} />
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black opacity-30 uppercase">Nama Lokasi / Gedung</label>
                <input className="w-full p-4 bg-white rounded-2xl outline-none text-sm font-bold" placeholder="Gedung Serbaguna..." value={data.venue} onChange={(e) => updateData({ venue: e.target.value })} />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black opacity-30 uppercase">Alamat Lengkap</label>
                <textarea className="w-full p-4 bg-white rounded-2xl outline-none text-sm font-bold h-24" placeholder="Jl. Raya Utama No. 123..." value={data.address} onChange={(e) => updateData({ address: e.target.value })} />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black opacity-30 uppercase">Link Google Maps</label>
                <input className="w-full p-4 bg-white rounded-2xl outline-none text-xs font-mono" placeholder="https://maps.google.com/..." value={data.mapsLink} onChange={(e) => updateData({ mapsLink: e.target.value })} />
             </div>
          </div>
       </section>

       {/* 3. QUOTES */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Kutipan / Doa</p>
          <textarea className="w-full p-8 bg-stone-50 rounded-[40px] outline-none text-sm italic leading-relaxed border border-stone-100 h-40" placeholder="Dan di antara tanda-tanda kekuasaan-Nya..." value={data.quote} onChange={(e) => updateData({ quote: e.target.value })} />
       </section>

       {/* 4. STORIES */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <div className="flex items-center justify-between">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Cerita Cinta</p>
             <button onClick={addStory} className="text-[10px] font-black text-[#C5A059] hover:underline">+ TAMBAH</button>
          </div>
          <div className="space-y-4">
             {(data.stories || []).map((s, i) => (
               <div key={i} className="p-8 bg-white border border-stone-100 rounded-[40px] space-y-4 shadow-xl relative group transition-all hover:border-[#C5A059]">
                  <button onClick={() => updateData({ stories: data.stories.filter((_, idx) => idx !== i) })} className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-red-400 transition-opacity">
                     <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                     <input className="bg-stone-50 p-3 rounded-2xl text-[10px] font-black outline-none" placeholder="Tahun" value={s.year} onChange={(e) => { const st = [...data.stories]; st[i].year = e.target.value; updateData({ stories: st }); }} />
                     <input className="bg-stone-50 p-3 rounded-2xl text-[10px] font-black outline-none" placeholder="Icon ID" value={s.icon} onChange={(e) => { const st = [...data.stories]; st[i].icon = e.target.value; updateData({ stories: st }); }} />
                  </div>
                  <input className="w-full bg-transparent border-b-2 py-2 text-lg font-black outline-none focus:border-stone-900" placeholder="Judul Moment" value={s.title} onChange={(e) => { const st = [...data.stories]; st[i].title = e.target.value; updateData({ stories: st }); }} />
                  <textarea className="w-full bg-transparent text-sm opacity-60 outline-none h-24 italic" placeholder="Ceritakan moment ini..." value={s.desc} onChange={(e) => { const st = [...data.stories]; st[i].desc = e.target.value; updateData({ stories: st }); }} />
               </div>
             ))}
          </div>
       </section>

       {/* 5. BANKS */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <div className="flex items-center justify-between">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Kado Digital</p>
             <button onClick={addBank} className="text-[10px] font-black text-[#C5A059] hover:underline">+ TAMBAH</button>
          </div>
          <div className="space-y-4">
             {(data.bankAccounts || []).map((b, i) => (
               <div key={i} className="p-8 bg-stone-50 rounded-[40px] space-y-4 relative group border border-stone-100 hover:border-[#C5A059] transition-all shadow-lg">
                  <button onClick={() => updateData({ bankAccounts: data.bankAccounts.filter((_, idx) => idx !== i) })} className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 text-red-400 transition-opacity">
                     <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                  <input className="w-full bg-transparent border-b py-2 text-[10px] font-black outline-none" placeholder="Nama Bank" value={b.bank} onChange={(e) => updateBank(i, 'bank', e.target.value)} />
                  <input className="w-full bg-transparent border-b py-2 text-xl font-black outline-none" placeholder="Nomor Rekening" value={b.number} onChange={(e) => updateBank(i, 'number', e.target.value)} />
                  <input className="w-full bg-transparent py-2 text-xs opacity-50 outline-none font-bold" placeholder="Atas Nama" value={b.owner} onChange={(e) => updateBank(i, 'owner', e.target.value)} />
               </div>
             ))}
          </div>
       </section>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <header className="h-20 border-b px-10 flex items-center justify-between z-[100] bg-white border-stone-100">
        <button onClick={() => setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-2xl bg-stone-50 group-hover:bg-stone-100 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </div>
          <span className="serif font-black text-2xl tracking-tighter text-stone-900">LuxeInvite <span className="text-[10px] font-black text-[#C5A059] uppercase ml-2 px-2 py-1 bg-[#C5A059]/10 rounded-lg">Pro Editor</span></span>
        </button>
        
        <div className="hidden md:flex items-center bg-stone-50 rounded-[20px] p-1.5 gap-1 shadow-inner border border-stone-100">
           {[{ id: 'mobile', icon: 'smartphone', label: 'HP' }, { id: 'tablet', icon: 'tablet_android', label: 'Tab' }, { id: 'desktop', icon: 'desktop_windows', label: 'PC' }].map(d => (
             <button key={d.id} onClick={() => setDevice(d.id)} className={`flex items-center gap-2 p-3 px-6 rounded-2xl transition-all ${device === d.id ? 'bg-white text-stone-900 shadow-xl' : 'text-stone-400 hover:text-stone-600'}`}>
                <span className="material-symbols-outlined text-[18px]">{d.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{d.label}</span>
             </button>
           ))}
        </div>

        <div className="flex items-center gap-8">
          {isUploading && <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 bg-[#C5A059] rounded-full animate-ping" /><span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">Saving...</span></div>}
          <button onClick={() => setIsPublished(true)} className="px-10 py-3.5 bg-stone-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:bg-[#C5A059] transition-all">Publish</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="w-[450px] border-r flex flex-col h-full bg-white border-stone-50 shadow-2xl z-10">
           <div className="flex border-b border-stone-50 bg-stone-50/50">
              {['desain', 'konten', 'lapisan'].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-stone-900' : 'text-stone-300 hover:text-stone-400'}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#C5A059]" />}
                 </button>
              ))}
           </div>
           <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              {activeTab === 'desain' && renderDesignTab()}
              {activeTab === 'konten' && renderContentTab()}
              {activeTab === 'lapisan' && (
                <div className="space-y-6">
                   <div className="p-8 rounded-[40px] bg-stone-50 border border-stone-100 space-y-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Pengaturan Tampilan</p>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-stone-900">Tampilkan Cover Luar</span>
                         <button onClick={() => setShowCover(!showCover)} className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${showCover ? 'bg-[#C5A059]' : 'bg-stone-200'}`}>
                            <motion.div animate={{ x: showCover ? 24 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-md" />
                         </button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </aside>

        <main className="flex-1 relative overflow-hidden bg-[#f0f2f5] flex items-center justify-center p-12 lg:p-20">
           <motion.div animate={{ width: device === 'mobile' ? '450px' : device === 'tablet' ? '850px' : '100%', height: device === 'desktop' ? '100%' : '90vh', borderRadius: device === 'desktop' ? '0px' : '80px' }} className="bg-white shadow-[0_80px_150px_-30px_rgba(0,0,0,0.4)] overflow-hidden relative border-[12px] border-stone-900 transition-all duration-700 ease-in-out">
              <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                 <PremiumInvitation data={data} isEditMode={true} forceShowCover={showCover} onEdit={(s) => setActiveTab('konten')} />
              </div>
           </motion.div>
        </main>
      </div>

      <AnimatePresence>
         {isPublished && (
           <div className="fixed inset-0 z-[2000] flex items-center justify-center p-10 bg-black/80 backdrop-blur-xl">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg w-full p-20 bg-white rounded-[80px] text-center shadow-2xl border border-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C5A059] to-[#1C1917]" />
                 <div className="w-24 h-24 bg-stone-50 rounded-[40px] flex items-center justify-center mx-auto mb-10">
                    <span className="material-symbols-outlined text-5xl text-[#C5A059]">celebration</span>
                 </div>
                 <h2 className="serif text-5xl font-black mb-6 text-stone-900">Publik Berhasil!</h2>
                 <p className="text-stone-400 text-sm mb-12 leading-relaxed">Undangan mewah Anda kini sudah online dan siap dibagikan ke seluruh keluarga & teman.</p>
                 <div className="bg-stone-50 p-8 rounded-[40px] mb-12 text-xs font-mono break-all text-[#C5A059] border border-stone-100 flex items-center justify-between gap-4">
                    <span>{config.BASE_URL}#/v</span>
                    <button onClick={() => { navigator.clipboard.writeText(config.BASE_URL+'#/v'); alert('Link Copied!'); }} className="material-symbols-outlined text-[18px]">content_copy</button>
                 </div>
                 <button onClick={() => setIsPublished(false)} className="w-full py-6 bg-stone-900 text-white rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#C5A059] transition-all shadow-xl">Selesai & Tutup</button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
