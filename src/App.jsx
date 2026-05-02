import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Editor from './pages/Editor';
import GuestList from './pages/GuestList';
import RSVPTracking from './pages/RSVPTracking';
import Sidebar from './components/Sidebar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [currentView, setCurrentView] = useState('dashboard');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  // Persist settings
  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [lang, theme]);
  
  // INITIAL DATA
  const initialInvitation = {
    templateId: 'classic',
    partner1: 'Isabella',
    partner2: 'Alexander',
    date: '2024-10-24',
    time: '16:00',
    venue: 'The Botanical Gardens',
    address: '123 Floral Avenue, San Francisco',
    primaryColor: '#0F172A',
    accentColor: '#d4af37',
    fontFamily: 'serif',
    themeId: 'gold',
    backgroundImage: '/assets/themes/gold.png',
  };

  const [invitationData, setInvitationData] = useState(() => {
    const saved = localStorage.getItem('invitationData');
    return saved ? JSON.parse(saved) : initialInvitation;
  });

  const [guests, setGuests] = useState(() => {
    const saved = localStorage.getItem('guests');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Bpk. Budi Santoso', category: 'Keluarga', phone: '08123456789', status: 'Sent' },
      { id: 2, name: 'Siska Amanda', category: 'Teman Kantor', phone: '08129876543', status: 'Opened' },
    ];
  });

  // AUTO-SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('invitationData', JSON.stringify(invitationData));
    localStorage.setItem('guests', JSON.stringify(guests));
  }, [invitationData, guests]);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  const selectTemplate = (template) => {
    setInvitationData(prev => ({
      ...prev,
      templateId: template.id,
      primaryColor: template.primaryColor,
      accentColor: template.accentColor,
      fontFamily: template.fontFamily,
    }));
    setCurrentView('editor');
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen bg-[#fcf9f6] flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl border border-stone-100"
        >
          <h1 className="serif text-5xl font-black text-stone-900 tracking-tighter mb-4">LuxeInvite</h1>
          <p className="text-stone-400 text-sm mb-12 uppercase tracking-widest font-bold">Premium Invitation Suite</p>
          <div className="space-y-4">
            <button 
              onClick={login}
              className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-stone-800 transition-all"
            >
              Sign In to Dashboard
            </button>
            <p className="text-[10px] text-stone-300 uppercase tracking-widest">Demo Version 1.2</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'} transition-colors duration-300`}>
      {/* SIDEBAR NAVIGATION - Hide when editing */}
      {currentView !== 'editor' && (
        <Sidebar 
          currentView={currentView} 
          setView={setCurrentView} 
          onLogout={logout}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${currentView === 'editor' ? 'ml-0' : 'ml-64'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {currentView === 'dashboard' && (
              <Dashboard 
                setView={setCurrentView} 
                invitationData={invitationData}
                guestCount={guests.length}
                theme={theme}
              />
            )}
            {currentView === 'catalog' && <Catalog onSelectTemplate={selectTemplate} theme={theme} />}
            {currentView === 'editor' && (
              <Editor 
                setView={setCurrentView} 
                data={invitationData} 
                updateData={(d) => setInvitationData(prev => ({...prev, ...d}))} 
                lang={lang}
                theme={theme}
              />
            )}
            {currentView === 'guests' && (
              <GuestList 
                guests={guests} 
                onAddGuest={(g) => setGuests(prev => [...prev, {...g, id: Date.now()}])} 
              />
            )}
            {currentView === 'rsvp' && <RSVPTracking guests={guests} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
