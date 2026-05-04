import LuxeTypography from '../ui/LuxeTypography';

/**
 * EditorHeader - Professional studio header with title editing, device controls, and publishing actions.
 */
const EditorHeader = ({ 
  onBack, 
  title,
  onTitleChange,
  device, 
  setDevice, 
  onPublish, 
  isPublishing 
}) => {
  return (
    <header className="h-16 px-8 flex items-center justify-between z-[100] bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center gap-8">
         <button onClick={onBack} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-all">
               <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div>
               <LuxeTypography variant="h4" className="text-slate-900 leading-none">LuxeInvite Studio</LuxeTypography>
               <LuxeTypography variant="caption" className="text-slate-400">Studio Workspace</LuxeTypography>
            </div>
         </button>

         <div className="h-8 w-px bg-slate-100 mx-2" />
              
         <div className="flex items-center gap-3">
            <input 
              className="bg-transparent border-none font-bold text-xs outline-none w-64 text-slate-600 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all focus:bg-slate-50" 
              value={title || ''} 
              onChange={e => onTitleChange(e.target.value)}
              placeholder="Untitled Design"
            />
         </div>
      </div>

      <div className="flex items-center gap-3 bg-slate-100 p-1.5 rounded-2xl">
         {['mobile', 'tablet', 'desktop'].map(type => (
           <button 
             key={type}
             onClick={() => setDevice(type)}
             className={`w-12 h-10 rounded-xl flex items-center justify-center transition-all ${device === type ? 'bg-white shadow-md text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
           >
              <span className="material-symbols-outlined text-xl">{type === 'mobile' ? 'smartphone' : type === 'tablet' ? 'tablet' : 'desktop_windows'}</span>
           </button>
         ))}
      </div>

      <button 
        onClick={onPublish}
        disabled={isPublishing}
        className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
      >
        {isPublishing ? 'Transmitting...' : 'Release Design'}
      </button>
    </header>
  );
};

export default EditorHeader;
