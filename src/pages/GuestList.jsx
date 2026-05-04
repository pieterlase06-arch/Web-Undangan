import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LuxeButton from '../components/ui/LuxeButton';
import LuxeInput from '../components/ui/LuxeInput';
import LuxeTypography from '../components/ui/LuxeTypography';
import GuestHeader from '../components/guest/GuestHeader';
import AddGuestForm from '../components/guest/AddGuestForm';
import GuestTableRow from '../components/guest/GuestTableRow';

const GuestList = ({ guests, onAddGuest, onDelete, onStatusUpdate }) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Keluarga');
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [isImporting, setIsImporting] = useState(false);
  const [showBlastModal, setShowBlastModal] = useState(false);
  const [customMessage, setCustomMessage] = useState("Halo [nama_tamu], kami mengundang Anda ke momen bahagia kami! 🎊\n\nLihat undangan selengkapnya di sini:\n[link_undangan]");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddGuest({ name: newName.trim(), phone: newPhone.trim(), category: newCategory, status: 'Sent' });
    setNewName('');
    setNewPhone('');
  };

  const categories = ['Semua', 'Keluarga', 'VIP', 'Teman Kantor', 'Lainnya'];

  const filtered = guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'Semua' || g.category === filterCategory;
    return matchSearch && matchCat;
  });

  const sendWhatsApp = (guest) => {
    const finalMsg = customMessage
      .replace('[nama_tamu]', guest.name)
      .replace('[link_undangan]', `${window.location.origin}${window.location.pathname}#/v?to=${guest.name.replace(/ /g, '+')}`);
    
    window.open(`https://wa.me/${guest.phone.replace(/^0/, '62')}?text=${encodeURIComponent(finalMsg)}`, '_blank');
    onStatusUpdate(guest.id, 'Sent');
  };

  const exportData = () => {
    const csv = [
      ['ID', 'Nama', 'Kategori', 'Status', 'Nomor HP'],
      ...guests.map(g => [g.id, g.name, g.category, g.status, g.phone])
    ].map(e => e.join(",")).join("\n");
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guest-list-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6 lg:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <GuestHeader 
          guestCount={guests.length}
          onImport={() => setIsImporting(true)}
          onExport={exportData}
          onBlast={() => setShowBlastModal(true)}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
           {/* QUICK ADD FORM */}
           <div className="xl:col-span-1">
              <AddGuestForm onAdd={onAddGuest} />
           </div>

           {/* DATABASE VIEW */}
           <div className="xl:col-span-2 space-y-10">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-6">
                 <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-8 top-1/2 -translate-y-1/2 text-indigo-300">search</span>
                    <input 
                      className="w-full bg-white rounded-[32px] pl-20 pr-8 py-5 text-sm font-bold shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-white outline-none focus:ring-4 ring-indigo-50 transition-all" 
                      placeholder="Filter database by name..." value={search} onChange={e => setSearch(e.target.value)}
                    />
                 </div>
                 <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                    {categories.map(c => (
                      <button 
                        key={c} onClick={() => setFilterCategory(c)}
                        className={`px-8 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filterCategory === c ? 'bg-indigo-600 text-white shadow-[0_15px_30px_rgba(79,70,229,0.3)]' : 'bg-white text-stone-400 border border-white shadow-sm'}`}
                      >
                         {c}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-white overflow-hidden p-8">
                 {/* GUEST DATA GRID */}
                 <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-4 custom-scrollbar">
                    {filtered.map((g, i) => (
                      <GuestTableRow 
                        key={g.id} 
                        guest={g} 
                        onSend={() => sendWhatsApp(g)}
                        onDelete={() => onDelete(g.id)}
                      />
                    ))}
                 </div>
                 {filtered.length === 0 && (
                   <div className="py-40 text-center space-y-6 opacity-20 flex flex-col items-center">
                      <span className="material-symbols-outlined text-8xl">database_off</span>
                      <p className="text-[12px] font-black uppercase tracking-[0.5em]">No Data in Active Buffer</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* BLAST MODAL */}
      <AnimatePresence>
         {showBlastModal && (
           <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-stone-950/80 backdrop-blur-2xl">
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="max-w-3xl w-full bg-white rounded-[80px] p-16 shadow-[0_60px_120px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute top-0 inset-x-0 h-3 bg-indigo-600" />
                 <div className="flex justify-between items-start mb-12">
                    <div className="space-y-2">
                       <h2 className="text-4xl font-black text-stone-900 tracking-tighter italic">Broadcast <span className="text-indigo-600">Engine</span></h2>
                       <p className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-400">Configure global invitation template</p>
                    </div>
                    <button onClick={() => setShowBlastModal(false)} className="w-14 h-14 bg-stone-50 rounded-3xl flex items-center justify-center text-stone-300 hover:text-stone-950 hover:bg-stone-100 transition-all">
                       <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                 </div>
                 
                 <div className="space-y-10">
                    <div className="space-y-5">
                       <div className="flex items-center justify-between px-2">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">DYNAMIC TEMPLATE</p>
                          <div className="flex gap-3">
                             <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black tracking-widest">[nama_tamu]</span>
                             <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black tracking-widest">[link_undangan]</span>
                          </div>
                       </div>
                       <textarea 
                        className="w-full bg-[#F5F7FA] rounded-[40px] p-10 text-base font-bold text-stone-800 outline-none border-none focus:ring-4 ring-indigo-50 h-56 resize-none leading-relaxed shadow-inner"
                        value={customMessage} onChange={e => setCustomMessage(e.target.value)}
                       />
                    </div>
                    
                    <div className="p-10 bg-[#F5F7FA] rounded-[50px] border border-white flex items-center justify-between shadow-sm">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-white text-indigo-600 rounded-[28px] flex items-center justify-center shadow-xl border border-indigo-50">
                             <span className="material-symbols-outlined text-3xl">auto_mode</span>
                          </div>
                          <div>
                             <p className="text-sm font-black uppercase text-stone-900">Batch Pipeline</p>
                             <p className="text-[11px] font-bold text-stone-400">Ready for {filtered.length} targets</p>
                          </div>
                       </div>
                       <LuxeButton onClick={() => alert('Batch processing is initializing... (Simulated)')}>START BATCH ✦</LuxeButton>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* IMPORT MODAL */}
      <AnimatePresence>
         {isImporting && (
           <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-stone-950/80 backdrop-blur-2xl">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-xl w-full bg-white rounded-[80px] p-20 text-center space-y-10 shadow-2xl">
                 <div className="w-24 h-24 bg-indigo-50 rounded-[40px] flex items-center justify-center mx-auto text-indigo-600 shadow-xl border border-indigo-100">
                    <span className="material-symbols-outlined text-5xl">cloud_upload</span>
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-3xl font-black text-stone-900 tracking-tighter italic">Bulk Importer</h3>
                    <p className="text-[11px] text-stone-400 font-bold uppercase tracking-[0.2em] leading-relaxed">Import Excel (.xlsx) or CSV data directly into the active buffer.</p>
                 </div>
                 <div className="border-4 border-dashed border-indigo-50 rounded-[50px] p-16 bg-[#FBFBFF] hover:border-indigo-200 transition-all cursor-pointer group">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-300 group-hover:text-indigo-600 transition-colors">Select Data Source</p>
                 </div>
                 <button onClick={() => setIsImporting(false)} className="w-full py-4 text-stone-300 text-[11px] font-black uppercase tracking-[0.4em] hover:text-stone-900 transition-colors">CANCEL IMPORT</button>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{ __html: `
         .no-scrollbar::-webkit-scrollbar { display: none; }
         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default GuestList;
