import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DangerZoneProps {
  venomLevel: number;
}

export default function DangerZone({ venomLevel }: DangerZoneProps) {
  const isDangerous = venomLevel > 60;
  const isCritical = venomLevel > 85;
  
  return (
    <AnimatePresence>
      {isDangerous && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-30"
        >
          {/* Corner warning indicators */}
          <div className="absolute top-4 left-4">
            <motion.div
              className={`w-8 h-8 border-l-4 border-t-4 ${
                isCritical ? 'border-toxin-red' : 'border-death-yellow'
              }`}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8] 
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          
          <div className="absolute top-4 right-4">
            <motion.div
              className={`w-8 h-8 border-r-4 border-t-4 ${
                isCritical ? 'border-toxin-red' : 'border-death-yellow'
              }`}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8] 
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
          </div>
          
          <div className="absolute bottom-4 left-4">
            <motion.div
              className={`w-8 h-8 border-l-4 border-b-4 ${
                isCritical ? 'border-toxin-red' : 'border-death-yellow'
              }`}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8] 
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
          
          <div className="absolute bottom-4 right-4">
            <motion.div
              className={`w-8 h-8 border-r-4 border-b-4 ${
                isCritical ? 'border-toxin-red' : 'border-death-yellow'
              }`}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8] 
              }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            />
          </div>
          
          {/* Central danger text */}
          {isCritical && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="text-toxin-red text-4xl font-bold text-center select-none"
                animate={{
                  scale: [0.9, 1.1, 0.9],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  textShadow: '0 0 20px #ff1439, 0 0 40px #ff1439',
                  filter: 'blur(0.5px)',
                }}
              >
                CRITICAL
                <div className="text-sm mt-2 font-mono">
                  VENOM OVERLOAD
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Border danger glow */}
          <div 
            className={`absolute inset-0 border-2 ${
              isCritical ? 'border-toxin-red' : 'border-death-yellow'
            } opacity-20 pointer-events-none`}
            style={{
              animation: isCritical ? 'danger-pulse 1s infinite' : 'pulse 2s infinite',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}