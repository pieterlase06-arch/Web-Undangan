import LuxeTypography from '../ui/LuxeTypography';
import { motion } from 'framer-motion';

const StylePanel = ({ data, updateData }) => {
  const colorPresets = [
    { label: 'Gold', primary: '#C5A059', bg: '#FCF9F6' },
    { label: 'Rose', primary: '#E29587', bg: '#FFF9F8' },
    { label: 'Sage', primary: '#8DA691', bg: '#F8FAF8' },
    { label: 'Slate', primary: '#475569', bg: '#F8FAFC' },
    { label: 'Dark', primary: '#C5A059', bg: '#0F172A', text: '#FFFFFF' },
  ];

  const fonts = [
    { name: 'Cinzel', family: "'Cinzel', serif" },
    { name: 'Playfair', family: "'Playfair Display', serif" },
    { name: 'Noto Serif', family: "'Noto Serif', serif" },
    { name: 'Manrope', family: "'Manrope', sans-serif" },
    { name: 'Montserrat', family: "'Montserrat', sans-serif" },
    { name: 'Inter', family: "'Inter', sans-serif" },
    { name: 'Pinyon', family: "'Pinyon Script', cursive" },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Theme Presets</LuxeTypography>
        <div className="grid grid-cols-2 gap-4">
          {colorPresets.map(preset => (
            <button
              key={preset.label}
              onClick={() => updateData({ 
                primaryColor: preset.primary, 
                bgColor: preset.bg, 
                textColor: preset.text || '#1C1917',
                isDarkMode: !!preset.text
              })}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-900 transition-all text-left space-y-3 group"
            >
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }} />
                <div className="w-6 h-6 rounded-full border border-slate-200" style={{ backgroundColor: preset.bg }} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">{preset.label}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Typography</LuxeTypography>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Heading Font</p>
            <select 
              className="w-full bg-slate-50 rounded-xl p-4 text-xs outline-none border border-slate-100"
              value={data?.headingFont}
              onChange={e => updateData({ headingFont: e.target.value })}
            >
              {fonts.map(f => <option key={f.name} value={f.family}>{f.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Accent Font</p>
            <select 
              className="w-full bg-slate-50 rounded-xl p-4 text-xs outline-none border border-slate-100"
              value={data?.accentFont}
              onChange={e => updateData({ accentFont: e.target.value })}
            >
              {fonts.map(f => <option key={f.name} value={f.family}>{f.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <LuxeTypography variant="caption" className="text-slate-400 font-black uppercase tracking-widest">Animations</LuxeTypography>
        <select 
          className="w-full bg-slate-50 rounded-xl p-4 text-xs outline-none border border-slate-100"
          value={data?.entranceAnimation || 'reveal'}
          onChange={e => updateData({ entranceAnimation: e.target.value })}
        >
          <option value="reveal">Soft Reveal</option>
          <option value="slide">Slide In</option>
          <option value="zoom">Zoom Focus</option>
          <option value="none">Instant</option>
        </select>
      </div>
    </div>
  );
};

export default StylePanel;
