
const Dashboard = ({ setView, invitationData, guestCount, theme, onReset }) => {
  const isDark = theme === 'dark';
  const cardClass = isDark ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-stone-100';
  const textClass = isDark ? 'text-white' : 'text-stone-900';
  const mutedClass = isDark ? 'text-slate-400' : 'text-stone-500';

  return (
    <div className={`p-4 lg:p-10 max-w-[1200px] mx-auto flex flex-col gap-6 lg:gap-10 transition-colors duration-300 pb-24 lg:pb-10`}>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:gap-0">
        <div>
          <h1 className={`serif text-3xl lg:text-4xl ${textClass}`}>Welcome back, Piter</h1>
          <p className={`${mutedClass} mt-2 italic text-sm`}>Ready to craft your next masterpiece?</p>
        </div>
        <button 
          onClick={() => setView('/templat')}
          className="w-full sm:w-auto bg-[#C5A059] text-white px-8 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          + Create New Invitation
        </button>
      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
        <div className={`${cardClass} p-6 lg:p-8 rounded-3xl border shadow-sm flex flex-col gap-4 transition-colors`}>
          <span className="material-symbols-outlined text-amber-500 text-3xl">favorite</span>
          <p className={`text-3xl lg:text-4xl serif font-bold ${textClass}`}>1</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Active Design</p>
        </div>
        <div className={`${cardClass} p-6 lg:p-8 rounded-3xl border shadow-sm flex flex-col gap-4 transition-colors`}>
          <span className="material-symbols-outlined text-blue-500 text-3xl">group</span>
          <p className={`text-3xl lg:text-4xl serif font-bold ${textClass}`}>{guestCount}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Guests Tracked</p>
        </div>
        <div className="bg-[#0F172A] p-6 lg:p-8 rounded-3xl shadow-2xl flex flex-col gap-4 text-white relative overflow-hidden sm:col-span-2 md:col-span-1">
          <span className="material-symbols-outlined text-[#C5A059] text-3xl">auto_awesome</span>
          <p className="text-3xl lg:text-4xl serif font-bold">12</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">Days to Event</p>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full"></div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className={`lg:col-span-8 ${cardClass} rounded-3xl border shadow-sm overflow-hidden flex flex-col transition-colors`}>
          <div className="p-6 lg:p-8 border-b border-stone-50/10 flex justify-between items-center">
            <h2 className={`serif text-xl lg:text-2xl ${textClass}`}>Current Design</h2>
            <button onClick={() => setView('/editor')} className="text-[#C5A059] font-bold text-[10px] uppercase tracking-widest hover:underline">Edit Canvas</button>
          </div>
          <div className="p-6 lg:p-8 flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-10">
            <div className={`w-full sm:w-48 aspect-[4/5] rounded-xl border shadow-inner flex items-center justify-center p-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-50 border-stone-100'}`}>
               <div className="w-full h-full bg-white shadow-lg rounded-sm border border-stone-50 flex flex-col items-center justify-center text-[8px] gap-2 p-4 text-center overflow-hidden">
                  <p className="serif font-bold scale-[0.6] opacity-40 text-stone-900">{invitationData.partner1} & {invitationData.partner2}</p>
                  <div className="w-4 h-px bg-stone-100" />
                  <p className="opacity-20 scale-[0.5] text-stone-900">{invitationData.venue}</p>
               </div>
            </div>
            <div className="space-y-6 flex-1 text-center sm:text-left">
               <div>
                 <h3 className={`serif text-xl font-bold ${textClass}`}>{invitationData.partner1} & {invitationData.partner2} Wedding</h3>
                 <p className="text-stone-400 text-sm mt-1">Last edited 2 minutes ago</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setView('/editor')} className="bg-[#C5A059] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl hover:brightness-110 transition-all">Resume Design</button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('https://pieterlase06-arch.github.io/Web-Undangan/');
                      alert('Link copied to clipboard!');
                    }}
                    className={`px-6 py-3 border rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-stone-200 text-stone-500 hover:bg-stone-50'}`}
                  >
                    Share Link
                  </button>
                  <button 
                    onClick={onReset}
                    className={`p-3 border rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50 transition-all border-transparent`}
                    title="Delete / Reset Design"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
           <div className="bg-[#C5A059] p-6 lg:p-8 rounded-3xl text-white shadow-xl flex flex-col gap-4">
              <h3 className="serif text-xl">Upgrade to Gold</h3>
              <p className="text-white/80 text-sm leading-relaxed">Unlock premium layouts, music integration, and custom domains.</p>
              <button className="bg-white text-[#C5A059] py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest mt-2 hover:bg-[#F8F5F2] transition-all">Go Premium</button>
           </div>
           <div className={`p-6 lg:p-8 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-stone-50 border-stone-200'}`}>
              <span className="material-symbols-outlined text-stone-400">help</span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Need Help?</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
