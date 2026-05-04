import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LuxeButton from './LuxeButton';
import LuxeInput from './LuxeInput';

const STOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800',
];

const LuxeImagePicker = ({ onSelect, onClose }) => {
  const [tab, setTab] = useState('stock');
  const [url, setUrl] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => onSelect(event.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="flex p-2 bg-slate-100 rounded-3xl gap-2">
         {['stock', 'upload', 'url'].map(t => (
           <button 
             key={t}
             onClick={() => setTab(t)}
             className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest rounded-2xl transition-all ${tab === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
           >
             {t}
           </button>
         ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
         <AnimatePresence mode="wait">
            {tab === 'stock' && (
               <motion.div 
                 key="stock" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="grid grid-cols-2 gap-4"
               >
                  {STOCK_PHOTOS.map((src, i) => (
                    <button 
                      key={i} onClick={() => onSelect(src)}
                      className="aspect-square rounded-3xl overflow-hidden hover:ring-4 ring-indigo-500/20 transition-all group relative"
                    >
                       <img src={src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Stock" />
                       <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/20 transition-all flex items-center justify-center">
                          <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">check_circle</span>
                       </div>
                    </button>
                  ))}
               </motion.div>
            )}

            {tab === 'upload' && (
               <motion.div 
                 key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="space-y-6"
               >
                  <label className="flex flex-col items-center justify-center aspect-[16/10] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] cursor-pointer hover:bg-slate-100 hover:border-indigo-300 transition-all group">
                     <span className="material-symbols-outlined text-4xl text-slate-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all mb-4">cloud_upload</span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Choose Local File</span>
                     <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest">Supports JPG, PNG, WEBP (Max 5MB)</p>
               </motion.div>
            )}

            {tab === 'url' && (
               <motion.div 
                 key="url" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 className="space-y-6"
               >
                  <LuxeInput label="IMAGE URL" placeholder="https://..." value={url} onChange={setUrl} />
                  <LuxeButton onClick={() => onSelect(url)} disabled={!url} className="w-full">IMPORT FROM URL</LuxeButton>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
};

export default LuxeImagePicker;
