import { motion } from 'framer-motion';

const ProcessStepper = ({ currentStep = 0 }) => {
  const steps = [
    { label: 'Design', icon: 'palette' },
    { label: 'Content', icon: 'edit_note' },
    { label: 'Guest List', icon: 'group' },
    { label: 'Share', icon: 'send' }
  ];

  return (
    <div className="flex items-center justify-between max-w-2xl mx-auto mb-16 relative">
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 -translate-y-1/2 z-0" />
      
      {steps.map((step, i) => {
        const isActive = i <= currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={step.label} className="flex flex-col items-center gap-3 relative z-10">
            <motion.div 
              initial={false}
              animate={{ 
                backgroundColor: isActive ? '#000' : '#fff',
                borderColor: isActive ? '#000' : '#e5e7eb',
                scale: isCurrent ? 1.2 : 1
              }}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-sm`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#C5A059]' : 'text-stone-300'}`}>
                {step.icon}
              </span>
            </motion.div>
            <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-stone-900' : 'text-stone-300'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessStepper;
