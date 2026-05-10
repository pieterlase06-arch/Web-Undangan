import { useState } from 'react';
import LuxeTypography from '../ui/LuxeTypography';
import LuxeInput from '../ui/LuxeInput';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ContentPanel - Handles content editing for the selected section.
 */
const ContentPanel = ({ data, updateData }) => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Identity', icon: 'person' },
    { id: 'event', label: 'Event', icon: 'event' },
    { id: 'story', label: 'Story', icon: 'history_edu' },
    { id: 'gift', label: 'Gifts', icon: 'redeem' },
    { id: 'rsvp', label: 'RSVP', icon: 'mail' },
  ];

  const updateStory = (index, field, value) => {
    const newStories = [...(data?.stories || [])];
    if (!newStories[index]) return;
    newStories[index] = { ...newStories[index], [field]: value };
    updateData({ stories: newStories });
  };

  const updateGift = (index, field, value) => {
    const newGifts = [...(data?.gifts || [])];
    if (!newGifts[index]) return;
    newGifts[index] = { ...newGifts[index], [field]: value };
    updateData({ gifts: newGifts });
  };

  return (
    <div className="flex flex-col h-full -mx-8">
      {/* TABS HEADER */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-slate-100 px-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-6 py-4 flex flex-col items-center gap-1 border-b-2 transition-all ${activeTab === tab.id ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div 
              key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                 <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">The Couple</LuxeTypography>
                 <LuxeInput label="Groom Name" value={data?.partner1 || ''} onChange={val => updateData({ partner1: val })} />
                 <LuxeInput label="Groom's Parents" value={data?.partner1Parents || ''} onChange={val => updateData({ partner1Parents: val })} />
                 <LuxeInput label="Bride Name" value={data?.partner2 || ''} onChange={val => updateData({ partner2: val })} />
                 <LuxeInput label="Bride's Parents" value={data?.partner2Parents || ''} onChange={val => updateData({ partner2Parents: val })} />
              </div>
              <div className="space-y-4">
                 <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Wedding Quote</LuxeTypography>
                 <textarea 
                    className="w-full bg-slate-50 rounded-2xl p-6 text-sm border border-slate-100 focus:border-slate-900 outline-none transition-all h-32"
                    value={data?.quote || ''} 
                    onChange={e => updateData({ quote: e.target.value })}
                 />
              </div>
            </motion.div>
          )}

          {activeTab === 'event' && (
            <motion.div 
              key="event" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                 <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Time & Date</LuxeTypography>
                 <LuxeInput label="Event Date (Full Text)" value={data?.dateText || ''} onChange={val => updateData({ dateText: val })} />
                 <LuxeInput label="Year" value={data?.yearText || ''} onChange={val => updateData({ yearText: val })} />
                 <LuxeInput label="Time (e.g. 08:00 WIB)" value={data?.time || ''} onChange={val => updateData({ time: val })} />
              </div>
              <div className="space-y-4">
                 <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Location</LuxeTypography>
                 <LuxeInput label="Venue Name" value={data?.venue || ''} onChange={val => updateData({ venue: val })} />
                 <LuxeInput label="Short Address" value={data?.location || ''} onChange={val => updateData({ location: val })} />
                 <LuxeInput label="Google Maps Link" value={data?.mapsLink || ''} onChange={val => updateData({ mapsLink: val })} />
              </div>
            </motion.div>
          )}

          {activeTab === 'story' && (
            <motion.div 
              key="story" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Timeline Items</LuxeTypography>
              {(data?.stories || []).map((story, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-300">STORY #{idx + 1}</span>
                    <button onClick={() => updateData({ stories: data.stories.filter((_, i) => i !== idx) })} className="text-red-400"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                  <LuxeInput label="Year / Date" value={story.date} onChange={val => updateStory(idx, 'date', val)} />
                  <LuxeInput label="Title" value={story.title} onChange={val => updateStory(idx, 'title', val)} />
                  <textarea 
                    className="w-full bg-white rounded-xl p-4 text-xs border border-slate-200 focus:border-slate-900 outline-none transition-all h-20"
                    value={story.content} 
                    onChange={e => updateStory(idx, 'content', e.target.value)}
                  />
                </div>
              ))}
              <button 
                onClick={() => updateData({ stories: [...(data?.stories || []), { date: '2024', title: 'New Story', content: 'Describe your moment...', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400' }] })}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-all"
              >
                + Add Story Point
              </button>
            </motion.div>
          )}

          {activeTab === 'gift' && (
            <motion.div 
              key="gift" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Bank Accounts</LuxeTypography>
              {(data?.gifts || []).map((gift, idx) => (
                <div key={idx} className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-300">ACCOUNT #{idx + 1}</span>
                    <button onClick={() => updateData({ gifts: data.gifts.filter((_, i) => i !== idx) })} className="text-red-400"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                  <LuxeInput label="Bank Name (e.g. BCA)" value={gift.bank} onChange={val => updateGift(idx, 'bank', val)} />
                  <LuxeInput label="Account Number" value={gift.number} onChange={val => updateGift(idx, 'number', val)} />
                  <LuxeInput label="Account Owner" value={gift.owner} onChange={val => updateGift(idx, 'owner', val)} />
                </div>
              ))}
              <button 
                onClick={() => updateData({ gifts: [...(data?.gifts || []), { bank: 'BCA', number: '', owner: '' }] })}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-all"
              >
                + Add Bank Account
              </button>
            </motion.div>
          )}

          {activeTab === 'rsvp' && (
            <motion.div 
              key="rsvp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                 <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">RSVP Configuration</LuxeTypography>
                 <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest">Enable RSVP</span>
                    <input 
                      type="checkbox" 
                      checked={data?.sectionVisibility?.rsvp !== false} 
                      onChange={e => updateData({ sectionVisibility: { ...(data?.sectionVisibility || {}), rsvp: e.target.checked } })}
                    />
                 </div>
                 <LuxeInput label="Success Message" value={data?.rsvpSuccessMessage || 'Terima kasih telah melakukan konfirmasi!'} onChange={val => updateData({ rsvpSuccessMessage: val })} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContentPanel;
