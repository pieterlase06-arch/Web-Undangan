import LuxeImagePicker from '../ui/LuxeImagePicker';

/**
 * MediaPanel - Handles asset selection and management.
 */
const MediaPanel = ({ onSelect }) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar">
      <LuxeImagePicker onSelect={onSelect} />
    </div>
  );
};

export default MediaPanel;
