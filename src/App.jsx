import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Editor from './pages/Editor';
import GuestList from './pages/GuestList';
import RSVPTracking from './pages/RSVPTracking';
import Sidebar from './components/Sidebar';
import PremiumInvitation from './components/PremiumInvitation';

// Root Component to handle Routing
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [lang, theme]);
  
  const initialInvitation = {
    templateId: 'gold',
    partner1: 'Alexander',
    partner2: 'Isabella',
    date: '2024-10-24',
    time: '16:00',
    venue: 'The Botanical Gardens',
    address: '123 Floral Avenue, San Francisco',
    primaryColor: '#C5A059',
    accentColor: '#1C1917',
    fontFamily: 'serif',
    themeId: 'gold',
    backgroundImage: './assets/themes/gold.png',
    groomImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    brideImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
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

  useEffect(() => {
    localStorage.setItem('invitationData', JSON.stringify(invitationData));
    localStorage.setItem('guests', JSON.stringify(guests));
  }, [invitationData, guests]);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/desain-saya');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const selectTemplate = (template) => {
    setInvitationData(prev => ({
      ...prev,
      templateId: template.id,
      primaryColor: template.primaryColor,
      accentColor: template.accentColor,
      fontFamily: template.fontFamily,
    }));
    navigate('/editor');
  };

  const resetInvitation = () => {
    if (window.confirm('Are you sure you want to reset your design? This will revert all changes to default.')) {
      setInvitationData(initialInvitation);
      localStorage.removeItem('invitationData');
    }
  };

  const deleteGuest = (id) => {
    if (window.confirm('Delete this guest?')) {
      setGuests(prev => prev.filter(g => g.id !== id));
    }
  };

  const updateGuestStatus = (id, status) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, status } : g));
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isEditor = location.pathname === '/editor';
  const isView = location.pathname === '/v';

  // Allow public access to the invitation view
  if (!isLoggedIn && !isView) {
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
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'} transition-colors duration-300 relative`}>
      {!isEditor && !isView && (
        <div className={`lg:hidden fixed top-0 left-0 right-0 h-16 px-6 flex items-center justify-between z-[60] backdrop-blur-md border-b ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-stone-100'}`}>
           <h1 className={`serif font-black text-xl ${theme === 'dark' ? 'text-white' : 'text-stone-900'}`}>LuxeInvite</h1>
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-stone-900 text-white shadow-lg flex items-center justify-center">
             <span className="material-symbols-outlined">{isSidebarOpen ? 'close' : 'menu'}</span>
           </button>
        </div>
      )}

      {!isEditor && !isView && (
        <Sidebar 
          currentView={location.pathname} 
          setView={(v) => { navigate(v); setIsSidebarOpen(false); }} 
          onLogout={logout}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          isOpen={isSidebarOpen}
        />
      )}

      <main className={`flex-1 overflow-y-auto transition-all duration-500 ${(isEditor || isView) ? 'ml-0' : 'lg:ml-64 pt-16 lg:pt-0'}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/desain-saya" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <Dashboard 
                  setView={(v) => navigate(v)} 
                  invitationData={invitationData} 
                  guestCount={guests.length} 
                  theme={theme} 
                  onReset={resetInvitation}
                />
              </motion.div>
            } />
            <Route path="/templat" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <Catalog onSelectTemplate={selectTemplate} theme={theme} />
              </motion.div>
            } />
            <Route path="/editor" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <Editor setView={(v) => navigate(v)} data={invitationData} updateData={(d) => setInvitationData(prev => ({...prev, ...d}))} lang={lang} theme={theme} />
              </motion.div>
            } />
            <Route path="/daftar-tamu" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <GuestList 
                  guests={guests} 
                  onAddGuest={(g) => setGuests(prev => [...prev, {...g, id: Date.now()}])} 
                  onDeleteGuest={deleteGuest}
                  onUpdateStatus={updateGuestStatus}
                />
              </motion.div>
            } />
            <Route path="/lacak-rsvp" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <RSVPTracking guests={guests} />
              </motion.div>
            } />
            <Route path="/v" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <PremiumInvitation data={invitationData} />
              </motion.div>
            } />
            <Route path="*" element={<Navigate to="/desain-saya" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
