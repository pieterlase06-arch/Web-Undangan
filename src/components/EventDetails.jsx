import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';

const EventDetails = () => {
  const events = [
    {
      title: 'The Ceremony',
      date: 'Saturday, January 1, 2027',
      time: '10:00 AM - 12:00 PM',
      location: 'The Grand Palace Ballroom',
      address: '123 Royal Ave, Jakarta, Indonesia',
      mapUrl: 'https://goo.gl/maps/xyz'
    },
    {
      title: 'The Reception',
      date: 'Saturday, January 1, 2027',
      time: '06:00 PM - 09:00 PM',
      location: 'The Crystal Garden',
      address: '456 Garden St, Jakarta, Indonesia',
      mapUrl: 'https://goo.gl/maps/abc'
    }
  ];

  return (
    <section id="details" className="bg-white">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-5xl serif mb-4">Event Details</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-10 border border-accent rounded-2xl hover:shadow-xl transition-shadow bg-[#fafafa]"
            >
              <h3 className="text-3xl serif mb-6 text-primary">{event.title}</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <Calendar className="text-primary w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-primary w-5 h-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary w-5 h-5 mt-1" />
                  <div>
                    <p className="font-bold">{event.location}</p>
                    <p className="text-text-light">{event.address}</p>
                  </div>
                </div>
              </div>

              <a 
                href={event.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn w-full text-center"
              >
                View on Google Maps
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
