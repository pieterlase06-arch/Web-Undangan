import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../config';

const Dashboard = ({ setView }) => {
  const [stats, setStats] = useState({ guests: 0, rsvps: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${config.API_URL}/data`);
        if (res.ok) {
          const data = await res.json();
          // With SQLite, I can just fetch messages/rsvps counts
          const mRes = await fetch(`${config.API_URL}/messages`);
          const messages = await mRes.json();
          const gRes = await fetch(`${config.API_URL}/guests`);
          const guests = await gRes.json();
          
          setStats({
            guests: guests.length,
            rsvps: guests.filter(g => g.status === 'confirmed').length,
            messages: messages.length
          });
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const menuItems = [
    { id: 'catalog', title: 'Pilih Template', icon: 'auto_awesome', desc: 'Ganti tema undangan Anda', path: '/katalog' },
    { id: 'editor', title: 'Edit Desain', icon: 'edit_note', desc: 'Ubah konten & tampilan', path: '/editor' },
    { id: 'guests', title: 'Daftar Tamu', icon: 'group', desc: 'Kelola buku tamu Anda', path: '/tamu' },
    { id: 'tracking', title: 'RSVP Tracking', icon: 'analytics', desc: 'Lihat konfirmasi kehadiran', path: '/rsvp' }
  ];

  return (
    <div className="p-8 md:p-16 max-w-7xl mx-auto space-y-16">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="serif text-5xl font-black text-stone-900 tracking-tighter">Halo, Admin!</motion.h1>
          <p className="text-stone-400 font-medium">Selamat datang di pusat kendali LuxeInvite Anda.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-xl border border-stone-100">
           <div className="w-12 h-12 bg-[#C5A059] rounded-xl flex items-center justify-center text-white font-black">A</div>
           <div className="pr-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Status Akun</p>
              <p className="text-xs font-bold text-stone-900">Premium Full-Stack</p>
           </div>
        </div>
      </header>

      {/* STATS OVERVIEW */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Tamu', value: stats.guests, icon: 'group', color: 'bg-blue-50 text-blue-500' },
          { label: 'Konfirmasi RSVP', value: stats.rsvps, icon: 'check_circle', color: 'bg-green-50 text-green-500' },
          { label: 'Ucapan Doa', value: stats.messages, icon: 'forum', color: 'bg-amber-50 text-amber-500' }
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[40px] shadow-2xl border border-stone-100 space-y-6"
          >
            <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center`}>
               <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
            </div>
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</p>
               <h3 className="text-4xl font-black text-stone-900">{loading ? '...' : stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </section>

      {/* MENU GRID */}
      <section className="space-y-8">
        <h3 className="text-xl font-black serif">Menu Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView(item.path)}
              className="group bg-white p-8 rounded-[40px] text-left shadow-xl border border-stone-100 hover:border-[#C5A059] transition-all"
            >
              <div className="w-12 h-12 bg-stone-50 group-hover:bg-[#C5A059]/10 rounded-2xl flex items-center justify-center mb-6 transition-colors">
                <span className="material-symbols-outlined text-[#C5A059]">{item.icon}</span>
              </div>
              <h4 className="text-lg font-black text-stone-900 mb-2">{item.title}</h4>
              <p className="text-xs text-stone-400 font-medium leading-relaxed">{item.desc}</p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* RECENT ACTIVITY / SYNC STATUS */}
      <footer className="bg-stone-900 rounded-[50px] p-12 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rotate-45 translate-x-32 -translate-y-32" />
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center md:text-left">
               <h4 className="text-2xl font-black serif">Sistem Full-Stack Ready</h4>
               <p className="text-stone-400 text-xs">Semua data tersinkronisasi dengan Database SQLite secara real-time.</p>
            </div>
            <div className="flex gap-4">
               <button onClick={() => window.open(config.BASE_URL+'#/v', '_blank')} className="px-8 py-4 bg-white text-stone-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all">Lihat Undangan Live</button>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Dashboard;
