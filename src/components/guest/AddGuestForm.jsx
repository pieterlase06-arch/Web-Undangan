import { useState } from 'react';
import LuxeInput from '../ui/LuxeInput';
import LuxeButton from '../ui/LuxeButton';
import LuxeTypography from '../ui/LuxeTypography';

/**
 * AddGuestForm - Quick registration engine for single guest entries.
 */
const AddGuestForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('Keluarga');

  const categories = ['Keluarga', 'VIP', 'Teman Kantor', 'Lainnya'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({ name: name.trim(), phone: phone.trim(), category, status: 'Sent' });
    setName('');
    setPhone('');
  };

  return (
    <div className="bg-white p-12 rounded-[60px] shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-white space-y-10 sticky top-10">
       <div className="space-y-3">
          <LuxeTypography variant="h3" className="text-stone-900 tracking-tight">Add Single Guest</LuxeTypography>
          <div className="h-1 w-12 bg-indigo-600 rounded-full" />
          <LuxeTypography variant="caption" className="text-stone-400">Instant Registration Engine</LuxeTypography>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-8">
          <LuxeInput 
             label="FULL NAME"
             placeholder="e.g. Johnathan Doe" 
             value={name} 
             onChange={setName} 
          />
          <LuxeInput 
             label="WHATSAPP NUMBER"
             placeholder="e.g. 08123456789" 
             value={phone} 
             onChange={setPhone} 
          />
          <div className="space-y-4">
             <LuxeTypography variant="caption" className="text-stone-400">CATEGORY SEGMENT</LuxeTypography>
             <div className="flex flex-wrap gap-3">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-widest uppercase transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-stone-50 text-stone-400 hover:bg-stone-100'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
          <LuxeButton variant="primary" className="w-full py-6">
             REGISTER GUEST
          </LuxeButton>
       </form>
    </div>
  );
};

export default AddGuestForm;
