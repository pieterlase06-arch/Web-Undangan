import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GiftCard = ({ bank, number, owner, icon, accentColor }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-10 bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
      <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-2">
         {icon ? <img src={icon} className="w-8 h-8 object-contain" /> : <span className="material-symbols-outlined text-slate-400">payments</span>}
      </div>
      <div className="space-y-1">
         <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{bank}</p>
         <p className="text-xl font-black">{number}</p>
         <p className="text-sm opacity-60">a.n {owner}</p>
      </div>
      
      <button 
        onClick={copyToClipboard}
        className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[16px]">{copied ? 'check' : 'content_copy'}</span>
        {copied ? 'Copied!' : 'Copy Number'}
      </button>

      {copied && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-green-500/10 flex items-center justify-center pointer-events-none"
        />
      )}
    </div>
  );
};

const Gifts = ({ data }) => {
  const gifts = data?.gifts || [
    { bank: 'BCA', number: '1234567890', owner: 'Mempelai Pria' },
    { bank: 'MANDIRI', number: '0987654321', owner: 'Mempelai Wanita' }
  ];

  return (
    <div className="py-20 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Wedding Gift</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Digital Envelope</h2>
          <p className="max-w-xl mx-auto text-slate-500 italic">Doa restu Anda adalah karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan hadiah, kami menyediakan layanan digital berikut:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {gifts.map((gift, idx) => (
            <GiftCard key={idx} {...gift} accentColor={data?.primaryColor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gifts;
