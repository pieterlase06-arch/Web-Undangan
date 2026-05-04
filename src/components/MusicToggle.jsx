import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MusicToggle - A floating musical controller for the invitation.
 * Features a minimalist glassmorphism design with a rotating record animation.
 */
const MusicToggle = ({ url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Autoplay logic
    const handleAutoplay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => console.log("Autoplay blocked by browser"));
      }
    };

    window.addEventListener('click', handleAutoplay, { once: true });
    return () => window.removeEventListener('click', handleAutoplay);
  }, []);

  return (
    <div className="fixed bottom-32 right-8 z-[100] flex items-center gap-4">
      <audio ref={audioRef} src={url} loop />
      
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="bg-white/80 backdrop-blur-xl px-6 py-2.5 rounded-full shadow-2xl border border-white/50"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Play Music</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 transition-all duration-700
          ${isPlaying ? 'bg-indigo-600 border-indigo-100' : 'bg-white border-slate-50'}
        `}
      >
        <div className={`relative w-full h-full flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
           {/* Center Point */}
           <div className={`w-2 h-2 rounded-full absolute z-10 ${isPlaying ? 'bg-white' : 'bg-indigo-600'}`} />
           
           {/* Icon */}
           <span className={`material-symbols-outlined text-2xl ${isPlaying ? 'text-white' : 'text-slate-400'}`}>
              {isPlaying ? 'pause' : 'music_note'}
           </span>
           
           {/* Record Grooves */}
           <div className="absolute inset-1 border border-white/20 rounded-full" />
           <div className="absolute inset-3 border border-white/10 rounded-full" />
        </div>
      </motion.button>
    </div>
  );
};

export default MusicToggle;
