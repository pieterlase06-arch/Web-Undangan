import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const Guestbook = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/data');
      setMessages(res.data.messages.reverse());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.name || !newMessage.message) return;
    try {
      await axios.post('http://localhost:3001/api/message', newMessage);
      setNewMessage({ name: '', message: '' });
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-5xl serif mb-4">Guestbook</h2>
          <p className="text-text-light">Share your well wishes with the happy couple.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="sticky top-10 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-100 rounded-xl bg-accent/30 outline-none focus:ring-1 focus:ring-primary"
                value={newMessage.name}
                onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
              />
              <textarea
                placeholder="Write your message here..."
                rows="4"
                className="w-full p-4 border border-gray-100 rounded-xl bg-accent/30 outline-none focus:ring-1 focus:ring-primary resize-none"
                value={newMessage.message}
                onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
              ></textarea>
              <button type="submit" className="btn w-full flex items-center justify-center gap-2">
                Post Message <Send size={18} />
              </button>
            </form>
          </div>

          {/* Messages List */}
          <div className="md:col-span-3">
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-2xl bg-accent/20 border border-accent"
                  >
                    <p className="font-bold text-primary mb-2">{msg.name}</p>
                    <p className="text-text-light italic">"{msg.message}"</p>
                    <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-tighter">
                      {new Date(msg.date).toLocaleDateString()} • {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
              {messages.length === 0 && !loading && (
                <p className="text-center text-gray-400 py-10">No messages yet. Be the first to wish them well!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
