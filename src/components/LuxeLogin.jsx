import { motion } from 'framer-motion';
import LuxeTypography from './ui/LuxeTypography';

const LuxeLogin = ({ username, setUsername, password, setPassword, login, error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center mesh-bg p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C5A059] opacity-10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-stone-200 opacity-20 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl glass rounded-[60px] p-12 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative z-10 border border-white/50"
      >
         <div className="text-center space-y-6 mb-16">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 bg-stone-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-4"
            >
               The Design Studio
            </motion.div>
            <h1 className="serif text-7xl md:text-8xl font-black text-stone-900 tracking-tighter leading-none">
              Luxe<span className="text-[#C5A059]">Invite</span>
            </h1>
            <LuxeTypography variant="caption" className="text-stone-400 font-bold uppercase tracking-[0.6em]">
              Premium Craftsmanship
            </LuxeTypography>
         </div>

         <form onSubmit={login} className="space-y-8">
            <div className="space-y-4">
               <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-slate-900 transition-all">person</span>
                  <input 
                    className="w-full bg-white/50 rounded-3xl p-6 pl-16 outline-none border border-white/40 focus:border-stone-900 focus:bg-white shadow-sm transition-all text-sm font-medium" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Username" 
                  />
               </div>
               <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300 group-focus-within:text-slate-900 transition-all">lock</span>
                  <input 
                    type="password" 
                    className="w-full bg-white/50 rounded-3xl p-6 pl-16 outline-none border border-white/40 focus:border-stone-900 focus:bg-white shadow-sm transition-all text-sm font-medium" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                  />
               </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.p>
            )}

            <button 
              className="w-full py-6 bg-stone-950 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:bg-stone-800 active:scale-[0.98] transition-all"
            >
              Enter Studio
            </button>
         </form>

         <div className="mt-16 text-center border-t border-stone-100 pt-10">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300">© 2026 LuxeInvite Designer Suite</p>
         </div>
      </motion.div>
    </div>
  );
};

export default LuxeLogin;
