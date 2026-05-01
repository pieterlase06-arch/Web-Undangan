import React from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import RSVP from './components/RSVP';
import Guestbook from './components/Guestbook';
import MusicToggle from './components/MusicToggle';

function App() {
  return (
    <div className="app">
      <MusicToggle />
      <Hero />
      <Countdown targetDate="2027-01-01T10:00:00" />
      
      <section className="bg-white py-24 text-center">
        <div className="container max-w-3xl">
          <h2 className="text-4xl serif mb-8 italic">"And so the adventure begins..."</h2>
          <p className="text-xl text-text-light font-light leading-relaxed">
            We are overjoyed to invite you to join us as we celebrate our love and 
            begin our journey together. Your presence would mean the world to us 
            as we exchange vows and start our new chapter.
          </p>
        </div>
      </section>

      <EventDetails />
      
      <section className="h-[60vh] relative flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
            filter: 'brightness(0.6)'
          }}
        />
        <div className="relative z-10 text-center text-white">
          <h2 className="text-6xl serif italic">Save the Date</h2>
        </div>
      </section>

      <Guestbook />
      <RSVP />

      <footer className="bg-accent py-12 text-center">
        <div className="container">
          <h3 className="serif text-2xl text-primary mb-4">Romeo & Juliet</h3>
          <p className="text-text-light text-sm tracking-widest uppercase">Thank you for being part of our story</p>
          <div className="mt-8 pt-8 border-t border-primary/10">
            <p className="text-xs text-gray-400">© 2026 Missing Piece Inspired Invitation. Built with Love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
