import LuxeTypography from '../ui/LuxeTypography';
import LuxeButton from '../ui/LuxeButton';

/**
 * GuestHeader - Top action hub for the Guest Intelligence system.
 */
const GuestHeader = ({ guestCount, onImport, onExport, onBlast }) => {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-10 rounded-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-white">
       <div className="space-y-3">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse" />
             <LuxeTypography variant="h1" className="text-stone-900 tracking-tighter">
               Guest <span className="text-indigo-600 italic underline decoration-4 underline-offset-8">Intelligence</span>
             </LuxeTypography>
          </div>
          <LuxeTypography variant="caption" className="text-stone-400 ml-7">
            Master Control for {guestCount} Registered Guests
          </LuxeTypography>
       </div>
       <div className="flex flex-wrap gap-4">
          <LuxeButton variant="secondary" onClick={onImport}>
             <span className="material-symbols-outlined text-[18px]">upload_file</span> IMPORT CSV
          </LuxeButton>
          <LuxeButton variant="secondary" onClick={onExport}>
             <span className="material-symbols-outlined text-[18px]">download</span> EXPORT
          </LuxeButton>
          <LuxeButton variant="primary" onClick={onBlast}>
             <span className="material-symbols-outlined text-[18px]">campaign</span> WHATSAPP BLAST
          </LuxeButton>
       </div>
    </header>
  );
};

export default GuestHeader;
