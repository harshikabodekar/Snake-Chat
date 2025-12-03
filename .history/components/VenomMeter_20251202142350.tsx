import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  prevLevel?: number;
  onLevelUp?: (level: number, message: string) => void;
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
  backgroundColor = 'bg-black/80',
  prevLevel = 0,
  onLevelUp
}: VenomMeterProps) {
  const [showBubble, setShowBubble] = React.useState(false);
  const [bubbleMessage, setBubbleMessage] = React.useState('');
  const [bubbleKey, setBubbleKey] = React.useState(0);
  const getVenomColor = () => {
    if (level > 80) return '#ff1439'; // Critical red
    if (level > 60) return '#ffff14'; // Warning yellow  
    if (level > 40) return '#8b14ff'; // Danger purple
    return '#39ff14'; // Safe green
  };

  const getGlowIntensity = () => {
    const baseGlow = glowIntensity;
    if (level > 80) return `0 0 ${30 * baseGlow}px #ff1439, 0 0 ${60 * baseGlow}px #ff1439`;
    if (level > 60) return `0 0 ${25 * baseGlow}px #ffff14, 0 0 ${50 * baseGlow}px #ffff14`;
    if (level > 40) return `0 0 ${20 * baseGlow}px #8b14ff, 0 0 ${40 * baseGlow}px #8b14ff`;
    return `0 0 ${20 * baseGlow}px #39ff14`;
  };

  const positionClasses = position === 'left' 
    ? 'left-4' 
    : 'right-4';

  const getWidthClass = () => {
    if (width >= 20) return 'w-20';
    if (width >= 16) return 'w-16';
    if (width >= 12) return 'w-12';
    if (width >= 10) return 'w-10';
    return 'w-8';
  };

  const getVenomousQuote = (level: number) => {
    if (level >= 95) return ["🐍 APEX PREDATOR! Death incarnate!", "💀 You've become the void itself!"];
    if (level >= 90) return ["⚠️ LETHAL INJECTION! One bite = game over!", "🩸 Your venom could kill a dragon!"];
    if (level >= 85) return ["💉 PURE TOXICITY! Handle with extreme care!", "⚡ Lightning-fast death dealer!"];
    if (level >= 80) return ["🔥 CRITICAL MASS! Danger to all life forms!", "💀 Walking weapon of mass destruction!"];
    if (level >= 75) return ["☠️ HIGHLY VENOMOUS! Approach with caution!", "🐍 Serpent of nightmares awakened!"];
    if (level >= 70) return ["⚠️ DANGEROUS LEVELS! Toxic aura detected!", "🌪️ Whirlwind of poison brewing!"];
    if (level >= 65) return ["🧪 CHEMICAL WARFARE! Beware the bite!", "⚗️ Brewing a deadly cocktail!"];
    if (level >= 60) return ["☣️ TOXIC TERRITORY! Enter at your own risk!", "🐍 Venom glands fully charged!"];
    if (level >= 55) return ["⚡ CHARGED WITH POISON! Electrifying danger!", "💚 Green with deadly envy!"];
    if (level >= 50) return ["🌿 NATURE'S ASSASSIN! Silent but deadly!", "🎭 Mastering the art of poison!"];
    if (level >= 45) return ["🔬 EXPERIMENTAL TOXINS! Mad scientist vibes!", "💉 Injection of pure malice!"];
    if (level >= 40) return ["☣️ MODERATE TOXICITY! Getting interesting...", "🐍 Fangs are sharpening nicely!"];
    if (level >= 35) return ["🌱 GROWING STRONGER! Poison ivy mentality!", "⚗️ Brewing something wicked!"];
    if (level >= 30) return ["🧬 DNA MUTATING! Becoming more venomous!", "🐍 Scales getting sharper!"];
    if (level >= 25) return ["💚 VENOM RISING! Feel the power growing!", "⚡ Electric personality developing!"];
    if (level >= 20) return ["🌿 FIRST DROPS! Poison starts to flow!", "🐍 Baby fangs are coming in!"];
    if (level >= 15) return ["💧 DROPLETS OF DOOM! Venom glands activating!", "🌱 Seedling of destruction planted!"];
    if (level >= 10) return ["⚡ SPARK OF MALICE! Something wicked brewing!", "💚 Green tinge detected!"];
    if (level >= 5) return ["🌿 FIRST TASTE! Bitter beginnings...", "🐍 Serpentine thoughts emerging!"];
    return ["😇 PURE AS SNOW! For now...", "🌸 Innocent... but for how long?"];
  };

  // Detect level up and show poison bubble
  React.useEffect(() => {
    if (level > prevLevel && level % 5 === 0 && level > 0) {
      const quotes = getVenomousQuote(level);
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      // Show bubble message
      setBubbleMessage(randomQuote);
      setShowBubble(true);
      setBubbleKey(prev => prev + 1);
      
      // Hide bubble after 4 seconds
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [level, prevLevel]);

  return (
    <div className={`fixed ${positionClasses} top-1/2 -translate-y-1/2 ${getWidthClass()} border-4 ${borderRadius} overflow-hidden backdrop-blur-lg z-50 ${backgroundColor} ${
      level > 80 ? 'animate-pulse border-toxin-red shadow-2xl shadow-toxin-red/50' :
      level > 60 ? 'border-death-yellow shadow-2xl shadow-death-yellow/50' :
      level > 40 ? 'border-poison-purple shadow-2xl shadow-poison-purple/50' :
      level > 0 ? 'border-venom-green shadow-2xl shadow-venom-green/40' :
      'border-venom-green/30 shadow-xl shadow-venom-green/20'
    } ${level > 0 ? 'ring-2 ring-venom-green/30' : ''}`}
    style={{ height }}>
      
      {/* Skull warning at top for high levels */}
      {showWarnings && level > 75 && (
        <motion.div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 text-toxin-red text-2xl"
          animate={{ 
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 15, -15, 0] 
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          💀
        </motion.div>
      )}
      
      {/* Enhanced danger indicators */}
      {showWarnings && level > 90 && (
        <motion.div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 text-toxin-red text-xs font-bold tracking-wider"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ⚠️ LETHAL ⚠️
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
      {showPercentage && (
        <div className={`absolute ${position === 'left' ? '-right-14' : '-left-14'} top-3 text-sm font-mono font-bold ${
          level > 80 ? 'text-toxin-red' :
          level > 60 ? 'text-death-yellow' :
          level > 40 ? 'text-poison-purple' :
          'text-venom-green'
        }`}>
          {level}%
        </div>
      )}
      
      {/* Enhanced status indicator */}
      {showPercentage && (
        <div className={`absolute ${position === 'left' ? '-right-20' : '-left-20'} top-8 text-xs font-mono ${
          level > 80 ? 'text-toxin-red' :
          level > 60 ? 'text-death-yellow' :
          level > 40 ? 'text-poison-purple' :
          'text-venom-green/70'
        }`}>
          {level > 95 ? 'LETHAL' :
           level > 80 ? 'CRITICAL' :
           level > 60 ? 'DANGEROUS' :
           level > 40 ? 'MODERATE' :
           level > 20 ? 'LOW' : 'SAFE'}
        </div>
      )}
      
      {/* Warning labels */}
      {showLabels && level > 80 && (
        <motion.div 
          className={`absolute ${position === 'left' ? '-right-20' : '-left-20'} top-12 text-xs font-bold text-toxin-red`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ⚠️ FATAL
        </motion.div>
      )}
      
      {showLabels && level > 60 && level <= 80 && (
        <div className={`absolute ${position === 'left' ? '-right-24' : '-left-24'} top-12 text-xs font-bold text-death-yellow`}>
          ⚡ DANGER
        </div>
      )}
      
      {showLabels && level > 40 && level <= 60 && (
        <div className={`absolute ${position === 'left' ? '-right-28' : '-left-28'} top-12 text-xs font-bold text-poison-purple`}>
          ☣️ TOXIC
        </div>
      )}

      {/* Poison Bubble Message */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={bubbleKey}
            initial={{ 
              opacity: 0, 
              scale: 0.3, 
              x: position === 'left' ? 40 : -40,
              y: 20
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: position === 'left' ? 60 : -60,
              y: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.2,
              y: -30
            }}
            transition={{ 
              duration: 0.6, 
              type: "spring",
              bounce: 0.4
            }}
            className={`absolute ${position === 'left' ? '-right-56' : '-left-56'} top-1/3 max-w-48 p-3 rounded-2xl text-xs font-bold backdrop-blur-lg z-50 ${
              level > 80 ? 'bg-toxin-red/30 text-toxin-red border-2 border-toxin-red/50 shadow-lg shadow-toxin-red/30' :
              level > 60 ? 'bg-death-yellow/30 text-death-yellow border-2 border-death-yellow/50 shadow-lg shadow-death-yellow/30' :
              level > 40 ? 'bg-poison-purple/30 text-poison-purple border-2 border-poison-purple/50 shadow-lg shadow-poison-purple/30' :
              'bg-venom-green/30 text-venom-green border-2 border-venom-green/50 shadow-lg shadow-venom-green/30'
            } relative`}
          >
            {/* Bubble pointer */}
            <div className={`absolute ${position === 'left' ? 'left-0 -ml-2' : 'right-0 -mr-2'} top-1/2 -translate-y-1/2 w-0 h-0 ${
              level > 80 ? 'border-l-8 border-l-toxin-red/50 border-y-8 border-y-transparent' :
              level > 60 ? 'border-l-8 border-l-death-yellow/50 border-y-8 border-y-transparent' :
              level > 40 ? 'border-l-8 border-l-poison-purple/50 border-y-8 border-y-transparent' :
              'border-l-8 border-l-venom-green/50 border-y-8 border-y-transparent'
            } ${position === 'left' ? 'rotate-180' : ''}`}></div>
            
            <div className="flex items-center space-x-2">
              <span className="text-lg">🧪</span>
              <div>
                <div className="font-bold text-xs opacity-80">VENOM LEVEL {level}%</div>
                <div className="mt-1">{bubbleMessage}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
