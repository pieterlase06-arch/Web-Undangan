import { motion } from 'framer-motion';

/**
 * Hero - The flagship opening section of the invitation.
 * Features a high-density "Industrial Luxe" design with layered depth.
 */
const Hero = ({ 
  partner1 = "Eleanor", 
  partner2 = "James", 
  date = "Saturday, October 14th",
  year = "2024",
  venue = "The Botanical Gardens",
  location = "San Francisco, California",
  image = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
}) => {
  const reveal = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Media Layer */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={image}
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
          alt="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-5xl px-8 text-center pt-20">
        <motion.div {...reveal} transition={{ delay: 0.2 }} className="space-y-6">
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white shadow-2xl">
            Save Our Date
          </span>
          
          <h1 className="flex flex-col items-center gap-2">
            <span className="serif text-6xl md:text-[120px] text-white leading-none font-light drop-shadow-2xl">
              {partner1}
            </span>
            <span className="script-font text-5xl md:text-7xl text-white/80 lowercase italic my-[-10px] md:my-[-30px]">
              &
            </span>
            <span className="serif text-6xl md:text-[120px] text-white leading-none font-light drop-shadow-2xl">
              {partner2}
            </span>
          </h1>

          <div className="flex flex-col items-center gap-8 mt-12">
            <div className="h-20 w-px bg-gradient-to-b from-white/60 to-transparent" />
            
            <div className="space-y-2">
              <p className="text-stone-900 font-bold text-lg md:text-xl uppercase tracking-[0.2em]">
                {date}
              </p>
              <p className="text-stone-500 font-medium text-xs md:text-sm uppercase tracking-[0.3em]">
                {year}
              </p>
            </div>

            <div className="space-y-1">
              <p className="serif text-2xl md:text-3xl text-stone-900 italic font-medium">
                {venue}
              </p>
              <p className="text-stone-400 text-xs md:text-sm uppercase tracking-widest">
                {location}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-stone-400">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-stone-200 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
