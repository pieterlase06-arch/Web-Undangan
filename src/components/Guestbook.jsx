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
    <section id="guestbook" style={{ backgroundColor: 'var(--background)', padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="serif" style={{ fontSize: '40px', color: 'var(--on-surface)', marginBottom: '16px' }}>Guestbook</h2>
          <p className="serif" style={{ fontSize: '18px', color: 'var(--secondary)', fontStyle: 'italic' }}>
            Share your well wishes with the happy couple.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'start' }}>
          {/* Form */}
          <div className="card" style={{ padding: '32px' }}>
            <h4 className="serif" style={{ marginBottom: '24px', fontSize: '20px', color: 'var(--primary)' }}>Write a Message</h4>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.05em' }}>NAME</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  style={{ marginBottom: 0 }}
                  value={newMessage.name}
                  onChange={(e) => setNewMessage({...newMessage, name: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '8px', letterSpacing: '0.05em' }}>MESSAGE</label>
                <textarea
                  placeholder="Your warm wishes..."
                  rows="4"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid var(--outline)', 
                    borderRadius: '8px', 
                    fontFamily: 'var(--font-body)',
                    background: 'transparent',
                    resize: 'none'
                  }}
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({...newMessage, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', itemsCenter: 'center', justifyContent: 'center', gap: '10px' }}>
                SEND MESSAGE <Send size={16} />
              </button>
            </form>
          </div>

          {/* Messages List */}
          <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '16px' }}>
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  style={{ 
                    marginBottom: '24px', 
                    padding: '24px', 
                    backgroundColor: 'white', 
                    borderRadius: '12px',
                    borderLeft: '4px solid var(--primary)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                  }}
                >
                  <p style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '8px', fontSize: '16px' }}>{msg.name}</p>
                  <p className="serif" style={{ fontSize: '16px', color: 'var(--on-surface)', fontStyle: 'italic', lineHeight: '1.6' }}>
                    "{msg.message}"
                  </p>
                  <p style={{ fontSize: '10px', color: 'var(--secondary)', marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {new Date(msg.date).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {messages.length === 0 && !loading && (
              <p className="serif" style={{ textAlign: 'center', color: 'var(--secondary)', fontStyle: 'italic', padding: '40px 0' }}>
                No messages yet. Be the first to wish them well!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
