'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Venom Messages Array
export const VENOM_MESSAGES = {
  10: "sssmall danger… very sssmall 👁️",
  25: "you're warming up my fangs 🔥🐍",
  40: "hiss-terical energy detected 😼",
  60: "venom brewing… stay stillsss 😳",
  80: "the snake demands tribute 💀",
  100: "FULL VENOM! the serpent awakens! ⚡🐍"
};

// Helper function to get venom message
export const getVenomMessage = (level: number): string | null => {
  const thresholds = [100, 80, 60, 40, 25, 10];
  
  for (const threshold of thresholds) {
    if (level >= threshold) {
      return VENOM_MESSAGES[threshold as keyof typeof VENOM_MESSAGES];
    }
  }
  
  return null;
};

// Check if level crosses a threshold
export const checkThresholdCrossed = (prevLevel: number, currentLevel: number): number | null => {
  const thresholds = [10, 25, 40, 60, 80, 100];
  
  for (const threshold of thresholds) {
    if (prevLevel < threshold && currentLevel >= threshold) {
      return threshold;
    }
  }
  
  return null;
};

interface VenomPopupProps {
  message: string | null;
  isVisible: boolean;
  onComplete?: () => void;
}

const VenomPopup: React.FC<VenomPopupProps> = ({ message, isVisible, onComplete }) => {
  React.useEffect(() => {
    if (isVisible && message) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, onComplete]);

  return (
    <div className="fixed top-20 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {isVisible && message && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.3, 
              y: -20,
              x: 20
            }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.05, 1], 
              y: 0,
              x: 0,
              rotate: [0, 1, -1, 0]
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.2,
              y: -30,
              rotate: 5
            }}
            transition={{
              duration: 0.6,
              type: "spring",
              bounce: 0.4,
              scale: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.2
              },
              rotate: {
                repeat: Infinity,
                repeatType: "reverse", 
                duration: 2
              }
            }}
            className="relative max-w-xs"
          >
            {/* Speech Bubble */}
            <div className="bg-venom-green/90 backdrop-blur-lg border-2 border-venom-green rounded-2xl p-4 shadow-2xl shadow-venom-green/30">
              {/* Bubble Pointer */}
              <div className="absolute -left-2 top-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-venom-green/90"></div>
              
              {/* Snake Icon */}
              <motion.div 
                className="absolute -top-3 -right-3 text-2xl bg-black rounded-full p-1 border-2 border-venom-green"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                🐍
              </motion.div>
              
              {/* Message Content */}
              <div className="text-black font-mono text-sm font-bold leading-relaxed">
                {message}
              </div>
              
              {/* Venom Drops Animation */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="text-venom-green text-xs"
                  animate={{ 
                    y: [0, 8, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.5
                  }}
                >
                  💧
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VenomPopup;