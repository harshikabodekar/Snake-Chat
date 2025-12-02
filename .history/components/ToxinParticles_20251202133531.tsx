import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ToxinParticlesProps {
  venomLevel: number;
}

export default function ToxinParticles({ venomLevel }: ToxinParticlesProps) {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    updateDimensions();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);
  
  // Don't render anything on server-side
  if (!isClient) {
    return null;
  }
  
  const particleCount = Math.floor((venomLevel / 100) * 15) + 5;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            venomLevel > 70 ? 'bg-toxin-red' : 
            venomLevel > 40 ? 'bg-poison-purple' : 
            'bg-venom-green'
          }`}
          initial={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
          style={{
            filter: `drop-shadow(0 0 4px ${
              venomLevel > 70 ? '#ff1439' :
              venomLevel > 40 ? '#8b14ff' :
              '#39ff14'
            })`,
          }}
        />
      ))}
      
      {/* Danger warning particles for high venom */}
      {venomLevel > 80 && [...Array(8)].map((_, i) => (
        <motion.div
          key={`danger-${i}`}
          className="absolute text-toxin-red text-xs font-bold select-none"
          initial={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            rotate: 0,
          }}
          animate={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
            rotate: 360,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 1.5,
          }}
        >
          ⚠️
        </motion.div>
      ))}
    </div>
  );
}