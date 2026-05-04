import LuxeTypography from '../ui/LuxeTypography';
import LuxeBadge from '../ui/LuxeBadge';
import LuxeAvatar from '../ui/LuxeAvatar';

/**
 * RSVPEntryRow - Individual entry for the RSVP data grid.
 */
const RSVPEntryRow = ({ rsvp, onDelete }) => {
  const isAttending = rsvp.attendance === 'Hadir' || rsvp.attendance === 'yes' || rsvp.attendance === true;
  
  return (
    <div className="bg-white p-8 rounded-[40px] border border-transparent hover:border-stone-100 transition-all shadow-sm hover:shadow-md flex items-center justify-between gap-8 group">
       <div className="flex items-center gap-6 flex-1 min-w-0">
          <LuxeAvatar name={rsvp.name} size="lg" variant="gradient" />
          <div className="min-w-0">
             <LuxeTypography variant="h4" className="text-stone-900 truncate">{rsvp.name}</LuxeTypography>
             <LuxeTypography variant="detail" className="text-stone-400 font-bold">
               Attending with {rsvp.guests || 1} Guests
             </LuxeTypography>
          </div>
       </div>
       
       <div className="hidden lg:block w-32 text-center">
          <LuxeBadge variant={isAttending ? 'success' : 'danger'}>
            {isAttending ? 'CONFIRMED' : 'DECLINED'}
          </LuxeBadge>
       </div>

       <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
             <LuxeTypography variant="caption" className="text-stone-300">Logged At</LuxeTypography>
             <LuxeTypography variant="detail" className="text-stone-400 font-black">
               {rsvp.date ? new Date(rsvp.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}
             </LuxeTypography>
          </div>
          <button 
            onClick={onDelete}
            className="w-12 h-12 rounded-2xl bg-stone-50 text-stone-300 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
             <span className="material-symbols-outlined text-lg">delete</span>
          </button>
       </div>
    </div>
  );
};

export default RSVPEntryRow;
