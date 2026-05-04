import LuxeTypography from '../ui/LuxeTypography';
import LuxeInput from '../ui/LuxeInput';

/**
 * ContentPanel - Handles content editing for the selected section.
 */
const ContentPanel = ({ data, updateData }) => {
  return (
    <div className="space-y-6">
      <div className="p-10 bg-slate-50 rounded-[40px] space-y-6 border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-indigo-600" />
          <LuxeTypography variant="caption" className="text-slate-400">Global Identity</LuxeTypography>
        </div>
        <LuxeInput 
          label="Mempelai Pria" 
          value={data?.partner1 || ''} 
          onChange={val => updateData({ partner1: val })} 
        />
        <LuxeInput 
          label="Mempelai Wanita" 
          value={data?.partner2 || ''} 
          onChange={val => updateData({ partner2: val })} 
        />
      </div>

      <div className="p-10 bg-slate-50 rounded-[40px] space-y-6 border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-indigo-600" />
          <LuxeTypography variant="caption" className="text-slate-400">Event Timing</LuxeTypography>
        </div>
        <LuxeInput 
          label="Tanggal Acara" 
          value={data?.dateText || ''} 
          onChange={val => updateData({ dateText: val })} 
        />
        <LuxeInput 
          label="Waktu" 
          value={data?.time || ''} 
          onChange={val => updateData({ time: val })} 
        />
      </div>
    </div>
  );
};

export default ContentPanel;
