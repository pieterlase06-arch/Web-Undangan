import { useState, useRef, useEffect } from 'react';
import { Music, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicToggle = () => {
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
    // Attempt autoplay (might be blocked by browser)
    const playAttempt = setInterval(() => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          clearInterval(playAttempt);
        }).catch(() => {
          // Autoplay blocked, wait for user interaction
        });
      }
    }, 1000);

    return () => clearInterval(playAttempt);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
          isPlaying ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            <Music size={24} />
          </motion.div>
        ) : (
          <Music2 size={24} />
        )}
      </motion.button>

      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-primary/10 whitespace-nowrap"
          >
            <span className="text-xs font-semibold text-primary">Play Music</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicToggle;
