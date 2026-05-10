import LuxeTypography from '../ui/LuxeTypography';
import ProcessStepper from '../ui/ProcessStepper';

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
  isPublishing,
  activeStep = 0
}) => {
  return (
    <header className="h-24 px-8 flex items-center justify-between z-[100] bg-white border-b border-slate-100 shadow-sm">
      <div className="flex items-center gap-8 w-1/4">
         <button onClick={onBack} className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-all">
               <span className="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <div className="text-left">
               <LuxeTypography variant="h4" className="text-stone-900 leading-none text-sm">LuxeInvite Studio</LuxeTypography>
               <LuxeTypography variant="caption" className="text-stone-400 text-[8px]">Studio Workspace</LuxeTypography>
            </div>
         </button>
      </div>

      <div className="flex-1 max-w-xl">
         <ProcessStepper currentStep={activeStep} />
      </div>

      <div className="flex items-center justify-end gap-6 w-1/4">
         <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-2xl">
            {['mobile', 'desktop'].map(type => (
              <button 
                key={type}
                onClick={() => setDevice(type)}
                className={`w-10 h-8 rounded-xl flex items-center justify-center transition-all ${device === type ? 'bg-white shadow-md text-stone-900' : 'text-stone-300 hover:text-stone-500'}`}
              >
                 <span className="material-symbols-outlined text-lg">{type === 'mobile' ? 'smartphone' : 'desktop_windows'}</span>
              </button>
            ))}
         </div>

         <button 
           onClick={onPublish}
           disabled={isPublishing}
           className="px-8 py-4 bg-stone-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-all shadow-2xl disabled:opacity-50"
         >
           {isPublishing ? 'Transmitting...' : 'Release Design'}
         </button>
      </div>
    </header>
  );
};

export default EditorHeader;
