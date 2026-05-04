import LuxeTypography from '../ui/LuxeTypography';
import LuxeAvatar from '../ui/LuxeAvatar';
import LuxeBadge from '../ui/LuxeBadge';

/**
 * GuestTableRow - Individual row for the Guest Intelligence data grid.
 */
const GuestTableRow = ({ guest, onSend, onDelete }) => {
  return (
    <div className="group bg-white hover:bg-stone-50 p-8 rounded-[40px] border border-transparent hover:border-stone-100 transition-all flex items-center justify-between gap-8">
       <div className="flex items-center gap-6 flex-1 min-w-0">
          <LuxeAvatar name={guest.name} size="lg" />
          <div className="min-w-0">
             <LuxeTypography variant="h4" className="text-stone-900 truncate">{guest.name}</LuxeTypography>
             <LuxeTypography variant="detail" className="text-stone-400 font-bold">{guest.phone || 'No Contact'}</LuxeTypography>
          </div>
       </div>

       <div className="hidden md:block w-32 text-center">
          <LuxeBadge variant="outline" className="bg-stone-50 border-stone-100 text-stone-500">
            {guest.category}
          </LuxeBadge>
       </div>

       <div className="hidden lg:block w-40 text-center">
          <LuxeBadge variant={guest.status === 'Sent' ? 'success' : 'warning'}>
            {guest.status === 'Sent' ? 'INVITATION SENT' : 'DRAFT READY'}
          </LuxeBadge>
       </div>

       <div className="flex items-center gap-3">
          <button 
            onClick={onSend}
            className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
          >
             <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
          <button 
            onClick={onDelete}
            className="w-14 h-14 rounded-2xl bg-stone-50 text-stone-300 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
          >
             <span className="material-symbols-outlined text-[20px]">delete_sweep</span>
          </button>
       </div>
    </div>
  );
};

export default GuestTableRow;
