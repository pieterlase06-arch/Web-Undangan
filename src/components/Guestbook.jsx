import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import LuxeButton from './ui/LuxeButton';
import LuxeInput from './ui/LuxeInput';
import LuxeCard from './ui/LuxeCard';

/**
 * Guestbook - A premium section for digital well-wishes.
 * Features a split layout with a refined input form and a scrollable message list.
 */
const Guestbook = ({ data = {} }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      // Note: In a real SaaS, this would use a project-specific ID
      const res = await axios.get('http://localhost:3001/api/data');
      if (res.data && res.data.messages) {
        setMessages(res.data.messages.reverse());
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // 10s for better performance
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;
    try {
      await axios.post('http://localhost:3001/api/message', {
        ...newMessage,
        date: new Date().toISOString()
      });
      setNewMessage({ name: '', message: '' });
      fetchMessages();
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none select-none">
        <h1 className="text-[20vw] font-black absolute bottom-10 right-10">WISHES</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">Digital Well-Wishes</p>
          <h2 className="serif text-5xl text-slate-900 font-light italic">Buku Tamu Digital</h2>
          <div className="w-12 h-px bg-indigo-600/30 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Input Panel */}
          <div className="lg:col-span-5">
            <LuxeCard 
              title="Berikan Doa Restu" 
              subtitle="Tuliskan pesan hangat untuk mempelai"
              className="sticky top-10"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <LuxeInput 
                  label="Nama Anda"
                  placeholder="Nama Lengkap..."
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                  icon="person"
                />
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Pesan & Doa</label>
                  <textarea
                    rows="5"
                    className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-6 text-[11px] font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600 focus:shadow-xl focus:shadow-indigo-100/50 transition-all duration-300 resize-none"
                    placeholder="Tuliskan ucapan Anda di sini..."
                    value={newMessage.message}
                    onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                  />
                </div>

                <LuxeButton 
                  fullWidth 
                  size="lg" 
                  icon="send"
                  type="submit"
                >
                  Kirim Ucapan
                </LuxeButton>
              </form>
            </LuxeCard>
          </div>

          {/* Messages Feed */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between px-4 mb-4">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Semua Ucapan ({messages.length})</p>
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>

            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-50/50 rounded-[40px] p-10 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500 group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-[10px]">
                          {msg.name.substring(0, 1).toUpperCase()}
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{msg.name}</p>
                      </div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(msg.date).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <p className="serif text-lg text-slate-600 italic leading-relaxed pl-4 border-l-2 border-indigo-600/20 group-hover:border-indigo-600 transition-colors">
                      "{msg.message}"
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {messages.length === 0 && !loading && (
                <div className="py-20 text-center space-y-4">
                   <span className="material-symbols-outlined text-4xl text-slate-200">chat_bubble_outline</span>
                   <p className="serif text-slate-400 italic">Belum ada pesan. Jadilah yang pertama memberikan ucapan!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
