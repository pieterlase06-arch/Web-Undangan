import { useNavigate } from 'react-router-dom';
import LuxeTypography from '../ui/LuxeTypography';

/**
 * DashboardHeader - The top navigation and action hub for the project dashboard.
 */
const DashboardHeader = ({ projectCount, onExport, onRestore }) => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
       <div className="space-y-2">
          <LuxeTypography variant="h1" className="text-stone-900">
            My <span className="text-[#C5A059]">Designs</span>
          </LuxeTypography>
          <LuxeTypography variant="detail" className="text-stone-400">
            Vault Capacity: {projectCount} / ∞
          </LuxeTypography>
       </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={onExport}
            className="px-8 py-5 glass text-stone-900 border border-stone-100 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_download</span> Export
          </button>
          
          <label className="px-8 py-5 glass text-stone-900 border border-stone-100 rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span> Restore
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              onChange={onRestore}
            />
          </label>

          <button 
            onClick={() => navigate('/katalog')} 
            className="px-10 py-5 bg-stone-950 text-white rounded-[28px] font-black uppercase tracking-[0.3em] text-[10px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:bg-[#C5A059] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
          >
            New Project <span className="material-symbols-outlined text-base">add_circle</span>
          </button>
        </div>
    </header>
  );
};

export default DashboardHeader;
