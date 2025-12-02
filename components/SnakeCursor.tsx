import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SnakeCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        if (newTrail.length > 20) newTrail.shift(); // Limit trail length
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
       <svg className="absolute w-full h-full">
         <motion.path
            d={`M ${trail.map(p => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none"
            stroke="#39ff14"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.1 }}
            style={{ opacity: 0.8 }}
         />
       </svg>
      <div
        className="fixed w-4 h-4 bg-venom-green rounded-full shadow-[0_0_10px_#39ff14]"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />
    </div>
  );
}
