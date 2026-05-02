import React from 'react';

const Sidebar = ({ currentView, setView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: 'dashboard' },
    { id: 'catalog', label: 'Templates', icon: 'auto_awesome' },
    { id: 'editor', label: 'My Designs', icon: 'favorite' },
    { id: 'guests', label: 'Guest Lists', icon: 'group' },
    { id: 'rsvp', label: 'RSVP Tracking', icon: 'event_available' },
  ];

  return (
    <nav className="h-screen w-64 border-r border-stone-200 bg-[#fcf9f6] fixed left-0 top-0 flex flex-col p-4 z-50 shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
      {/* Brand Section */}
      <div className="flex flex-col p-6 mb-8 mt-2">
        <h1 className="serif font-black text-2xl tracking-tighter text-[#0F172A]">LuxeInvite</h1>
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
                : 'text-stone-500 hover:bg-stone-100/50 hover:text-stone-800 hover:translate-x-1'
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
      <div className="mt-auto flex flex-col gap-2 p-4 border-t border-stone-100">
        <button className="flex items-center gap-4 p-3 text-stone-400 hover:text-stone-800 transition-all group">
          <span className="material-symbols-outlined text-[22px] group-hover:rotate-45 transition-transform duration-500">settings</span>
          <span className="serif text-[11px] font-bold uppercase tracking-widest">Settings</span>
        </button>
        <button className="mt-4 w-full py-4 bg-[#C5A059] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-lg shadow-amber-700/10 active:scale-95">
          Upgrade to Gold
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
