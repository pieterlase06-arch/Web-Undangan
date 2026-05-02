import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINS', value: timeLeft.minutes },
    { label: 'SECS', value: timeLeft.seconds },
  ];

  return (
    <section style={{ backgroundColor: 'var(--secondary-container)', padding: '100px 0' }}>
      <div className="container text-center">
        <h2 className="serif" style={{ fontSize: '32px', marginBottom: '64px', color: 'var(--secondary)', letterSpacing: '0.05em' }}>
          COUNTING DOWN TO THE BIG DAY
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              style={{ 
                width: '120px', 
                height: '120px', 
                backgroundColor: 'white', 
                borderRadius: '50%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(77, 100, 80, 0.05)',
                border: '1px solid #f0eded'
              }}
            >
              <span style={{ fontSize: '32px', fontWeight: '400', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                {item.value}
              </span>
              <span style={{ fontSize: '10px', uppercase: 'true', letterSpacing: '0.1em', color: 'var(--secondary)', fontWeight: '600' }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
