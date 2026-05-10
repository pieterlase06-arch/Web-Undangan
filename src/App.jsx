import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import ProjectOverview from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Editor from './pages/Editor';
import GuestList from './pages/GuestList';
import RSVPTracking from './pages/RSVPTracking';
import Sidebar from './components/Sidebar';
import PremiumInvitation from './components/PremiumInvitation';
import SnapPhotoInvitation from './components/SnapPhotoInvitation';
import FloralInvitation from './components/FloralInvitation';
import VogueInvitation from './components/VogueInvitation';
import ElegantMulyoTemplate from './components/ElegantMulyoTemplate';
import LuxeLogin from './components/LuxeLogin';
import config from './config';

const INITIAL_TEMPLATE_DATA = {
  templateId: 'luxury-03',
  title: 'Undangan Baru',
  partner1: 'Mempelai Pria',
  partner2: 'Mempelai Wanita',
  partner1Parents: 'Bpk. & Ibu Pria',
  partner2Parents: 'Bpk. & Ibu Wanita',
  date: new Date().toISOString().split('T')[0],
  dateText: 'SABTU, 12 JULI',
  yearText: '2026',
  countdownDate: '2026-07-12T08:00:00',
  time: '08:00',
  venue: 'Luxe Grand Ballroom',
  location: 'Jakarta, Indonesia',
  address: 'Jl. Contoh Alamat No. 123, Jakarta Selatan',
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  groomImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800',
  brideImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800',
  heroBgImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200',
  mapsLink: 'https://maps.google.com',
  quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...',
  isDarkMode: false,
  showGifts: false,
  bankName: 'BCA',
  bankNumber: '123-456-789',
  bankOwner: 'Mempelai',
  particles: 'petals',
  showStory: true,
  groomTransform: { scale: 1, x: 0, y: 0 },
  brideTransform: { scale: 1, x: 0, y: 0 },
  heroTransform: { scale: 1, x: 0, y: 0 },
  sectionOrder: ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook'],
  sectionVisibility: { hero: true, couple: true, event: true, countdown: true, rsvp: true, guestbook: true },
  headingFont: "'Cinzel', serif",
  bodyFont: "'Inter', sans-serif",
  accentFont: "'Pinyon Script', cursive",
  primaryColor: '#C5A059',
  bgColor: '#FCF9F6',
  surfaceColor: '#FFFFFF',
  textColor: '#1C1917',
  containerPadding: '40',
  contentSpacing: '120',
  borderRadius: '40',
  layoutMode: 'card',
  containerWidth: 'max-w-5xl',
  entranceAnimation: 'reveal',
  customSections: []
};

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
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('projects');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  const [guests, setGuests] = useState(() => {
    try {
      const saved = localStorage.getItem('guests');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('guests', JSON.stringify(guests));
    localStorage.setItem('lang', lang);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [projects, guests, theme, lang]);

  const login = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/desain-saya');
    } else { setLoginError('Invalid credentials'); }
  };

  const createNewProject = (templateId) => {
    const newId = `project-${Date.now()}`;
    const newProject = { ...INITIAL_TEMPLATE_DATA, id: newId, templateId, createdAt: new Date().toISOString() };
    setProjects(prev => [...prev, newProject]);
    navigate(`/editor/${newId}`);
  };

  const updateProject = (id, data) => { setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p)); };
  const deleteProject = (id) => { setProjects(prev => prev.filter(p => p.id !== id)); };

  const addGuest = (guest) => { setGuests(prev => [...prev, { ...guest, id: Date.now() }]); };
  const deleteGuest = (id) => { setGuests(prev => prev.filter(g => g.id !== id)); };
  const updateGuestStatus = (id, status) => { setGuests(prev => prev.map(g => g.id === id ? { ...g, status } : g)); };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isEditor = location.pathname.includes('/editor/');
  const isView = location.pathname.includes('/v/');

  if (!isLoggedIn && !isView) {
    return (
      <LuxeLogin 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        login={login}
        error={loginError}
      />
    );
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-[#0f172a]' : 'bg-[#fcf9f6]'} relative`}>
      {!isEditor && !isView && (
        <Sidebar
          currentView={location.pathname}
          setView={(v) => navigate(v)}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={() => { setIsLoggedIn(false); localStorage.removeItem('isLoggedIn'); navigate('/'); }}
          theme={theme} setTheme={setTheme}
          lang={lang} setLang={setLang}
          isOpen={isSidebarOpen}
        />
      )}
      {!isEditor && !isView && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-8 left-8 z-[600] w-14 h-14 bg-white shadow-2xl rounded-2xl flex items-center justify-center border border-stone-100 active:scale-95 transition-all text-stone-900"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      )}

      <main className={`flex-1 ${(isEditor || isView) ? 'ml-0' : 'lg:ml-64'}`}>
        <Routes location={location} key={location.pathname}>
          <Route path="/desain-saya" element={<ProjectOverview projects={projects} onDelete={deleteProject} />} />
          <Route path="/katalog" element={<Catalog onSelectTemplate={createNewProject} />} />
          <Route path="/editor/:projectId" element={<EditorWrapper projects={projects} updateProject={updateProject} />} />
          <Route path="/v/:projectId" element={<ViewerWrapper projects={projects} />} />
          <Route path="/buku-tamu" element={<GuestList guests={guests} onAddGuest={addGuest} onDelete={deleteGuest} onStatusUpdate={updateGuestStatus} />} />
          <Route path="/lacak-rsvp" element={<RSVPTracking guests={guests} />} />
          <Route path="/" element={<Navigate to="/desain-saya" replace />} />
          <Route path="*" element={<Navigate to="/desain-saya" replace />} />
        </Routes>
      </main>
    </div>
  );
}

const EditorWrapper = ({ projects, updateProject }) => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);
  if (!project) return <Navigate to="/desain-saya" replace />;
  return <Editor data={project} updateData={(d) => updateProject(projectId, d)} />;
};

const ViewerWrapper = ({ projects }) => {
  const { projectId } = useParams();
  const project = projects.find(p => p.id === projectId);
  if (!project) return <div className="p-20 text-center font-black">404 | Project Not Found</div>;
  return (
    <div className="w-full">
      {project.templateId === 'snap-photo' ? <SnapPhotoInvitation data={project} /> : 
       project.templateId === 'floral' ? <FloralInvitation data={project} /> :
       project.templateId === 'vogue' ? <VogueInvitation data={project} /> :
       project.templateId === 'elegant-mulyo' ? <ElegantMulyoTemplate data={project} /> :
       <PremiumInvitation data={project} forceShowCover={true} />}
    </div>
  );
};

export default App;
