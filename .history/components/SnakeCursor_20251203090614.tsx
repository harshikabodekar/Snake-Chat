'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

export default function SnakeCursor() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [snakePosition, setSnakePosition] = useState<Position>({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [wiggleOffset, setWiggleOffset] = useState(0);
  const lastPositionRef = useRef<Position>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Mouse tracking with smooth following
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, input, textarea, a, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth snake following animation
  useEffect(() => {
    const animateSnake = () => {
      setSnakePosition(prevPos => {
        const dx = mousePosition.x - prevPos.x;
        const dy = mousePosition.y - prevPos.y;
        
        // Smooth following with easing
        const easing = 0.15;
        const newX = prevPos.x + dx * easing;
        const newY = prevPos.y + dy * easing;
        
        // Calculate angle based on movement direction
        const deltaX = newX - lastPositionRef.current.x;
        const deltaY = newY - lastPositionRef.current.y;
        
        if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
          const newAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
          setAngle(newAngle);
          lastPositionRef.current = { x: newX, y: newY };
        }
        
        return { x: newX, y: newY };
      });

      // Continuous wiggle animation
      setWiggleOffset(prev => prev + 0.3);
      
      animationFrameRef.current = requestAnimationFrame(animateSnake);
    };

    animationFrameRef.current = requestAnimationFrame(animateSnake);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  const wiggleY = Math.sin(wiggleOffset) * 2;

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .snake-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          width: 24px;
          height: 24px;
          transform-origin: center center;
        }
        
        .snake-head {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #39ff14, #2dd010);
          border: 2px solid #1a5c0a;
          position: relative;
          transition: all 0.1s ease;
        }
        
        .snake-eyes {
          position: absolute;
          top: 6px;
          left: 6px;
          right: 6px;
          display: flex;
          justify-content: space-between;
        }
        
        .snake-eye {
          width: 4px;
          height: 4px;
          background: #000;
          border-radius: 50%;
          transition: all 0.1s ease;
        }
        
        .snake-mouth {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 2px;
          background: #000;
          border-radius: 1px;
          transition: all 0.2s ease;
        }
        
        .snake-tongue {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 1px;
          background: #ff1439;
          border-radius: 0.5px;
          opacity: 0;
          transition: all 0.2s ease;
        }
        
        .snake-tongue::before {
          content: '';
          position: absolute;
          right: -2px;
          top: -1px;
          width: 3px;
          height: 3px;
          border-left: 1px solid #ff1439;
          border-top: 1px solid #ff1439;
          transform: rotate(45deg);
        }
        
        .snake-tongue::after {
          content: '';
          position: absolute;
          right: -2px;
          bottom: -1px;
          width: 3px;
          height: 3px;
          border-left: 1px solid #ff1439;
          border-bottom: 1px solid #ff1439;
          transform: rotate(-45deg);
        }
        
        /* Hover states */
        .snake-cursor.hovering .snake-mouth {
          width: 12px;
          height: 4px;
          background: #1a5c0a;
        }
        
        .snake-cursor.hovering .snake-tongue {
          opacity: 1;
        }
        
        .snake-cursor.hovering .snake-eye {
          background: #ff1439;
        }
        
        /* Pixel-perfect borders */
        .snake-head {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
      
      <motion.div
        className={`snake-cursor ${isHovering ? 'hovering' : ''}`}
        style={{
          left: snakePosition.x - 12,
          top: snakePosition.y - 12 + wiggleY,
          transform: `rotate(${angle}deg)`,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 30 }
        }}
      >
        <div className="snake-head">
          <div className="snake-eyes">
            <div className="snake-eye"></div>
            <div className="snake-eye"></div>
          </div>
          <div className="snake-mouth"></div>
          <div className="snake-tongue"></div>
        </div>
      </motion.div>
      
      {/* Snake body segments for extra effect */}
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: snakePosition.x - 8,
          top: snakePosition.y - 8 + wiggleOffset * 0.5,
          width: 16,
          height: 16,
          background: 'linear-gradient(45deg, #2dd010, #1a5c0a)',
          borderRadius: '50%',
          zIndex: 9998,
          opacity: 0.7,
          transform: `rotate(${angle * 0.8}deg)`,
        }}
        animate={{
          scale: [0.8, 0.9, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="fixed pointer-events-none"
        style={{
          left: snakePosition.x - 6,
          top: snakePosition.y - 6 + wiggleOffset * 0.3,
          width: 12,
          height: 12,
          background: 'linear-gradient(45deg, #1a5c0a, #0d4005)',
          borderRadius: '50%',
          zIndex: 9997,
          opacity: 0.5,
          transform: `rotate(${angle * 0.6}deg)`,
        }}
        animate={{
          scale: [0.6, 0.7, 0.6],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1
        }}
      />
    </>
  );
}
