import PremiumInvitation from '../PremiumInvitation';
import FloralInvitation from '../FloralInvitation';
import VogueInvitation from '../VogueInvitation';
import SnapPhotoInvitation from '../SnapPhotoInvitation';
import CustomCanvasInvitation from '../CustomCanvasInvitation';
import ElegantMulyoTemplate from '../ElegantMulyoTemplate';

/**
 * Workspace - The main canvas area for invitation preview and editing.
 */
const Workspace = ({ 
  data, 
  device, 
  zoom, 
  setSelectedElement, 
  updateData, 
  hoveredElement 
}) => {
  const deviceConfigs = {
    mobile: 'w-[450px] h-[900px]',
    tablet: 'w-[800px] h-[1000px]',
    desktop: 'w-[1200px] h-[900px]'
  };

  const renderTemplate = () => {
    const props = {
      data,
      isEditMode: true,
      onElementSelect: setSelectedElement,
      updateData,
      highlightedId: hoveredElement?.id
    };

    switch (data.templateId) {
      case 'snap-photo': return <SnapPhotoInvitation {...props} />;
      case 'floral': return <FloralInvitation {...props} />;
      case 'vogue': return <VogueInvitation {...props} />;
      case 'custom': return <CustomCanvasInvitation {...props} />;
      case 'elegant-mulyo': return <ElegantMulyoTemplate {...props} />;
      default: return <PremiumInvitation {...props} />;
    }
  };

  return (
    <main className="flex-1 overflow-auto bg-[#DDE0E6] flex items-center justify-center p-20 custom-scrollbar relative">
       <div className={`transition-all duration-1000 ease-[0.16,1,0.3,1] ${deviceConfigs[device]} relative`}>
          <div 
            className="absolute inset-0 bg-white shadow-[0_50px_100px_rgba(0,0,0,0.15)] rounded-[60px] overflow-hidden overflow-y-auto no-scrollbar" 
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
          >
             {renderTemplate()}
          </div>
       </div>
    </main>
  );
};

export default Workspace;
