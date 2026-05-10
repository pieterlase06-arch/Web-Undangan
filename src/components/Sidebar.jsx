import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ currentView, setView, lang = 'id', setLang, theme, setTheme, isOpen, onClose, onLogout }) => {
  const t = {
    id: { overview: 'Ikhtisar', templates: 'Katalog', designs: 'Editor', guests: 'Daftar Tamu', rsvp: 'Lacak RSVP' },
    en: { overview: 'Overview', templates: 'Catalog', designs: 'Editor', guests: 'Guest List', rsvp: 'RSVP Tracking' }
  }[lang] || { overview: 'Ikhtisar', templates: 'Katalog', designs: 'Editor', guests: 'Daftar Tamu', rsvp: 'Lacak RSVP' };

  const menuItems = [
    { id: '/desain-saya', label: t.overview, icon: 'grid_view' },
    { id: '/katalog', label: t.templates, icon: 'auto_awesome' },
    { id: '/buku-tamu', label: t.guests, icon: 'group' },
    { id: '/lacak-rsvp', label: t.rsvp, icon: 'analytics' },
  ];

  const handleNav = (id) => {
    setView(id);
    onClose?.();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[400] bg-stone-900/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <nav className={`
        fixed inset-y-0 left-0 z-[500] w-72 transform transition-all duration-700 ease-[0.16,1,0.3,1]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col p-8 border-r shadow-2xl lg:shadow-none
        ${theme === 'dark' ? 'glass-dark border-slate-800' : 'glass border-stone-100'}
      `}>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className={`serif font-black text-2xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-stone-950'}`}>LuxeInvite</h1>
            <p className="text-[9px] text-stone-400 font-black uppercase tracking-[0.3em] mt-1">Industrial Suite</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-stone-400">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => {
            const isActive = currentView === item.id || (item.id === '/desain-saya' && currentView === '/');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-5 p-5 rounded-[24px] transition-all group ${
                  isActive
                    ? 'bg-stone-950 text-white shadow-2xl translate-x-2'
                    : 'text-stone-400 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#C5A059]' : ''}`}>{item.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto space-y-6 pt-6 border-t border-stone-50">
          <div className="flex items-center justify-between">
            <button onClick={() => setLang?.(lang === 'id' ? 'en' : 'id')} className="text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-950">
              {lang === 'id' ? '🇺🇸 EN' : '🇮🇩 ID'}
            </button>
            <button onClick={() => setTheme?.(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-stone-50 text-stone-400">
              <span className="material-symbols-outlined text-[18px]">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>

          <button onClick={onLogout} className="flex items-center gap-3 w-full p-4 text-red-400 hover:bg-red-50 rounded-2xl transition-all">
             <span className="material-symbols-outlined text-[20px]">logout</span>
             <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
          </button>
          
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
