import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LuxeTypography from '../ui/LuxeTypography';
import LuxeBadge from '../ui/LuxeBadge';

/**
 * ProjectCard - A high-fidelity card representing a single invitation project.
 */
const ProjectCard = ({ project, index, onDelete }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/40 backdrop-blur-xl rounded-[64px] overflow-hidden border border-white shadow-[0_30px_100px_rgba(0,0,0,0.05)] group flex flex-col h-[680px] hover:shadow-[0_40px_120px_rgba(0,0,0,0.1)] transition-all duration-700"
    >
      <div className="h-[60%] overflow-hidden relative">
         <div className="absolute inset-0 bg-stone-50 flex items-center justify-center text-stone-200">
            <span className="material-symbols-outlined text-8xl">auto_awesome</span>
         </div>
         <div 
           className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-all duration-1000"
           style={{ backgroundImage: `url(${project.heroBgImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800'})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
         
         <div className="absolute top-8 left-8">
            <LuxeBadge variant={project.status === 'Published' ? 'success' : 'warning'}>
              {project.status || 'Draft Design'}
            </LuxeBadge>
         </div>

         <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700">
            <button 
              onClick={() => navigate(`/editor/${project.id}`)}
              className="w-20 h-20 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all shadow-2xl active:scale-90"
            >
               <span className="material-symbols-outlined text-3xl">edit_note</span>
            </button>
            <button 
              onClick={() => window.open(`/#/v/${project.id}`, '_blank')}
              className="w-20 h-20 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all shadow-2xl active:scale-90"
            >
               <span className="material-symbols-outlined text-3xl">visibility</span>
            </button>
         </div>
      </div>

      <div className="p-12 flex-1 flex flex-col justify-between">
         <div className="space-y-6">
            <div className="flex justify-between items-start">
               <div className="space-y-2">
                  <LuxeTypography variant="h3" className="text-stone-900 line-clamp-1">{project.title || 'Untitled Design'}</LuxeTypography>
                  <LuxeTypography variant="detail" className="text-[#C5A059] font-black uppercase tracking-[0.6em]">{project.templateId?.replace(/-/g, ' ') || 'PREMIUM'} EDITION</LuxeTypography>
               </div>
               <button 
                 onClick={() => {
                   if (window.confirm('Are you sure you want to delete this design? This action cannot be undone.')) {
                     onDelete(project.id);
                   }
                 }}
                 className="p-3 text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
               >
                  <span className="material-symbols-outlined text-2xl">delete</span>
               </button>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-stone-50">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-stone-100 flex items-center justify-center text-[11px] text-stone-400 font-black">
                       {String.fromCharCode(64 + i)}
                    </div>
                  ))}
               </div>
               <LuxeTypography variant="detail" className="text-stone-300 italic tracking-[0.2em]">Created {new Date(project.createdAt || project.id).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</LuxeTypography>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-6 pt-10">
            <button 
              onClick={() => navigate(`/buku-tamu`)}
              className="py-5 bg-stone-50 rounded-3xl flex flex-col items-center gap-2 hover:bg-stone-900 hover:text-white transition-all group/btn shadow-sm"
            >
               <span className="material-symbols-outlined text-stone-300 group-hover/btn:text-[#C5A059] transition-all">group</span>
               <LuxeTypography variant="caption" className="font-black tracking-[0.3em]">Guests</LuxeTypography>
            </button>
            <button 
              onClick={() => navigate(`/lacak-rsvp`)}
              className="py-5 bg-stone-50 rounded-3xl flex flex-col items-center gap-2 hover:bg-stone-900 hover:text-white transition-all group/btn shadow-sm"
            >
               <span className="material-symbols-outlined text-stone-300 group-hover/btn:text-[#C5A059] transition-all">analytics</span>
               <LuxeTypography variant="caption" className="font-black tracking-[0.3em]">Tracking</LuxeTypography>
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
