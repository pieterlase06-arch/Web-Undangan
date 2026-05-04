import LuxeTypography from '../ui/LuxeTypography';

/**
 * ZoomControls - Floating zoom management for the Studio workspace.
 */
const ZoomControls = ({ zoom, setZoom }) => {
  return (
    <div className="fixed bottom-10 right-10 bg-white/90 backdrop-blur-xl p-4 rounded-[32px] flex items-center gap-6 shadow-2xl border border-white z-[200]">
      <button 
        onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))} 
        className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all active:scale-90"
      >
        <span className="material-symbols-outlined text-xl">remove_circle</span>
      </button>
      <div className="w-16 text-center">
         <LuxeTypography variant="caption" className="text-indigo-600 font-black">{Math.round(zoom * 100)}%</LuxeTypography>
      </div>
      <button 
        onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))} 
        className="w-12 h-12 rounded-2xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all active:scale-90"
      >
        <span className="material-symbols-outlined text-xl">add_circle</span>
      </button>
    </div>
  );
};

export default ZoomControls;
