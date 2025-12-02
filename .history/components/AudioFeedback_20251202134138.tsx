import React, { useEffect, useRef, useState } from 'react';

interface AudioFeedbackProps {
  venomLevel: number;
  onVenomIncrease: boolean;
}

export default function AudioFeedback({ venomLevel, onVenomIncrease }: AudioFeedbackProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize Web Audio API only on client-side
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported:', error);
      }
    }
  }, []);

  const playTone = (frequency: number, duration: number, volume: number = 0.1) => {
    if (typeof window === 'undefined' || !audioContextRef.current) return;

    try {
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

      oscillator.start(audioContextRef.current.currentTime);
      oscillator.stop(audioContextRef.current.currentTime + duration);
    } catch (error) {
      // Silently handle audio errors
      console.warn('Audio playback failed:', error);
    }
  };

  useEffect(() => {
    if (isClient && onVenomIncrease) {
      // Different tones based on venom level
      if (venomLevel > 80) {
        // Critical - low ominous tone
        playTone(55, 0.3, 0.15);
      } else if (venomLevel > 60) {
        // Warning - mid frequency
        playTone(110, 0.2, 0.1);
      } else if (venomLevel > 30) {
        // Caution - higher frequency
        playTone(220, 0.15, 0.08);
      } else {
        // Safe - subtle click
        playTone(440, 0.05, 0.05);
      }
    }
  }, [isClient, onVenomIncrease, venomLevel]);

  // Ambient background hum for high venom levels
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isClient && venomLevel > 70) {
      intervalId = setInterval(() => {
        playTone(60 + Math.random() * 20, 0.8, 0.02);
      }, 3000 + Math.random() * 2000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isClient, venomLevel]);

  return null; // This component doesn't render anything
}