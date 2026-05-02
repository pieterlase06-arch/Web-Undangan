import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';

const EventDetails = () => {
  const events = [
    {
      title: 'THE CEREMONY',
      date: 'Saturday, January 1, 2027',
      time: '10:00 AM - 12:00 PM',
      location: 'The Grand Palace Ballroom',
      address: '123 Royal Ave, Jakarta, Indonesia',
      mapUrl: 'https://goo.gl/maps/xyz'
    },
    {
      title: 'THE RECEPTION',
      date: 'Saturday, January 1, 2027',
      time: '06:00 PM - 09:00 PM',
      location: 'The Crystal Garden',
      address: '456 Garden St, Jakarta, Indonesia',
      mapUrl: 'https://goo.gl/maps/abc'
    }
  ];

  return (
    <section id="details" style={{ backgroundColor: 'white', padding: '120px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', color: 'var(--secondary)', fontWeight: '600' }}>When & Where</span>
          <h2 className="serif" style={{ fontSize: '48px', color: 'var(--on-surface)', marginTop: '16px' }}>Event Details</h2>
          <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary)', margin: '24px auto' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <h3 className="serif" style={{ fontSize: '24px', marginBottom: '32px', color: 'var(--primary)', letterSpacing: '0.1em' }}>{event.title}</h3>
              
              <div style={{ marginBottom: '40px', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <Calendar size={24} color="var(--primary)" strokeWidth={1.5} />
                  <span style={{ fontSize: '18px', color: 'var(--on-surface)' }}>{event.date}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                  <Clock size={24} color="var(--primary)" strokeWidth={1.5} />
                  <span style={{ fontSize: '18px', color: 'var(--on-surface)' }}>{event.time}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <MapPin size={24} color="var(--primary)" strokeWidth={1.5} />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: '600', marginBottom: '8px', fontSize: '18px' }}>{event.location}</p>
                    <p style={{ color: 'var(--secondary)', fontSize: '15px', lineHeight: '1.6' }}>{event.address}</p>
                  </div>
                </div>
              </div>

              <motion.a 
                href={event.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn"
                style={{ 
                  backgroundColor: 'transparent', 
                  border: '1px solid var(--primary)', 
                  color: 'var(--primary)',
                  width: '100%',
                  marginTop: 'auto'
                }}
                whileHover={{ backgroundColor: 'var(--primary)', color: 'white' }}
              >
                OPEN GOOGLE MAPS
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
