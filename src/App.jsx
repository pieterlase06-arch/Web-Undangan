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
import config from './config';

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
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [lang, theme]);
  
  const initialInvitation = {
    templateId: 'gold',
    partner1: 'Nama Mempelai Pria',
    partner2: 'Nama Mempelai Wanita',
    partner1Parents: 'Bpk. Ahmad & Ibu Siti',
    partner2Parents: 'Bpk. Yusuf & Ibu Aminah',
    date: new Date().toISOString().split('T')[0],
    time: '08:00',
    venue: 'Lokasi Acara',
    address: 'Alamat Lengkap',
    primaryColor: '#C5A059',
    accentColor: '#1C1917',
    fontFamily: 'serif',
    themeId: 'gold',
    backgroundImage: '',
    groomImage: '',
    brideImage: '',
    musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...',
    stories: [
      { year: '2021', title: 'Pertemuan Pertama', desc: 'Awal segalanya dimulai dari sebuah sapaan hangat.', icon: 'favorite' },
      { year: '2024', title: 'Janji Suci', desc: 'Kami siap melangkah bersama.', icon: 'ring_volume' }
    ],
    gallery: [],
    showStory: true,
    showGallery: true,
    showGift: true,
    showRSVP: true
  };

  const [invitationData, setInvitationData] = useState(initialInvitation);
  const [guests, setGuests] = useState([]);

  // FETCH DESIGN FROM BACKEND ON LOAD
  useEffect(() => {
    const loadFullStackData = async () => {
      try {
        const res = await fetch(`${config.API_URL}/design`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.templateId) {
            setInvitationData(data);
          } else {
            const savedLocal = localStorage.getItem('invitationData');
            if (savedLocal) setInvitationData(JSON.parse(savedLocal));
          }
        }
        
        const savedGuests = localStorage.getItem('guests');
        if (savedGuests) setGuests(JSON.parse(savedGuests));
      } catch (err) {
        console.error("Full-stack data load failed:", err);
      }
    };
    loadFullStackData();
  }, []);

  // SAVE DESIGN TO BACKEND ON CHANGE
  useEffect(() => {
    const saveToFullStack = async () => {
      try {
        await fetch(`${config.API_URL}/design`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invitationData)
        });
      } catch (err) {
        console.error("Backend save failed:", err);
      }
    };

    if (invitationData.partner1 !== 'Nama Mempelai 1') {
      saveToFullStack();
    }
    localStorage.setItem('invitationData', JSON.stringify(invitationData));
    localStorage.setItem('guests', JSON.stringify(guests));
  }, [invitationData, guests]);

  const login = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/desain-saya');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const selectTemplate = (template) => {
    setInvitationData(prev => ({
      ...prev,
      ...template,
      partner1: prev.partner1 || 'Nama Mempelai 1',
      partner2: prev.partner2 || 'Nama Mempelai 2',
    }));
    navigate('/editor');
  };

  const resetInvitation = async () => {
    if (window.confirm('Hapus seluruh data desain dan tanggapan tamu? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        // Reset Local State FIRST
        setInvitationData(initialInvitation);
        setGuests([]);
        localStorage.clear();
        
        // Wipe Backend Data
        await fetch(`${config.API_URL}/all`, { method: 'DELETE' });
        
        alert('Data berhasil dihapus.');
        window.location.reload();
      } catch (err) {
        console.error("Reset failed:", err);
        localStorage.clear();
        window.location.reload();
      }
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
          
          <form onSubmit={login} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm"
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-4">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:border-stone-900 transition-all text-sm"
                placeholder="Enter your password"
              />
            </div>

            {loginError && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">{loginError}</p>}

            <button 
              type="submit"
              className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-stone-800 shadow-xl active:scale-95 transition-all"
            >
              Sign In to Dashboard
            </button>
            <div className="pt-4 border-t border-stone-50">
               <p className="text-[10px] text-stone-300 uppercase tracking-widest">Demo Version 1.2 • Secured with SSL</p>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'} transition-colors duration-300 relative">
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
                <Editor data={invitationData} updateData={(d) => setInvitationData(prev => ({ ...prev, ...d }))} theme={theme} />
              </motion.div>
            } />
            <Route path="/buku-tamu" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <GuestList 
                  guests={guests} 
                  onDelete={deleteGuest} 
                  onStatusUpdate={updateGuestStatus} 
                  onAddGuest={(g) => setGuests(prev => [...prev, { ...g, id: Date.now(), status: 'Sent' }])}
                  theme={theme}
                />
              </motion.div>
            } />
            <Route path="/lacak-rsvp" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <RSVPTracking guests={guests} />
              </motion.div>
            } />
            <Route path="/v" element={
              <PremiumInvitation data={invitationData} forceShowCover={true} />
            } />
            <Route path="*" element={<Navigate to="/desain-saya" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
