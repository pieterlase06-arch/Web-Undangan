import { motion } from 'framer-motion';
import LuxeTypography from '../ui/LuxeTypography';
import LuxeAvatar from '../ui/LuxeAvatar';

/**
 * WishesCard - A premium card representing a guest's wish or message.
 */
const WishesCard = ({ message, onDelete }) => {
  const content = message.content || message.message || "Sending love and happiness!";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-10 rounded-[50px] border border-stone-50 shadow-sm relative group hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
       <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-5">
             <LuxeAvatar name={message.name} size="md" />
             <div className="space-y-1">
                <LuxeTypography variant="h4" className="text-stone-900 leading-none truncate max-w-[150px]">{message.name}</LuxeTypography>
                <LuxeTypography variant="caption" className="text-indigo-500 font-black">CERTIFIED WISH</LuxeTypography>
             </div>
          </div>
          <button 
            onClick={onDelete}
            className="p-3 text-stone-200 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl"
          >
             <span className="material-symbols-outlined text-xl">delete</span>
          </button>
       </div>
       
       <div className="relative flex-1">
          <span className="material-symbols-outlined absolute -left-2 -top-4 text-indigo-50/50 text-6xl pointer-events-none">format_quote</span>
          <LuxeTypography variant="body" className="text-stone-600 leading-relaxed relative z-10 pl-4 italic">
            {content}
          </LuxeTypography>
       </div>
       
       <div className="mt-10 pt-6 border-t border-stone-50 flex justify-between items-center">
          <div className="flex gap-1">
             {[1,2,3,4,5].map(i => (
               <span key={i} className="material-symbols-outlined text-[10px] text-amber-400">star</span>
             ))}
          </div>
          <LuxeTypography variant="detail" className="text-stone-300 font-bold">
            {message.date ? new Date(message.date).toLocaleDateString() : new Date(message.id).toLocaleDateString()}
          </LuxeTypography>
       </div>
    </motion.div>
  );
};

export default WishesCard;
