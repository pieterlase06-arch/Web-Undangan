import { useState, useEffect } from 'react';

import config from '../config';

const API_URL = config.API_URL;


const RSVPTracking = ({ guests }) => {
  const [rsvps, setRsvps] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [rsvpsRes, messagesRes] = await Promise.all([
        fetch(`${API_URL}/rsvps`),
        fetch(`${API_URL}/messages`)
      ]);
      
      if (!rsvpsRes.ok || !messagesRes.ok) throw new Error("Server response failed");
      
      const rsvpsData = await rsvpsRes.json();
      const messagesData = await messagesRes.json();
      setRsvps(rsvpsData);
      setMessages(messagesData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Cannot connect to live server. Please ensure the backend is running at " + API_URL);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteRSVP = async (id) => {
    if (window.confirm('Hapus entri RSVP ini?')) {
      try {
        const res = await fetch(`${API_URL}/rsvp/${id}`, { method: 'DELETE' });
        if (res.ok) {
           setRsvps(prev => prev.filter(r => r.id !== id));
        }
      } catch (err) {
        alert("Gagal menghapus RSVP");
      }
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Hapus ucapan ini?')) {
      try {
        const res = await fetch(`${API_URL}/message/${id}`, { method: 'DELETE' });
        if (res.ok) {
           setMessages(prev => prev.filter(m => m.id !== id));
        }
      } catch (err) {
        alert("Gagal menghapus pesan");
      }
    }
  };

  const confirmedCount = rsvps.filter(r => r.attendance === 'yes' || r.attendance === true).length;
  const totalGuestsInRSVP = rsvps.reduce((acc, curr) => acc + (parseInt(curr.guests) || 1), 0);
  
  const stats = [
    { label: 'Invitations Sent', value: guests.length, color: 'text-stone-900', icon: 'send' },
    { label: 'RSVP Responses', value: rsvps.length, color: 'text-green-600', icon: 'check_circle' },
    { label: 'Total Guests (Est)', value: totalGuestsInRSVP, color: 'text-blue-500', icon: 'group' },
    { label: 'Prayers & Wishes', value: messages.length, color: 'text-amber-500', icon: 'chat' },
  ];

  return (
    <div className="p-4 lg:p-10 max-w-[1400px] mx-auto flex flex-col gap-8 transition-all duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="serif text-3xl lg:text-4xl text-stone-900 font-black tracking-tight">Live Analytics</h1>
          <p className="text-stone-500 mt-1 italic text-sm">Real-time engagement from your digital invitation.</p>
        </div>
        <button 
          onClick={fetchData} 
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-[10px] font-black uppercase tracking-widest text-stone-600 disabled:opacity-50"
        >
           {loading ? 'Synchronizing...' : 'Refresh Database'}
           <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
        </button>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-100 p-6 rounded-[30px] flex items-center gap-4 text-red-600 animate-pulse">
           <span className="material-symbols-outlined">error</span>
           <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-stone-50 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className={`w-12 h-12 rounded-2xl ${s.color} bg-current/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <p className="text-4xl serif font-black text-stone-900 tracking-tighter">{s.value}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mt-2">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* RSVP TABLE */}
        <div className="xl:col-span-7 bg-white rounded-[40px] border border-stone-50 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-stone-50 flex justify-between items-center bg-stone-50/30">
             <h3 className="serif font-black text-xl text-stone-900">Attendance Log</h3>
             <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">{rsvps.length} Entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 border-b border-stone-50">
                   <th className="px-8 py-6">Guest Name</th>
                   <th className="px-8 py-6">Status</th>
                   <th className="px-8 py-6 text-center">Qty</th>
                   <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {rsvps.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <p className="serif font-bold text-stone-800 text-lg">{r.name}</p>
                      <p className="text-[9px] text-stone-400 uppercase font-black tracking-widest mt-0.5">{new Date(r.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full ${r.attendance === 'yes' || r.attendance === true ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-stone-100 text-stone-400'}`}>
                        {r.attendance === 'yes' || r.attendance === true ? 'Attending' : 'Declined'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-stone-600">
                      {r.guests || 1}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => deleteRSVP(r.id)}
                        className="opacity-0 group-hover:opacity-100 p-3 text-stone-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                        title="Delete Entry"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rsvps.length === 0 && !loading && (
              <div className="p-20 text-center flex flex-col items-center gap-6">
                 <div className="w-20 h-20 rounded-full bg-stone-50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-stone-200 text-4xl">inbox</span>
                 </div>
                 <p className="text-stone-400 italic text-sm">Waiting for the first response...</p>
              </div>
            )}
          </div>
        </div>

        {/* MESSAGES LIST */}
        <div className="xl:col-span-5 flex flex-col gap-8">
           <div className="bg-stone-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
              <span className="material-symbols-outlined text-[#C5A059] text-4xl mb-6">format_quote</span>
              <h3 className="serif text-3xl font-bold mb-2">Guest Wishes</h3>
              <p className="text-stone-400 text-sm leading-relaxed">Sweet messages and prayers sent by your loved ones.</p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
           </div>

           <div className="space-y-4 flex-1 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
              {messages.map((m) => (
                <div key={m.id} className="bg-white p-8 rounded-[35px] border border-stone-50 shadow-sm hover:shadow-md transition-all group relative">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-2xl bg-stone-50 text-stone-400 flex items-center justify-center font-black text-sm border border-stone-100">
                            {m.name.charAt(0)}
                         </div>
                         <div>
                            <span className="serif font-black text-stone-800 block">{m.name}</span>
                            <span className="text-[8px] text-stone-300 uppercase font-black tracking-widest">{new Date(m.date).toLocaleString('id-ID')}</span>
                         </div>
                      </div>
                      <button 
                        onClick={() => deleteMessage(m.id)}
                        className="opacity-0 group-hover:opacity-100 p-3 text-stone-200 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                   </div>
                   <p className="text-stone-600 text-sm leading-relaxed italic border-l-4 border-stone-100 pl-4 py-1">"{m.message}"</p>
                   
                   <div className="mt-6 flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[10px] font-black text-stone-300 uppercase tracking-widest">
                         <span className="material-symbols-outlined text-[14px] text-pink-400 icon-fill">favorite</span>
                         {m.likes || 0} Likes
                      </div>
                   </div>
                </div>
              ))}
              {messages.length === 0 && !loading && (
                <div className="bg-stone-50/50 border-2 border-dashed border-stone-100 p-20 rounded-[40px] text-center flex flex-col items-center gap-4">
                   <span className="material-symbols-outlined text-stone-200 text-5xl">chat_bubble</span>
                   <p className="text-stone-300 font-bold uppercase tracking-widest text-[10px]">No wishes yet</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPTracking;
