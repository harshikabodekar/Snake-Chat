import React from 'react';

export default function VisualEffects() {
  return (
    <>
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden mix-blend-overlay opacity-30">
        <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] animate-scanlines" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/60" />
      </div>
    </>
  );
}
