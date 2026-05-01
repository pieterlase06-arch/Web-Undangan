import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'yes',
    guests: 1
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('http://localhost:3001/api/rsvp', formData);
      setStatus('success');
      setFormData({ name: '', attendance: 'yes', guests: 1 });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="bg-accent">
      <div className="container max-w-2xl">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border border-primary/10">
          <h2 className="text-4xl serif text-center mb-8">RSVP</h2>
          <p className="text-center text-text-light mb-10">Please let us know if you can join our special day.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Will you attend?</label>
              <select
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={formData.attendance}
                onChange={(e) => setFormData({...formData, attendance: e.target.value})}
              >
                <option value="yes">Yes, I will be there</option>
                <option value="no">Sorry, I can't come</option>
              </select>
            </div>

            {formData.attendance === 'yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-semibold mb-2">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                />
              </motion.div>
            )}

            <button 
              type="submit" 
              className="btn w-full py-4 text-lg mt-4"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Confirm RSVP'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-center mt-4">Thank you for your response!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-center mt-4">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
