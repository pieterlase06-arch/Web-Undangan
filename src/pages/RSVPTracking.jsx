import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import config from '../config';
import LuxeButton from '../components/ui/LuxeButton';
import LuxeTypography from '../components/ui/LuxeTypography';
import RSVPAnalyticsCard from '../components/rsvp/RSVPAnalyticsCard';
import RSVPEntryRow from '../components/rsvp/RSVPEntryRow';
import WishesCard from '../components/rsvp/WishesCard';

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
      const rsvpsData = rsvpsRes.ok ? await rsvpsRes.json() : [];
      const messagesData = messagesRes.ok ? await messagesRes.json() : [];
      setRsvps(rsvpsData);
      setMessages(messagesData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Connection dropped. Ensure backend is active at ' + API_URL);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteRSVP = async (id) => {
    if (window.confirm('Delete this RSVP entry?')) {
      try {
        const res = await fetch(`${API_URL}/rsvps/${id}`, { method: 'DELETE' });
        if (res.ok) setRsvps(prev => prev.filter(r => r.id !== id));
      } catch { alert('Failed to delete RSVP'); }
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        const res = await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
        if (res.ok) setMessages(prev => prev.filter(m => m.id !== id));
      } catch { alert('Failed to delete message'); }
    }
  };

  const totalGuestsInRSVP = rsvps.reduce((acc, curr) => acc + (parseInt(curr.guests) || 1), 0);

  const stats = [
    { label: 'Invitations Sent', value: guests.length, color: 'text-stone-900', bg: 'bg-white', icon: 'send' },
    { label: 'RSVP Responses', value: rsvps.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: 'check_circle' },
    { label: 'Total Guests (Est)', value: totalGuestsInRSVP, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'group' },
    { label: 'Messages Received', value: messages.length, color: 'text-amber-500', bg: 'bg-amber-50', icon: 'chat' },
  ];

  return (
    <div className="p-6 lg:p-12 max-w-7xl mx-auto flex flex-col gap-12 font-sans bg-[#F8F9FB] min-h-screen">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-10 rounded-[50px] shadow-sm border border-white">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
             <LuxeTypography variant="h1" className="text-stone-900 tracking-tighter italic">Live <span className="text-indigo-600">Analytics</span></LuxeTypography>
          </div>
          <LuxeTypography variant="caption" className="text-stone-400 ml-7">Real-time engagement tracking pipeline</LuxeTypography>
        </div>
        <LuxeButton
          variant="secondary"
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-3 px-8"
        >
          {loading ? 'SYNCING...' : 'REFRESH DATABASE'}
          <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>sync</span>
        </LuxeButton>
      </header>

      {error && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-rose-50 border border-rose-100 p-8 rounded-[40px] flex items-center gap-6 text-rose-600 shadow-xl">
          <span className="material-symbols-outlined text-3xl">warning</span>
          <div>
            <LuxeTypography variant="caption" className="text-rose-400">System Warning</LuxeTypography>
            <LuxeTypography variant="body" className="font-bold opacity-80">{error}</LuxeTypography>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats.map((s, i) => (
          <RSVPAnalyticsCard 
            key={s.label} 
            {...s} 
            index={i} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* RSVP TABLE */}
        <div className="xl:col-span-7 bg-white rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-white overflow-hidden flex flex-col">
          <div className="px-12 py-10 border-b border-stone-50 flex justify-between items-center bg-[#FBFBFF]">
            <h3 className="font-black text-2xl text-stone-900 tracking-tight italic">Attendance <span className="text-indigo-600">Log</span></h3>
            <span className="px-5 py-2 bg-white rounded-2xl text-[10px] font-black text-stone-300 uppercase tracking-widest border border-stone-100 shadow-sm">{rsvps.length} ENTRIES</span>
          </div>
          <div className="bg-white/50 backdrop-blur-xl p-6 rounded-[60px] border border-white">
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                 {rsvps.map((r, i) => (
                   <RSVPEntryRow 
                     key={r.id} 
                     rsvp={r} 
                     onDelete={() => deleteRSVP(r.id)} 
                   />
                 ))}
              </div>
           </div>
        </div>

        {/* MESSAGES LIST */}
        <div className="xl:col-span-5 flex flex-col gap-10">
          <div className="bg-stone-900 rounded-[60px] p-12 text-white shadow-2xl relative overflow-hidden">
            <span className="material-symbols-outlined text-indigo-400 text-5xl mb-8 block">format_quote</span>
            <h3 className="text-4xl font-black mb-4 tracking-tighter italic">Guest <span className="text-indigo-400">Voices</span></h3>
            <LuxeTypography variant="body" className="text-stone-400 font-bold uppercase tracking-widest leading-relaxed">Direct messages and blessings from your global network.</LuxeTypography>
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/20 blur-[100px] rounded-full -mr-20 -mt-20" />
          </div>

          <div className="space-y-6">
              {messages.map((m, i) => (
                <WishesCard 
                  key={m.id} 
                  message={m} 
                  onDelete={() => deleteMessage(m.id)} 
                />
              ))}
              
              {messages.length === 0 && !loading && (
                <div className="bg-white/50 border-4 border-dashed border-stone-100 p-32 rounded-[60px] text-center flex flex-col items-center gap-6 opacity-30">
                  <span className="material-symbols-outlined text-stone-300 text-6xl">chat_bubble</span>
                  <p className="text-stone-400 font-black uppercase tracking-[0.5em] text-[10px]">No messages received</p>
                </div>
              )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
         .custom-scrollbar::-webkit-scrollbar { width: 6px; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
         .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
    </div>
  );
};

export default RSVPTracking;
