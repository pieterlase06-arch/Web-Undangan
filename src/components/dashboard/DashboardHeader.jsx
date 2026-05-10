import { useNavigate } from 'react-router-dom';
import LuxeTypography from '../ui/LuxeTypography';

/**
 * DashboardHeader - The top navigation and action hub for the project dashboard.
 */
const DashboardHeader = ({ projectCount, onExport, onRestore, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
       <div className="space-y-2">
          <LuxeTypography variant="h1" className="text-stone-900 leading-tight">
            Design <span className="text-[#C5A059]">Archive</span>
          </LuxeTypography>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <LuxeTypography variant="detail" className="text-stone-400">
               {projectCount} Designs Syncing
             </LuxeTypography>
          </div>
       </div>

        <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
             <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-stone-400">search</span>
             <input 
               type="text"
               placeholder="Search designs..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full lg:w-80 pl-16 pr-8 py-5 bg-stone-50 border border-stone-100 rounded-[28px] text-xs font-bold focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all outline-none"
             />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onExport}
              title="Backup Library"
              className="w-16 h-16 glass text-stone-900 border border-stone-100 rounded-[24px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center active:scale-95"
            >
              <span className="material-symbols-outlined">backup</span>
            </button>
            
            <button 
              onClick={() => navigate('/katalog')} 
              className="px-10 h-16 bg-stone-900 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-[#C5A059] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
            >
              Initialize Project <span className="material-symbols-outlined text-base">add_circle</span>
            </button>
          </div>
        </div>
    </header>
  );
};

export default DashboardHeader;
