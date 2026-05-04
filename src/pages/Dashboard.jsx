import { useNavigate } from 'react-router-dom';
import LuxeTypography from '../components/ui/LuxeTypography';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ProjectCard from '../components/dashboard/ProjectCard';

/**
 * ProjectOverview - The main dashboard for managing digital invitation projects.
 */
const ProjectOverview = ({ projects = [], onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-bg p-6 lg:p-12 pb-40">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <DashboardHeader 
          projectCount={projects.length}
          onExport={() => {
            const data = { 
              projects: JSON.parse(localStorage.getItem('projects') || '[]'),
              guests: JSON.parse(localStorage.getItem('guests') || '[]')
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `luxeinvite-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
          }}
          onRestore={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const data = JSON.parse(event.target.result);
                if (data.projects) {
                   if (window.confirm('Restore backup? This will overwrite your current projects.')) {
                      localStorage.setItem('projects', JSON.stringify(data.projects));
                      if (data.guests) localStorage.setItem('guests', JSON.stringify(data.guests));
                      window.location.reload();
                   }
                }
              } catch (err) {
                alert('Invalid backup file.');
              }
            };
            reader.readAsText(file);
          }}
        />

        {/* PROJECTS GRID */}
        {!projects || projects.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-8 bg-white/40 backdrop-blur-3xl rounded-[80px] border border-white/50 shadow-2xl">
             <div className="w-32 h-32 bg-stone-100 rounded-full flex items-center justify-center text-stone-300 animate-pulse">
                <span className="material-symbols-outlined text-6xl">inventory_2</span>
             </div>
             <div className="space-y-3">
                <LuxeTypography variant="h3" className="text-stone-900">Your studio is empty</LuxeTypography>
                <LuxeTypography variant="caption" className="text-stone-400">Select a template to begin your masterpiece</LuxeTypography>
             </div>
             <button 
               onClick={() => navigate('/katalog')} 
               className="px-12 py-5 border-2 border-stone-900 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-stone-950 hover:text-white transition-all"
             >
               Enter Catalog
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {projects.map((p, i) => (
               <ProjectCard 
                 key={p.id} 
                 project={p} 
                 index={i} 
                 onDelete={onDelete} 
               />
             ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectOverview;
