import { useState } from 'react';

const GuestList = ({ guests, onAddGuest, onDeleteGuest, onUpdateStatus }) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Keluarga');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName) return;
    onAddGuest({ name: newName, phone: newPhone, category: newCategory, status: 'Sent' });
    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="p-10 max-w-[1200px] mx-auto flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="serif text-3xl text-stone-900">Guest List ({guests.length})</h1>
          <p className="text-stone-500 mt-1">Manage your recipients and send invitations via WhatsApp.</p>
        </div>
      </header>

      {/* Quick Add Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Full Name</label>
          <input 
            className="w-full border-b border-stone-100 py-2 outline-none focus:border-stone-900" 
            placeholder="e.g. John Doe"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">WhatsApp Number</label>
          <input 
            className="w-full border-b border-stone-100 py-2 outline-none focus:border-stone-900" 
            placeholder="0812..."
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Category</label>
          <select 
            className="w-full border-b border-stone-100 py-2 outline-none focus:border-stone-900 bg-transparent"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option>Keluarga</option>
            <option>VIP</option>
            <option>Teman Kantor</option>
            <option>Lainnya</option>
          </select>
        </div>
        <button type="submit" className="bg-[#0F172A] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-stone-800 transition-all">
          Add Guest
        </button>
      </form>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-100">
            <tr className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <th className="px-8 py-4">Guest Name</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {guests.map((guest) => (
              <tr key={guest.id} className="hover:bg-stone-50/50 group">
                <td className="px-8 py-5">
                  <p className="serif font-bold text-stone-800">{guest.name}</p>
                  <p className="text-xs text-stone-400">{guest.phone}</p>
                </td>
                <td className="px-8 py-5">
                  <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-500 text-[10px] font-bold">{guest.category}</span>
                </td>
                <td className="px-8 py-5 text-sm">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${guest.status === 'Confirmed' ? 'text-green-600' : 'text-amber-600'}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => {
                        const message = `Halo ${guest.name}, kami mengundang Anda ke pernikahan kami! Lihat undangan selengkapnya di: https://pieterlase06-arch.github.io/Web-Undangan/`;
                        window.open(`https://wa.me/${guest.phone}?text=${encodeURIComponent(message)}`, '_blank');
                        onUpdateStatus(guest.id, 'Sent');
                      }}
                      className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-all"
                      title="Send WhatsApp"
                    >
                      <span className="material-symbols-outlined">send</span>
                    </button>
                    <button 
                      onClick={() => onDeleteGuest(guest.id)}
                      className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all"
                      title="Delete Guest"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuestList;
