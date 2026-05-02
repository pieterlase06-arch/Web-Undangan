import { useState, useEffect } from 'react';

const RSVPTracking = ({ guests }) => {
  const [rsvps, setRsvps] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [rsvpsRes, messagesRes] = await Promise.all([
        fetch('http://localhost:3001/api/rsvps'),
        fetch('http://localhost:3001/api/messages')
      ]);
      const rsvpsData = await rsvpsRes.json();
      const messagesData = await messagesRes.json();
      setRsvps(rsvpsData);
      setMessages(messagesData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteRSVP = async (index) => {
    if (window.confirm('Delete this RSVP entry?')) {
      try {
        await fetch(`http://localhost:3001/api/rsvp/${index}`, { method: 'DELETE' });
        fetchData();
      } catch (err) {
        alert("Failed to delete RSVP");
      }
    }
  };

  const deleteMessage = async (index) => {
    if (window.confirm('Delete this message?')) {
      try {
        await fetch(`http://localhost:3001/api/message/${index}`, { method: 'DELETE' });
        fetchData();
      } catch (err) {
        alert("Failed to delete message");
      }
    }
  };

  const confirmedCount = rsvps.filter(r => r.attendance === 'yes' || r.attendance === true).length;
  const pendingCount = Math.max(0, guests.length - confirmedCount);
  
  const stats = [
    { label: 'Guests List', value: guests.length, color: 'text-stone-900', icon: 'group' },
    { label: 'Live Confirmed', value: confirmedCount, color: 'text-green-600', icon: 'check_circle' },
    { label: 'Wishes Received', value: messages.length, color: 'text-blue-500', icon: 'chat' },
    { label: 'Est. Pending', value: pendingCount, color: 'text-amber-500', icon: 'pending' },
  ];

  return (
    <div className="p-10 max-w-[1200px] mx-auto flex flex-col gap-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="serif text-3xl text-stone-900">Live Tracking Dashboard</h1>
          <p className="text-stone-500 mt-1">Real-time data from guest responses and wishes.</p>
        </div>
        <button onClick={fetchData} className="p-2 text-stone-400 hover:text-stone-900 transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
           {loading ? 'Syncing...' : 'Refresh Data'}
           <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>refresh</span>
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RSVP TABLE */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-stone-50 font-bold serif text-lg flex justify-between items-center">
             <span>Guest Responses</span>
          </div>
          <div className="divide-y divide-stone-50">
            {rsvps.map((r, i) => (
              <div key={i} className="px-8 py-5 flex justify-between items-center hover:bg-stone-50/50 transition-all group">
                <div className="flex flex-col gap-1">
                  <span className="serif font-bold text-stone-800">{r.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">{new Date(r.date).toLocaleDateString()}</span>
                    <span className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">•</span>
                    <span className="text-[9px] text-stone-400 uppercase font-bold tracking-widest">{r.guests || 1} Guests</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-[9px] font-bold uppercase rounded-full ${r.attendance === 'yes' || r.attendance === true ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {r.attendance === 'yes' || r.attendance === true ? 'Attending' : 'Declined'}
                  </span>
                  <button 
                    onClick={() => deleteRSVP(i)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
            {rsvps.length === 0 && !loading && (
              <div className="p-10 text-center text-stone-400 italic text-sm">No responses yet.</div>
            )}
          </div>
        </div>

        {/* MESSAGES LIST */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-stone-50 font-bold serif text-lg flex justify-between items-center">
             <span>Guest Wishes & Prayers</span>
          </div>
          <div className="divide-y divide-stone-50">
            {messages.map((m, i) => (
              <div key={i} className="px-8 py-6 space-y-3 hover:bg-stone-50/50 transition-all group relative">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center font-bold text-xs uppercase">
                         {m.name.charAt(0)}
                      </div>
                      <span className="serif font-bold text-stone-800">{m.name}</span>
                   </div>
                   <button 
                    onClick={() => deleteMessage(i)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                   >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <p className="text-stone-600 text-sm italic leading-relaxed">"{m.message}"</p>
                <p className="text-[9px] text-stone-300 uppercase font-bold tracking-widest">{new Date(m.date).toLocaleString()}</p>
              </div>
            ))}
            {messages.length === 0 && !loading && (
              <div className="p-10 text-center text-stone-400 italic text-sm">No wishes received yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPTracking;
