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
      className="bg-white rounded-[60px] overflow-hidden border border-white shadow-[0_30px_100px_rgba(0,0,0,0.08)] group flex flex-col h-[650px] hover:shadow-[0_40px_120px_rgba(0,0,0,0.15)] transition-all duration-700"
    >
      <div className="h-2/3 overflow-hidden relative">
         <div className="absolute inset-0 bg-stone-50 flex items-center justify-center text-stone-200">
            <span className="material-symbols-outlined text-8xl">auto_awesome</span>
         </div>
         <div 
           className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-all duration-1000"
           style={{ backgroundImage: `url(${project.heroBgImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800'})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
         
         <div className="absolute top-8 left-8">
            <LuxeBadge variant={project.status === 'Published' ? 'success' : 'warning'}>
              {project.status || 'Draft'}
            </LuxeBadge>
         </div>

         <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
            <button 
              onClick={() => navigate(`/editor/${project.id}`)}
              className="w-16 h-16 rounded-full bg-white text-stone-900 flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition-all shadow-2xl"
            >
               <span className="material-symbols-outlined">edit</span>
            </button>
            <button 
              onClick={() => window.open(`/#/preview/${project.id}`, '_blank')}
              className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all shadow-2xl"
            >
               <span className="material-symbols-outlined">visibility</span>
            </button>
         </div>
      </div>

      <div className="p-12 flex-1 flex flex-col justify-between">
         <div className="space-y-4">
            <div className="flex justify-between items-start">
               <div className="space-y-2">
                  <LuxeTypography variant="h3" className="text-stone-900 line-clamp-1">{project.title || 'Untitled Design'}</LuxeTypography>
                  <LuxeTypography variant="caption" className="text-[#C5A059] font-black">{project.templateId?.toUpperCase() || 'PREMIUM'} ARCHIVE</LuxeTypography>
               </div>
               <button 
                 onClick={() => onDelete(project.id)}
                 className="p-3 text-stone-200 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl"
               >
                  <span className="material-symbols-outlined text-xl">delete_sweep</span>
               </button>
            </div>
            
            <div className="flex items-center gap-6 pt-4 border-t border-stone-50">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[10px] text-stone-400 font-bold">
                       {String.fromCharCode(64 + i)}
                    </div>
                  ))}
               </div>
               <LuxeTypography variant="detail" className="text-stone-400 italic">Created {new Date(project.id).toLocaleDateString()}</LuxeTypography>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-4 pt-8">
            <button 
              onClick={() => navigate(`/tamu/${project.id}`)}
              className="py-4 bg-stone-50 rounded-2xl flex flex-col items-center gap-1 hover:bg-stone-100 transition-all"
            >
               <span className="material-symbols-outlined text-stone-400 text-lg">group</span>
               <LuxeTypography variant="detail" className="text-stone-900">GUESTS</LuxeTypography>
            </button>
            <button 
              onClick={() => navigate(`/rsvp/${project.id}`)}
              className="py-4 bg-stone-50 rounded-2xl flex flex-col items-center gap-1 hover:bg-stone-100 transition-all"
            >
               <span className="material-symbols-outlined text-stone-400 text-lg">query_stats</span>
               <LuxeTypography variant="detail" className="text-stone-900">ANALYTICS</LuxeTypography>
            </button>
         </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
