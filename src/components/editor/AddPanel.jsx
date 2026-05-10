import LuxeTypography from '../ui/LuxeTypography';

/**
 * AddPanel - Handles adding new elements to the canvas.
 */
const AddPanel = ({ onSelect }) => {
  const tools = [
    { label: 'Text', icon: 'title', action: 'text' },
    { label: 'Photo', icon: 'image', action: 'media' },
    { label: 'Story', icon: 'history_edu', action: 'story' },
    { label: 'Gifts', icon: 'redeem', action: 'gifts' },
    { label: 'Grid', icon: 'grid_view', action: 'grid' },
    { label: 'Line', icon: 'horizontal_rule', action: 'line' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {tools.map(tool => (
        <button 
          key={tool.label} 
          onClick={() => onSelect(tool.action)} 
          className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-50 rounded-[32px] hover:bg-slate-100 transition-all group"
        >
          <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-indigo-600 group-hover:scale-110 transition-all">
            {tool.icon}
          </span>
          <LuxeTypography variant="caption" className="text-slate-400">{tool.label}</LuxeTypography>
        </button>
      ))}
    </div>
  );
};

export default AddPanel;
