import LuxeTypography from '../ui/LuxeTypography';
import LuxeLayerItem from '../ui/LuxeLayerItem';

/**
 * LayersPanel - Manages section visibility and order.
 */
const LayersPanel = ({ 
  data, 
  updateData, 
  selectedElement, 
  setSelectedElement, 
  setHoveredElement,
  onMove
}) => {
  const sections = data?.sectionOrder || ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook'];

  return (
    <div className="space-y-6">
      <LuxeTypography variant="caption" className="text-slate-400 mb-4">Core Sections</LuxeTypography>
      <div className="space-y-3">
        {sections.map((id) => (
          <LuxeLayerItem 
            key={id}
            label={id.toUpperCase()}
            icon={id === 'hero' ? 'star' : id === 'couple' ? 'favorite' : id === 'event' ? 'event' : id === 'countdown' ? 'timer' : 'mail'}
            isActive={selectedElement?.id === id}
            isVisible={data?.sectionVisibility?.[id] !== false}
            onMouseEnter={() => setHoveredElement({ type: 'section', id })}
            onMouseLeave={() => setHoveredElement(null)}
            onSelect={() => setSelectedElement({ type: 'section', id })}
            onMoveUp={() => onMove(id, 'up')}
            onMoveDown={() => onMove(id, 'down')}
            onToggleVisibility={() => {
              const currentVisibility = data?.sectionVisibility || {};
              updateData({ 
                sectionVisibility: { 
                  ...currentVisibility, 
                  [id]: currentVisibility[id] === false 
                } 
              });
            }}
          />
        ))}
      </div>
      
      <div className="pt-10">
        <LuxeTypography variant="caption" className="text-slate-400 mb-4">Custom Layers</LuxeTypography>
        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[40px]">
           <span className="material-symbols-outlined text-3xl text-slate-200 mb-4">layers_clear</span>
           <LuxeTypography variant="caption" className="text-slate-300 italic">No custom layers yet</LuxeTypography>
        </div>
      </div>
    </div>
  );
};

export default LayersPanel;
