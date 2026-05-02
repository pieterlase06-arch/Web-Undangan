import { motion } from 'framer-motion';

const RSVP = () => {

  return (
    <section id="rsvp" className="relative py-24 bg-background overflow-hidden">
      {/* Decorative Layers */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-tertiary-container/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container max-w-2xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-outline-variant/30 overflow-hidden"
        >
          {/* RSVP Header Layer */}
          <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1510076857177-7470076d4098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
          </div>

          <div className="px-8 sm:px-12 pb-12 -mt-12 relative z-10 bg-white rounded-t-3xl">
            <div className="text-center mb-12">
              <h2 className="serif text-[42px] text-on-surface mb-2">RSVP</h2>
              <p className="text-on-surface-variant italic">The wedding of Emma & James • August 12, 2024</p>
            </div>

            <form className="space-y-8">
              {/* Layer: Guest Name */}
              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold absolute -top-2 left-0 bg-white px-1">Guest Name(s)</label>
                <input 
                  type="text" 
                  placeholder="Please enter your full name"
                  className="w-full border-b border-outline-variant py-3 focus:border-primary transition-colors outline-none text-lg"
                />
              </div>

              {/* Layer: Attendance Toggle Cards */}
              <div className="pt-4">
                <p className="text-center text-[12px] uppercase tracking-[0.2em] text-on-surface mb-6 font-bold">Will you be attending?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="relative cursor-pointer group">
                    <input type="radio" name="attendance" value="yes" className="peer sr-only" />
                    <div className="p-6 border border-outline-variant rounded-xl text-center transition-all peer-checked:bg-secondary-container peer-checked:border-secondary group-hover:bg-surface-container-low">
                      <span className="material-symbols-outlined text-3xl mb-2 block">celebration</span>
                      <p className="serif text-xl">Joyfully Accept</p>
                    </div>
                  </label>

                  <label className="relative cursor-pointer group">
                    <input type="radio" name="attendance" value="no" className="peer sr-only" />
                    <div className="p-6 border border-outline-variant rounded-xl text-center transition-all peer-checked:bg-tertiary-container peer-checked:border-tertiary group-hover:bg-surface-container-low">
                      <span className="material-symbols-outlined text-3xl mb-2 block">mail</span>
                      <p className="serif text-xl">Regretfully Decline</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Layer: Guest Count */}
              <div className="pt-4">
                <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold block mb-2">Total number attending</label>
                <select className="w-full border-b border-outline-variant py-3 focus:border-primary transition-colors outline-none bg-transparent">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>

              <div className="pt-8 text-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white px-12 py-4 rounded-full text-[14px] uppercase tracking-widest font-bold shadow-lg shadow-primary/20"
                >
                  Send RSVP
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
