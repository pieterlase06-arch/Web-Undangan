import { motion } from 'framer-motion';
import LuxeButton from './ui/LuxeButton';
import LuxeInput from './ui/LuxeInput';
import LuxeSelect from './ui/LuxeSelect';
import LuxeCard from './ui/LuxeCard';

/**
 * RSVP - A high-fidelity form for guest attendance confirmation.
 * Integrated with the Luxe atomic UI kit for a professional SaaS feel.
 */
const RSVP = ({ data = {} }) => {
  const attendanceOptions = [
    { id: 'yes', label: 'Joyfully Accept' },
    { id: 'no', label: 'Regretfully Decline' }
  ];

  const guestOptions = [
    { id: '1', label: '1 Guest' },
    { id: '2', label: '2 Guests' },
    { id: '3', label: '3 Guests' },
    { id: '4', label: '4 Guests' },
    { id: '5', label: '5+ Guests' }
  ];

  return (
    <section className="py-32 px-6 bg-[#f8f9fa] relative overflow-hidden">
      {/* Decorative Branding */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <h1 className="text-[20vw] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">CONFIRM</h1>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <LuxeCard 
          className="overflow-hidden"
          padding="p-0"
        >
          {/* Hero Banner Layer */}
          <div className="h-64 bg-slate-900 relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=1200" 
               className="w-full h-full object-cover opacity-50 grayscale"
               alt="RSVP Background"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
             <div className="absolute bottom-8 left-12">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-2">Registration</p>
                <h2 className="serif text-5xl text-slate-900 font-light italic">RSVP</h2>
             </div>
          </div>

          <div className="p-12 md:p-16 space-y-12">
            <div className="space-y-4">
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Kami sangat menantikan kehadiran Anda di hari bahagia kami. Mohon konfirmasi kehadiran Anda melalui formulir di bawah ini.
              </p>
            </div>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <LuxeInput 
                label="Nama Lengkap"
                placeholder="Masukkan nama Anda..."
                icon="person"
              />

              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Konfirmasi Kehadiran</label>
                <div className="grid grid-cols-2 gap-4">
                  {attendanceOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className="group relative p-8 rounded-[32px] border-2 border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-600 transition-all duration-500 text-center"
                    >
                      <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-indigo-600 transition-all mb-4 block">
                        {opt.id === 'yes' ? 'celebration' : 'sentiment_dissatisfied'}
                      </span>
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-all">{opt.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <LuxeSelect 
                label="Jumlah Tamu"
                options={guestOptions}
                onChange={(val) => console.log(val)}
                placeholder="Pilih jumlah tamu..."
              />

              <div className="pt-8">
                <LuxeButton 
                  fullWidth 
                  size="lg"
                  icon="send"
                >
                  Kirim Konfirmasi
                </LuxeButton>
              </div>
            </form>
          </div>
        </LuxeCard>
      </div>
    </section>
  );
};

export default RSVP;
