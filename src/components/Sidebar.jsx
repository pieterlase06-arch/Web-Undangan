import React from 'react';

const Sidebar = ({ currentView, setView, lang, setLang, theme, setTheme, isOpen }) => {
  const t = {
    id: { overview: 'Ikhtisar', templates: 'Templat', designs: 'Desain Saya', guests: 'Daftar Tamu', rsvp: 'Lacak RSVP', settings: 'Pengaturan', upgrade: 'Upgrade ke Gold' },
    en: { overview: 'Overview', templates: 'Templates', designs: 'My Designs', guests: 'Guest Lists', rsvp: 'RSVP Tracking', settings: 'Settings', upgrade: 'Upgrade to Gold' }
  }[lang];

  const menuItems = [
    { id: 'dashboard', label: t.overview, icon: 'dashboard' },
    { id: 'catalog', label: t.templates, icon: 'auto_awesome' },
    { id: 'editor', label: t.designs, icon: 'favorite' },
    { id: 'guests', label: t.guests, icon: 'group' },
    { id: 'rsvp', label: t.rsvp, icon: 'event_available' },
  ];

  return (
    <nav className={`
      fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-500 ease-in-out lg:translate-x-0
      ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:opacity-100 opacity-0'}
      flex flex-col p-4 shadow-2xl lg:shadow-none border-r
      ${theme === 'dark' ? 'bg-[#1e293b] border-slate-700' : 'bg-[#fcf9f6] border-stone-200'}
    `}>
      {/* Brand Section */}
      <div className="flex flex-col p-6 mb-8 mt-2">
        <h1 className={`serif font-black text-2xl tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-[#0F172A]'}`}>LuxeInvite</h1>
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">Creator Suite</p>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col gap-1 flex-1 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
              currentView === item.id 
                ? 'bg-[#0F172A] text-white shadow-xl shadow-slate-900/20 translate-x-1' 
                : `${theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-stone-500 hover:bg-stone-100/50 hover:text-stone-800'} hover:translate-x-1`
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-110 ${currentView === item.id ? 'icon-fill text-[#C5A059]' : ''}`}>
              {item.icon}
            </span>
            <span className="serif text-sm font-bold tracking-wide uppercase text-[11px]">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-auto flex flex-col gap-4 p-4 border-t border-stone-100/10">
        <div className="flex items-center justify-between px-2">
          <button onClick={() => setLang(lang === 'id' ? 'en' : 'id')} className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors">
            {lang === 'id' ? 'English' : 'Indonesia'}
          </button>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-[20px] text-stone-400">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
          </button>
        </div>
        
        <button className="flex items-center gap-4 p-3 text-stone-400 hover:text-stone-800 dark:hover:text-white transition-all group">
          <span className="material-symbols-outlined text-[22px] group-hover:rotate-45 transition-transform duration-500">settings</span>
          <span className="serif text-[11px] font-bold uppercase tracking-widest">{t.settings}</span>
        </button>
        <button className="w-full py-4 bg-[#C5A059] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-lg active:scale-95">
          {t.upgrade}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
