import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import config from '../config';

// Modular Editor Components
import EditorHeader from '../components/editor/EditorHeader';
import EditorPanel from '../components/editor/EditorPanel';
import AddPanel from '../components/editor/AddPanel';
import LayersPanel from '../components/editor/LayersPanel';
import ContentPanel from '../components/editor/ContentPanel';
import MediaPanel from '../components/editor/MediaPanel';
import StylePanel from '../components/editor/StylePanel';
import Workspace from '../components/editor/Workspace';
import ZoomControls from '../components/editor/ZoomControls';
import ContextualToolbar from '../components/editor/ContextualToolbar';

const Editor = ({ data, updateData }) => {
  const navigate = useNavigate();
  const [activePanel, setActivePanel] = useState('add');
  const [device, setDevice] = useState('mobile'); 
  const [zoom, setZoom] = useState(0.8);
  const [selectedElement, setSelectedElement] = useState(null); 
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const menuItems = [
    { id: 'add', label: 'ADD', icon: 'add_circle' },
    { id: 'content', label: 'DATA', icon: 'database' },
    { id: 'layers', label: 'LAYERS', icon: 'layers' },
    { id: 'style', label: 'STYLE', icon: 'palette' },
    { id: 'media', label: 'ASSETS', icon: 'image' },
  ];

  const moveSection = (id, direction) => {
    const sections = [...(data?.sectionOrder || ['hero', 'couple', 'event', 'countdown', 'rsvp', 'guestbook'])];
    const index = sections.indexOf(id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const temp = sections[index];
    sections[index] = sections[newIndex];
    sections[newIndex] = temp;

    updateData({ sectionOrder: sections });
  };

  // Local state for debounced inputs
  const [localData, setLocalData] = useState(data);
  const debounceTimer = useRef(null);

  useEffect(() => {
    setLocalData(data);
  }, [data?.id]); // Update when switching projects

  const debouncedUpdate = (updates) => {
    setLocalData(prev => ({ ...prev, ...updates }));
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      updateData(updates);
    }, 500);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#DDE0E6] overflow-hidden">
      {/* PROFESSIONAL HEADER */}
      <EditorHeader 
        onBack={() => navigate('/desain-saya')}
        title={data?.title}
        onTitleChange={val => updateData({ title: val })}
        device={device}
        setDevice={setDevice}
        onPublish={() => { setIsPublishing(true); setTimeout(() => { setIsPublishing(false); alert('Design exported to your library!'); }, 2000); }}
        isPublishing={isPublishing}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* SIDE RAIL */}
        <nav className="w-20 bg-[#121212] flex flex-col items-center py-8 gap-4 z-[200]">
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActivePanel(item.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${activePanel === item.id ? 'text-white bg-white/10' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${activePanel === item.id ? 'icon-fill' : ''}`}>{item.icon}</span>
              <span className="text-[8px] font-black tracking-widest uppercase">{item.label}</span>
            </button>
          ))}
          
          <div className="mt-auto flex flex-col items-center gap-4 border-t border-white/5 pt-6">
             <button onClick={() => navigate('/desain-saya')} className="flex flex-col items-center gap-1.5 p-3 text-red-400 hover:text-red-300 transition-all">
                <span className="material-symbols-outlined text-2xl">exit_to_app</span>
                <span className="text-[8px] font-black tracking-widest uppercase">EXIT</span>
             </button>
          </div>
        </nav>

        {/* SIDE PANEL */}
        <AnimatePresence mode="wait">
          {activePanel && (
            <EditorPanel 
              title={activePanel.toUpperCase()} 
              onClose={() => setActivePanel(null)}
            >
              {activePanel === 'add' && (
                <AddPanel onSelect={(type) => {
                  if (type === 'media') setActivePanel('media');
                  else if (type === 'story') {
                    updateData({ sectionOrder: [...(data?.sectionOrder || []), 'story'] });
                    setActivePanel('content');
                  }
                  else if (type === 'gifts') {
                    updateData({ sectionOrder: [...(data?.sectionOrder || []), 'gifts'] });
                    setActivePanel('content');
                  }
                  else alert(`${type} tools coming soon`);
                }} />
              )}
              
              {activePanel === 'media' && (
                <MediaPanel 
                  onSelect={(src) => {
                    if (selectedElement?.type === 'section') {
                      if (selectedElement.id === 'hero') updateData({ heroBgImage: src });
                      if (selectedElement.id === 'couple') updateData({ groomImage: src }); 
                    } else if (selectedElement?.type === 'groom') {
                      updateData({ groomImage: src });
                    } else if (selectedElement?.type === 'bride') {
                      updateData({ brideImage: src });
                    } else {
                      updateData({ heroBgImage: src });
                    }
                    setActivePanel(null);
                  }}
                />
              )}

              {activePanel === 'layers' && (
                <LayersPanel 
                  data={data}
                  updateData={updateData}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                  setHoveredElement={setHoveredElement}
                />
              )}

              {activePanel === 'content' && <ContentPanel data={localData} updateData={debouncedUpdate} />}
              {activePanel === 'style' && <StylePanel data={data} updateData={updateData} />}
            </EditorPanel>
          )}
        </AnimatePresence>

        <Workspace 
          data={data}
          device={device}
          zoom={zoom}
          setSelectedElement={setSelectedElement}
          updateData={updateData}
          hoveredElement={hoveredElement}
        />

        <ZoomControls zoom={zoom} setZoom={setZoom} />

        <AnimatePresence>
          {selectedElement && (
            <ContextualToolbar 
              selectedElement={selectedElement}
              onClose={() => setSelectedElement(null)}
              onMoveSection={moveSection}
              onChangeAsset={() => setActivePanel('media')}
            />
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
         .no-scrollbar::-webkit-scrollbar { display: none; }
         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
         .custom-scrollbar::-webkit-scrollbar { width: 4px; }
         .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
         .icon-fill { font-variation-settings: 'FILL' 1; }
      `}} />
    </div>
  );
};

export default Editor;
