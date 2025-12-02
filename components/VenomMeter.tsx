import React from 'react';
import { motion } from 'framer-motion';

interface VenomMeterProps {
  level: number;
}

export default function VenomMeter({ level }: VenomMeterProps) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 h-[60vh] w-8 bg-black/50 border border-venom-green/30 rounded-full overflow-hidden backdrop-blur-sm z-40">
      <div className="absolute inset-0 flex flex-col justify-end">
        <motion.div
          className="w-full bg-venom-green shadow-[0_0_20px_#39ff14]"
          style={{ height: `${level}%` }}
          animate={{ height: `${level}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="w-full h-full opacity-50" style={{
                backgroundImage: 'radial-gradient(circle, #000 20%, transparent 20%)',
                backgroundSize: '4px 4px'
            }}/>
        </motion.div>
      </div>

      {/* Markers */}
      <div className="absolute inset-0 flex flex-col justify-between py-4 pointer-events-none">
          {[...Array(10)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-venom-green/20" />
          ))}
      </div>
    </div>
  );
}
