import React from 'react';
import { motion } from 'framer-motion';

interface VenomMeterProps {
  level: number;
  width?: number;
  height?: string;
  position?: 'left' | 'right';
  showLabels?: boolean;
  showPercentage?: boolean;
  showWarnings?: boolean;
  glowIntensity?: number;
  borderRadius?: string;
  backgroundColor?: string;
}

export default function VenomMeter({ 
  level, 
  width = 12, 
  height = '70vh', 
  position = 'right', 
  showLabels = true,
  showPercentage = true,
  showWarnings = true,
  glowIntensity = 1,
  borderRadius = 'rounded-2xl',
  backgroundColor = 'bg-black/80'
}: VenomMeterProps) {
  const getVenomColor = () => {
    if (level > 80) return '#ff1439'; // Critical red
    if (level > 60) return '#ffff14'; // Warning yellow  
    if (level > 40) return '#8b14ff'; // Danger purple
    return '#39ff14'; // Safe green
  };

  const getGlowIntensity = () => {
    if (level > 80) return '0 0 30px #ff1439, 0 0 60px #ff1439';
    if (level > 60) return '0 0 25px #ffff14, 0 0 50px #ffff14';
    if (level > 40) return '0 0 20px #8b14ff, 0 0 40px #8b14ff';
    return '0 0 20px #39ff14';
  };

  return (
    <div className={`fixed right-4 top-1/2 -translate-y-1/2 h-[60vh] w-8 bg-black/70 border-2 rounded-full overflow-hidden backdrop-blur-sm z-40 ${
      level > 80 ? 'animate-pulse border-toxin-red' :
      level > 60 ? 'border-death-yellow' :
      level > 40 ? 'border-poison-purple' :
      'border-venom-green/30'
    }`}>
      
      {/* Skull warning at top for high levels */}
      {level > 75 && (
        <motion.div 
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-toxin-red text-xl"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 10, -10, 0] 
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💀
        </motion.div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end">
        <motion.div
          className="w-full relative"
          style={{ 
            height: `${level}%`,
            backgroundColor: getVenomColor(),
            boxShadow: getGlowIntensity(),
          }}
          animate={{ 
            height: `${level}%`,
            backgroundColor: getVenomColor(),
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Bubble effect inside venom */}
          <div className="w-full h-full opacity-60" style={{
            backgroundImage: level > 60 
              ? 'radial-gradient(circle, #000 15%, transparent 15%)' 
              : 'radial-gradient(circle, #000 20%, transparent 20%)',
            backgroundSize: level > 80 ? '3px 3px' : '4px 4px'
          }}/>
          
          {/* Drip effects at high levels */}
          {level > 70 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-current rounded-full"
                  style={{ left: `${(i - 1) * 2}px` }}
                  animate={{
                    height: [0, 20, 40, 0],
                    opacity: [0.8, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Enhanced markers with danger zones */}
      <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
        {[...Array(10)].map((_, i) => {
          const markerLevel = (9 - i) * 10;
          return (
            <div 
              key={i} 
              className={`w-full h-[1px] ${
                markerLevel >= 80 ? 'bg-toxin-red/40' :
                markerLevel >= 60 ? 'bg-death-yellow/40' :
                markerLevel >= 40 ? 'bg-poison-purple/40' :
                'bg-venom-green/20'
              }`} 
            />
          );
        })}
      </div>

      {/* Level percentage display */}
      <div className="absolute -left-12 top-2 text-xs font-mono text-venom-green">
        {level}%
      </div>
      
      {/* Warning labels */}
      {level > 80 && (
        <motion.div 
          className="absolute -left-16 top-8 text-xs font-bold text-toxin-red"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          FATAL
        </motion.div>
      )}
      
      {level > 60 && level <= 80 && (
        <div className="absolute -left-20 top-8 text-xs font-bold text-death-yellow">
          DANGER
        </div>
      )}
    </div>
  );
}
