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
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Gaya & Warna</p>
          <div className="grid grid-cols-1 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase">Warna Utama</label>
                <div className="flex gap-4">
                   <input type="color" className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-xl" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                   <input className="flex-1 bg-stone-100 rounded-2xl px-6 text-sm font-mono text-stone-900 outline-none border border-stone-200" value={data.primaryColor || '#C5A059'} onChange={(e) => updateData({ primaryColor: e.target.value })} />
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase">Jenis Font</label>
                <select className="w-full p-5 bg-stone-100 rounded-2xl outline-none text-sm font-bold text-stone-900 border border-stone-200" value={data.fontFamily} onChange={(e) => updateData({ fontFamily: e.target.value })}>
                   <option value="'Cinzel', serif">Imperial Serif (Cinzel)</option>
                   <option value="'Playfair Display', serif">Classic Serif (Playfair)</option>
                   <option value="'Montserrat', sans-serif">Modern Sans (Montserrat)</option>
                </select>
             </div>
          </div>
       </section>

       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Musik Latar</p>
          <input className="w-full p-5 bg-stone-100 rounded-2xl text-xs text-stone-900 outline-none border border-stone-200" placeholder="URL Lagu MP3..." value={data.musicUrl} onChange={(e) => updateData({ musicUrl: e.target.value })} />
          <p className="text-[9px] opacity-40 italic px-4 text-stone-600">Gunakan link langsung (.mp3) agar musik bisa diputar otomatis.</p>
       </section>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-12 pb-20">
       {/* 1. MEMPELAI */}
       <section className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Informasi Mempelai</p>
          <div className="space-y-8">
             <div className="p-8 bg-stone-50 rounded-[40px] space-y-6 border border-stone-100 shadow-sm">
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-3xl bg-white shadow-xl overflow-hidden relative group border border-stone-100">
                      {data.groomImage ? <img src={data.groomImage} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-stone-100 flex items-center justify-center"><span className="material-symbols-outlined text-stone-300">person</span></div>}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                         <span className="material-symbols-outlined">upload</span>
                         <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], 'groomImage')} />
                      </label>
                   </div>
                   <div className="flex-1 space-y-4">
                      <input className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-xl font-black text-stone-900 outline-none focus:border-stone-900 placeholder:text-stone-300" placeholder="Nama Pria" value={data.partner1} onChange={(e) => updateData({ partner1: e.target.value })} />
                      <input className="w-full bg-transparent py-1 text-xs text-stone-500 font-bold outline-none placeholder:text-stone-300" placeholder="Nama Orang Tua Pria" value={data.partner1Parents} onChange={(e) => updateData({ partner1Parents: e.target.value })} />
                   </div>
                </div>
             </div>
             <div className="p-8 bg-stone-50 rounded-[40px] space-y-6 border border-stone-100 shadow-sm">
                <div className="flex items-center gap-6">
                   <div className="w-24 h-24 rounded-3xl bg-white shadow-xl overflow-hidden relative group border border-stone-100">
                      {data.brideImage ? <img src={data.brideImage} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-stone-100 flex items-center justify-center"><span className="material-symbols-outlined text-stone-300">person</span></div>}
                      <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                         <span className="material-symbols-outlined">upload</span>
                         <input type="file" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], 'brideImage')} />
                      </label>
                   </div>
                   <div className="flex-1 space-y-4">
                      <input className="w-full bg-transparent border-b-2 border-stone-200 py-2 text-xl font-black text-stone-900 outline-none focus:border-stone-900 placeholder:text-stone-300" placeholder="Nama Wanita" value={data.partner2} onChange={(e) => updateData({ partner2: e.target.value })} />
                      <input className="w-full bg-transparent py-1 text-xs text-stone-500 font-bold outline-none placeholder:text-stone-300" placeholder="Nama Orang Tua Wanita" value={data.partner2Parents} onChange={(e) => updateData({ partner2Parents: e.target.value })} />
                   </div>
                </div>
             </div>
          </div>
       </section>

       {/* 2. ACARA */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Detail Acara</p>
          <div className="p-10 bg-stone-100/50 rounded-[50px] space-y-8 border border-stone-100">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase">Tanggal & Waktu</label>
                <div className="grid grid-cols-2 gap-6">
                   <input type="date" className="w-full p-5 bg-white border border-stone-200 rounded-2xl outline-none text-sm font-bold text-stone-900" value={data.date} onChange={(e) => updateData({ date: e.target.value })} />
                   <input type="text" className="w-full p-5 bg-white border border-stone-200 rounded-2xl outline-none text-sm font-bold text-stone-900" placeholder="08:00 WIB" value={data.time} onChange={(e) => updateData({ time: e.target.value })} />
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase">Nama Lokasi / Gedung</label>
                <input className="w-full p-5 bg-white border border-stone-200 rounded-2xl outline-none text-sm font-bold text-stone-900 placeholder:text-stone-300" placeholder="Gedung Serbaguna..." value={data.venue} onChange={(e) => updateData({ venue: e.target.value })} />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase">Alamat Lengkap</label>
                <textarea className="w-full p-5 bg-white border border-stone-200 rounded-2xl outline-none text-sm font-bold h-28 text-stone-900 placeholder:text-stone-300" placeholder="Jl. Raya Utama No. 123..." value={data.address} onChange={(e) => updateData({ address: e.target.value })} />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-400 uppercase">Link Google Maps</label>
                <input className="w-full p-5 bg-white border border-stone-200 rounded-2xl outline-none text-xs font-mono text-stone-500 placeholder:text-stone-300" placeholder="https://maps.google.com/..." value={data.mapsLink} onChange={(e) => updateData({ mapsLink: e.target.value })} />
             </div>
          </div>
       </section>

       {/* 3. QUOTES */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Kutipan / Doa</p>
          <textarea className="w-full p-10 bg-stone-50 rounded-[50px] outline-none text-sm italic leading-relaxed border border-stone-200 h-48 text-stone-900 placeholder:text-stone-300" placeholder="Dan di antara tanda-tanda kekuasaan-Nya..." value={data.quote} onChange={(e) => updateData({ quote: e.target.value })} />
       </section>

       {/* 4. STORIES */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <div className="flex items-center justify-between px-2">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Cerita Cinta</p>
             <button onClick={addStory} className="text-[10px] font-black text-[#C5A059] hover:underline">+ TAMBAH BARU</button>
          </div>
          <div className="space-y-6">
             {(data.stories || []).map((s, i) => (
               <div key={i} className="p-8 bg-white border border-stone-200 rounded-[50px] space-y-6 shadow-xl relative group transition-all hover:border-[#C5A059]">
                  <button onClick={() => updateData({ stories: data.stories.filter((_, idx) => idx !== i) })} className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-red-500 transition-opacity">
                     <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                     <input className="bg-stone-50 p-4 rounded-2xl text-[10px] font-black text-stone-900 outline-none border border-stone-100" placeholder="Tahun" value={s.year} onChange={(e) => { const st = [...data.stories]; st[i].year = e.target.value; updateData({ stories: st }); }} />
                     <input className="bg-stone-50 p-4 rounded-2xl text-[10px] font-black text-stone-900 outline-none border border-stone-100" placeholder="Icon ID" value={s.icon} onChange={(e) => { const st = [...data.stories]; st[i].icon = e.target.value; updateData({ stories: st }); }} />
                  </div>
                  <input className="w-full bg-transparent border-b-2 border-stone-100 py-3 text-lg font-black text-stone-900 outline-none focus:border-stone-900 placeholder:text-stone-200" placeholder="Judul Moment" value={s.title} onChange={(e) => { const st = [...data.stories]; st[i].title = e.target.value; updateData({ stories: st }); }} />
                  <textarea className="w-full bg-transparent text-sm text-stone-500 outline-none h-28 italic placeholder:text-stone-200" placeholder="Ceritakan moment ini..." value={s.desc} onChange={(e) => { const st = [...data.stories]; st[i].desc = e.target.value; updateData({ stories: st }); }} />
               </div>
             ))}
          </div>
       </section>

       {/* 5. BANKS */}
       <section className="space-y-6 pt-10 border-t border-stone-100">
          <div className="flex items-center justify-between px-2">
             <p className="text-[10px] font-black uppercase tracking-widest text-stone-500">Kado Digital</p>
             <button onClick={addBank} className="text-[10px] font-black text-[#C5A059] hover:underline">+ TAMBAH BANK</button>
          </div>
          <div className="space-y-6">
             {(data.bankAccounts || []).map((b, i) => (
               <div key={i} className="p-10 bg-stone-50 rounded-[50px] space-y-4 relative group border border-stone-200 hover:border-[#C5A059] transition-all shadow-lg">
                  <button onClick={() => updateData({ bankAccounts: data.bankAccounts.filter((_, idx) => idx !== i) })} className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-red-500 transition-opacity">
                     <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                  <input className="w-full bg-transparent border-b border-stone-200 py-2 text-[10px] font-black text-stone-900 outline-none uppercase tracking-widest placeholder:text-stone-300" placeholder="Nama Bank" value={b.bank} onChange={(e) => updateBank(i, 'bank', e.target.value)} />
                  <input className="w-full bg-transparent border-b-2 border-stone-200 py-3 text-2xl font-black text-stone-900 outline-none focus:border-stone-900 placeholder:text-stone-200" placeholder="Nomor Rekening" value={b.number} onChange={(e) => updateBank(i, 'number', e.target.value)} />
                  <input className="w-full bg-transparent py-2 text-xs text-stone-400 font-bold outline-none placeholder:text-stone-300" placeholder="Atas Nama" value={b.owner} onChange={(e) => updateBank(i, 'owner', e.target.value)} />
               </div>
             ))}
          </div>
       </section>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <header className="h-24 border-b px-12 flex items-center justify-between z-[100] bg-white border-stone-100">
        <button onClick={() => setView('/desain-saya')} className="text-stone-400 hover:text-stone-900 flex items-center gap-5 group">
          <div className="w-12 h-12 rounded-[20px] bg-stone-50 group-hover:bg-stone-100 flex items-center justify-center transition-all shadow-sm border border-stone-100">
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </div>
          <span className="serif font-black text-3xl tracking-tighter text-stone-900">LuxeInvite <span className="text-[10px] font-black text-[#C5A059] uppercase ml-3 px-3 py-1.5 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/10">PRO</span></span>
        </button>
        
        <div className="hidden md:flex items-center bg-stone-100 rounded-[25px] p-2 gap-1.5 shadow-inner border border-stone-200">
           {[{ id: 'mobile', icon: 'smartphone', label: 'HP' }, { id: 'tablet', icon: 'tablet_android', label: 'Tab' }, { id: 'desktop', icon: 'desktop_windows', label: 'PC' }].map(d => (
             <button key={d.id} onClick={() => setDevice(d.id)} className={`flex items-center gap-3 p-3.5 px-8 rounded-2xl transition-all ${device === d.id ? 'bg-white text-stone-900 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border border-stone-100' : 'text-stone-400 hover:text-stone-600'}`}>
                <span className="material-symbols-outlined text-[20px]">{d.icon}</span>
                <span className="text-[11px] font-black uppercase tracking-widest">{d.label}</span>
             </button>
           ))}
        </div>

        <div className="flex items-center gap-10">
          {isUploading && <div className="flex items-center gap-4"><div className="w-3 h-3 bg-[#C5A059] rounded-full animate-ping" /><span className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.2em]">Syncing...</span></div>}
          <button onClick={() => setIsPublished(true)} className="px-12 py-4 bg-stone-950 text-white rounded-[20px] text-[12px] font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:bg-[#C5A059] transition-all active:scale-95">Publish</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside className="w-[500px] border-r flex flex-col h-full bg-white border-stone-50 shadow-[20px_0_100px_rgba(0,0,0,0.02)] z-10">
           <div className="flex border-b border-stone-100 bg-stone-50/50 p-2">
              {['desain', 'konten', 'lapisan'].map(tab => (
                 <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-5 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative rounded-2xl ${activeTab === tab ? 'text-stone-900 bg-white shadow-sm border border-stone-100' : 'text-stone-300 hover:text-stone-400'}`}>
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab-pill" className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#C5A059] rounded-full" />}
                 </button>
              ))}
           </div>
           <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
              {activeTab === 'desain' && renderDesignTab()}
              {activeTab === 'konten' && renderContentTab()}
              {activeTab === 'lapisan' && (
                <div className="space-y-8">
                   <div className="p-10 rounded-[50px] bg-stone-50 border border-stone-100 space-y-8 shadow-sm">
                      <p className="text-[11px] font-black uppercase tracking-widest text-stone-500">Pengaturan Tampilan</p>
                      <div className="flex items-center justify-between p-6 bg-white rounded-3xl border border-stone-100">
                         <span className="text-sm font-bold text-stone-900">Tampilkan Cover Luar</span>
                         <button onClick={() => setShowCover(!showCover)} className={`w-16 h-9 rounded-full transition-all flex items-center px-1.5 ${showCover ? 'bg-[#C5A059]' : 'bg-stone-200'}`}>
                            <motion.div animate={{ x: showCover ? 28 : 0 }} className="w-6 h-6 bg-white rounded-full shadow-lg" />
                         </button>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </aside>

        <main className="flex-1 relative overflow-hidden bg-[#f4f6f8] flex items-center justify-center p-12 lg:p-24">
           <motion.div animate={{ width: device === 'mobile' ? '480px' : device === 'tablet' ? '900px' : '100%', height: device === 'desktop' ? '100%' : '92vh', borderRadius: device === 'desktop' ? '0px' : '100px' }} className="bg-white shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] overflow-hidden relative border-[15px] border-stone-950 transition-all duration-700 ease-[0.82,0,0.18,1]">
              <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
                 <PremiumInvitation data={data} isEditMode={true} forceShowCover={showCover} onEdit={(s) => setActiveTab('konten')} />
              </div>
           </motion.div>
        </main>
      </div>

      <AnimatePresence>
         {isPublished && (
           <div className="fixed inset-0 z-[2000] flex items-center justify-center p-12 bg-stone-900/90 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.9, y: 50, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} className="max-w-xl w-full p-24 bg-white rounded-[100px] text-center shadow-2xl border border-white relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#C5A059] via-stone-900 to-[#C5A059]" />
                 <div className="w-32 h-32 bg-stone-50 rounded-[50px] flex items-center justify-center mx-auto mb-12 border border-stone-100 shadow-inner">
                    <span className="material-symbols-outlined text-6xl text-[#C5A059]">auto_awesome</span>
                 </div>
                 <h2 className="serif text-6xl font-black mb-6 text-stone-900 tracking-tighter">Publikasi Berhasil!</h2>
                 <p className="text-stone-400 text-sm mb-16 leading-relaxed max-w-sm mx-auto">Undangan mewah Anda kini sudah online dan siap dibagikan ke seluruh orang tercinta.</p>
                 <div className="bg-stone-50 p-10 rounded-[50px] mb-16 text-sm font-mono break-all text-[#C5A059] border border-stone-200 flex items-center justify-between gap-6 shadow-inner group">
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">{config.BASE_URL}#/v</span>
                    <button onClick={() => { navigator.clipboard.writeText(config.BASE_URL+'#/v'); alert('Link Tersalin!'); }} className="material-symbols-outlined text-[24px] hover:scale-125 transition-transform">content_copy</button>
                 </div>
                 <button onClick={() => setIsPublished(false)} className="w-full py-8 bg-stone-950 text-white rounded-[40px] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#C5A059] transition-all shadow-2xl active:scale-95">Selesai & Tutup</button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};

export default Editor;
