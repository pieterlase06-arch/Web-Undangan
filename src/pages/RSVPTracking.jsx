

const RSVPTracking = ({ guests }) => {
  const confirmed = guests.filter(g => g.status === 'Confirmed').length;
  const pending = guests.filter(g => g.status === 'Sent' || g.status === 'Opened').length;
  
  const stats = [
    { label: 'Total Guests', value: guests.length, color: 'text-stone-900', icon: 'group' },
    { label: 'Confirmed', value: confirmed, color: 'text-green-600', icon: 'check_circle' },
    { label: 'Pending', value: pending, color: 'text-amber-500', icon: 'pending' },
    { label: 'Success Rate', value: guests.length > 0 ? Math.round((confirmed / guests.length) * 100) + '%' : '0%', color: 'text-blue-500', icon: 'trending_up' },
  ];

  return (
    <div className="p-10 max-w-[1200px] mx-auto flex flex-col gap-10">
      <header>
        <h1 className="serif text-3xl text-stone-900">Live RSVP Tracking</h1>
        <p className="text-stone-500 mt-1">Data synced automatically from your guest list.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-stone-100 shadow-sm">
            <span className={`material-symbols-outlined mb-4 ${s.color}`}>{s.icon}</span>
            <p className="text-4xl serif font-bold text-stone-900">{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-50 font-bold serif text-lg">Confirmed Responses</div>
        <div className="divide-y divide-stone-50">
          {guests.filter(g => g.status === 'Confirmed').map((g, i) => (
            <div key={i} className="px-8 py-4 flex justify-between items-center">
              <span className="serif font-bold text-stone-800">{g.name}</span>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full">Confirmed</span>
            </div>
          ))}
          {confirmed === 0 && <div className="p-10 text-center text-stone-400 italic">No confirmations yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default RSVPTracking;
