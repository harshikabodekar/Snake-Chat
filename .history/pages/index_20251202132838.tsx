import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBubble from '@/components/MessageBubble';
import VenomMeter from '@/components/VenomMeter';
import SnakeCursor from '@/components/SnakeCursor';
import BackgroundWebGL from '@/components/BackgroundWebGL';
import ToxinParticles from '@/components/ToxinParticles';
import DangerZone from '@/components/DangerZone';
import AudioFeedback from '@/components/AudioFeedback';
import { mutateText } from '@/utils/mutateText';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [venomLevel, setVenomLevel] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [venomIncreased, setVenomIncreased] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    // Mutate text based on current venom level
    const finalMessage = mutateText(inputValue, venomLevel, messages.length);

    const newMessage: Message = {
      id: Date.now(),
      text: finalMessage,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Increase venom
    setVenomIncreased(true);
    setTimeout(() => setVenomIncreased(false), 100);
    
    setVenomLevel((prev) => {
      const nextLevel = prev + 10;
      if (nextLevel >= 100) {
        triggerVenomExplosion();
        return 0;
      }
      return nextLevel;
    });
  };

  const triggerVenomExplosion = () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 500);

    // Add system message
    setTimeout(() => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            text: "⚠️ VENOM EXPELLED... SYSTEM RESET ⚠️",
            isUser: false
        }]);
    }, 600);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-black selection:bg-venom-green selection:text-black font-mono ${
      venomLevel > 90 ? 'animate-[screen-shake_0.5s_infinite]' : ''
    }`}>
      <Head>
        <title>Snake Chat — Venom Edition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Background Layer */}
      <BackgroundWebGL venomLevel={venomLevel} />

      {/* UI Elements */}
      <SnakeCursor />
      <VenomMeter level={venomLevel} />
      <ToxinParticles venomLevel={venomLevel} />
      <DangerZone venomLevel={venomLevel} />
      <AudioFeedback venomLevel={venomLevel} onVenomIncrease={venomIncreased} />

      {/* Giant Snake Flash Overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-venom-green mix-blend-hard-light pointer-events-none"
          >
             <div className="text-[20rem] opacity-50 font-black tracking-tighter">SSSS</div>
             <img src="https://em-content.zobj.net/source/microsoft-teams/337/snake_1f40d.png" alt="snake" className="absolute w-1/2 opacity-50 animate-pulse" style={{ filter: 'brightness(0) invert(1)' }}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Interface */}
      <main className={`relative z-10 flex flex-col h-screen max-w-4xl mx-auto p-4 transition-all duration-300 ${venomLevel > 50 ? 'animate-[glitch_0.2s_infinite]' : ''}`}>

        {/* Header */}
        <header className={`py-4 border-b mb-4 flex justify-between items-center backdrop-blur-md rounded-xl px-6 transition-all duration-300 ${
          venomLevel > 80 ? 'bg-toxin-red/10 border-toxin-red/30 animate-pulse-danger' :
          venomLevel > 60 ? 'bg-death-yellow/10 border-death-yellow/30' :
          venomLevel > 40 ? 'bg-poison-purple/10 border-poison-purple/30' :
          'bg-black/40 border-venom-green/20'
        }`}>
          <h1 className={`text-2xl font-bold transition-all duration-300 ${
            venomLevel > 80 ? 'text-toxin-red animate-flicker' :
            venomLevel > 60 ? 'text-death-yellow' :
            venomLevel > 40 ? 'text-poison-purple' :
            'text-venom-green'
          }`} style={{
            filter: venomLevel > 60 ? 'blur(0.3px)' : 'none',
            textShadow: venomLevel > 80 ? '0 0 15px #ff1439' : '0 0 10px rgba(57,255,20,0.5)'
          }}>
            🐍 SNAKE CHAT <span className="text-xs opacity-70">v.VENOM</span>
          </h1>
          <div className={`text-xs font-mono ${
            venomLevel > 80 ? 'text-toxin-red font-bold animate-pulse' :
            venomLevel > 60 ? 'text-death-yellow' :
            venomLevel > 40 ? 'text-poison-purple' :
            'text-venom-green/60'
          }`}>
            TOXICITY: {venomLevel}% {venomLevel > 75 && '💀'}
          </div>
        </header>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-venom-green scrollbar-track-black/20">
          <AnimatePresence>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} isUser={msg.isUser} venomLevel={venomLevel} />
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="mt-4 relative group">
          <div className={`absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${
            venomLevel > 80 ? 'bg-gradient-to-r from-toxin-red to-poison-purple animate-pulse-danger' :
            venomLevel > 60 ? 'bg-gradient-to-r from-death-yellow to-toxin-red animate-pulse' :
            venomLevel > 40 ? 'bg-gradient-to-r from-poison-purple to-venom-green animate-pulse' :
            'bg-gradient-to-r from-venom-green to-blue-600'
          } ${venomLevel > 0 ? 'animate-pulse' : ''}`}></div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              venomLevel > 80 ? "⚠️ LETHAL DOSE..." :
              venomLevel > 60 ? "Inject toxins..." :
              venomLevel > 40 ? "Drip poison..." :
              "Type your venom here..."
            }
            className={`relative w-full bg-black rounded-lg px-4 py-3 text-white focus:outline-none transition-all ${
              venomLevel > 80 ? 'border-2 border-toxin-red placeholder-red-400 focus:ring-2 focus:ring-toxin-red/50 animate-danger-glow' :
              venomLevel > 60 ? 'border-2 border-death-yellow placeholder-yellow-400 focus:ring-2 focus:ring-death-yellow/50' :
              venomLevel > 40 ? 'border-2 border-poison-purple placeholder-purple-400 focus:ring-2 focus:ring-poison-purple/50' :
              'border border-venom-green/40 placeholder-gray-500 focus:ring-2 focus:ring-venom-green/50 focus:border-transparent'
            }`}
            style={{
              transform: inputValue.length > 0 && venomLevel > 50 ? `rotate(${Math.sin(Date.now() * 0.01) * 0.5}deg)` : 'none',
              filter: venomLevel > 70 ? 'blur(0.2px)' : 'none'
            }}
          />
          {inputValue.length > 0 && (
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                 {[...Array(3)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-venom-green text-xs font-bold"
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 30],
                            y: [0, (Math.random() - 0.5) * 30],
                            rotate: [0, (Math.random() - 0.5) * 60]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 0.5 + Math.random() * 0.5,
                            delay: i * 0.1
                        }}
                    >
                        sss
                    </motion.span>
                 ))}
             </div>
          )}
        </form>
      </main>
    </div>
  );
}
