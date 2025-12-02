import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { soundManager } from '@/utils/SoundManager';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  venomLevel: number;
}

export default function MessageBubble({ text, isUser, venomLevel }: MessageBubbleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPoked, setIsPoked] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handlePoke = () => {
      setIsPoked(true);
      soundManager.playHiss(0.3);
      soundManager.playGlitch();
      setTimeout(() => setIsPoked(false), 500);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{
          opacity: 1,
          y: 0,
          scale: isPoked ? 1.1 : 1,
          x: isPoked ? [0, -10, 10, -5, 5, 0] : 0,
      }}
      transition={{
          type: "spring",
          x: { duration: 0.3 }
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        borderRadius: isUser
          ? "20px 20px 0px 20px"
          : "20px 20px 20px 0px",
      }}
      className={`relative max-w-[80%] p-4 rounded-2xl mb-4 border cursor-pointer select-none group ${
        isUser
          ? 'ml-auto bg-venom-green/10 text-venom-green rounded-tr-none border-venom-green/30'
          : 'mr-auto bg-zinc-900/80 text-gray-300 rounded-tl-none border-zinc-700'
      } ${isPoked ? 'border-red-500 bg-red-900/20' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handlePoke}
    >
      <div className="relative z-10 break-words font-mono text-sm md:text-base pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        {text}
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Slithering Snake Emojis */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none opacity-20" style={{ transform: "translateZ(10px)" }}>
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
