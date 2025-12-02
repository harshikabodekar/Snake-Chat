import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  venomLevel: number;
}

export default function MessageBubble({ text, isUser, venomLevel }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`relative max-w-[80%] p-4 rounded-2xl mb-4 border border-venom-green/20 ${
        isUser
          ? 'ml-auto bg-venom-green/10 text-venom-green rounded-tr-none'
          : 'mr-auto bg-zinc-900/80 text-gray-300 rounded-tl-none'
      }`}
      style={{
        borderRadius: isUser
          ? "20px 20px 0px 20px"
          : "20px 20px 20px 0px",
      }}
      whileHover={{ scale: 1.02, rotate: isUser ? 1 : -1 }}
    >
      <div className="relative z-10 break-words font-mono text-sm md:text-base">
        {text}
      </div>

      {/* Slithering Snake Emojis */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-20">
         <motion.div
            className="absolute top-1/2 -translate-y-1/2 text-xs"
            animate={{
                x: ['-10%', '110%'],
                y: [0, 5, 0, -5, 0]
            }}
            transition={{
                x: { duration: 10 - (venomLevel * 0.05), repeat: Infinity, ease: "linear", repeatType: "mirror" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
         >
             🐍
         </motion.div>
         {venomLevel > 50 && (
             <motion.div
                className="absolute top-1/3 -translate-y-1/2 text-xs"
                animate={{
                    x: ['110%', '-10%'],
                }}
                transition={{
                    x: { duration: 12 - (venomLevel * 0.05), repeat: Infinity, ease: "linear", repeatType: "mirror", delay: 1 }
                }}
             >
                 🐍
             </motion.div>
         )}
      </div>
    </motion.div>
  );
}
