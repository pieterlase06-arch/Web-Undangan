import { motion } from 'framer-motion';

const Story = ({ stories, accentColor = '#C5A059' }) => {
  if (!stories || stories.length === 0) {
    stories = [
      { date: '2022', title: 'First Meeting', content: 'We met at a coffee shop in Jakarta. It was a rainy afternoon...', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400' },
      { date: '2023', title: 'The Proposal', content: 'On the peak of Mount Bromo, under the golden sunrise, he popped the question.', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400' },
      { date: '2024', title: 'Wedding Day', content: 'Now we are ready to start our new journey together.', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400' }
    ];
  }

  return (
    <div className="py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Our Love Story</h2>
          <div className="w-12 h-1 bg-current mx-auto opacity-20" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

          <div className="space-y-24">
            {stories.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-10 md:gap-20 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 text-center ${idx % 2 === 1 ? 'md:text-right' : 'md:text-left'} space-y-4`}>
                  <div 
                    className="inline-block px-6 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest"
                    style={{ backgroundColor: accentColor }}
                  >
                    {item.date}
                  </div>
                  <h3 className="text-2xl font-black uppercase">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed italic">{item.content}</p>
                </div>

                {/* Dot */}
                <div 
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg hidden md:block"
                  style={{ backgroundColor: accentColor }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
