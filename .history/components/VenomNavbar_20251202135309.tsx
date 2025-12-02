import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VenomNavbarProps {
  venomLevel: number;
  onSnakeNameChange: (name: string) => void;
  snakeName: string;
}

export default function VenomNavbar({ venomLevel, onSnakeNameChange, snakeName }: VenomNavbarProps) {
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [tempName, setTempName] = useState(snakeName);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavbarStyle = () => {
    if (venomLevel > 80) return 'bg-black/90 border-toxin-red/50 shadow-toxin-red/20';
    if (venomLevel > 60) return 'bg-black/90 border-death-yellow/50 shadow-death-yellow/20';
    if (venomLevel > 40) return 'bg-black/90 border-poison-purple/50 shadow-poison-purple/20';
    return 'bg-black/90 border-venom-green/30 shadow-venom-green/10';
  };

  const getTextColor = () => {
    if (venomLevel > 80) return 'text-toxin-red';
    if (venomLevel > 60) return 'text-death-yellow';
    if (venomLevel > 40) return 'text-poison-purple';
    return 'text-venom-green';
  };

  const handleSaveName = () => {
    onSnakeNameChange(tempName);
    setIsNameModalOpen(false);
  };

  const navItems = [
    { icon: '🐍', label: 'Venom Chat', onClick: () => {} },
    { icon: '📝', label: 'Name Snake', onClick: () => setIsNameModalOpen(true) },
    { icon: '⚗️', label: 'Toxin Lab', onClick: () => {} },
    { icon: '📊', label: 'Stats', onClick: () => {} },
    { icon: '⚙️', label: 'Settings', onClick: () => setIsMenuOpen(!isMenuOpen) },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b-2 transition-all duration-300 ${getNavbarStyle()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo/Brand */}
            <div className="flex items-center space-x-4">
              <motion.div
                className="text-4xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: venomLevel > 70 ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🐍
              </motion.div>
              <div className="flex flex-col">
                <h1 className={`text-2xl font-bold font-mono ${getTextColor()} transition-colors duration-300`}>
                  VENOM CHAT
                </h1>
                <span className="text-sm opacity-60 font-mono">
                  v2.0 TOXIC EDITION
                </span>
              </div>
            </div>

            {/* Snake Name Display */}
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-lg opacity-70">Your Snake:</span>
              <motion.button
                onClick={() => setIsNameModalOpen(true)}
                className={`px-5 py-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 text-lg font-bold ${
                  venomLevel > 60 ? 'border-current bg-current/10' : 'border-current/30 hover:bg-current/10'
                } ${getTextColor()}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-mono font-semibold">
                  {snakeName || 'Unnamed Snake'} 
                  {venomLevel > 75 && ' 💀'}
                </span>
              </motion.button>
            </div>

            {/* Navigation Items */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.slice(1, -1).map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className={`px-5 py-3 rounded-xl text-lg font-mono font-semibold transition-all duration-300 hover:bg-current/10 border-2 border-transparent hover:border-current/30 ${getTextColor()}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    filter: venomLevel > 70 ? 'blur(0.3px)' : 'none'
                  }}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile/Settings Menu */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${getTextColor()} hover:bg-current/10 transition-colors duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Danger Indicator Bar */}
        {venomLevel > 50 && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div 
              className={`h-full transition-all duration-300 ${
                venomLevel > 80 ? 'bg-toxin-red animate-pulse' :
                venomLevel > 60 ? 'bg-death-yellow' :
                'bg-poison-purple'
              }`}
              style={{ width: `${venomLevel}%` }}
            />
          </motion.div>
        )}
      </nav>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed top-16 right-4 z-50 rounded-lg border backdrop-blur-md p-4 min-w-48 ${getNavbarStyle()}`}
          >
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    if (item.label !== 'Settings') setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-all duration-300 hover:bg-current/10 ${getTextColor()} flex items-center space-x-2`}
                  whileHover={{ x: 5 }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </motion.button>
              ))}
              
              <div className="border-t border-current/20 pt-2 mt-2">
                <div className="text-xs opacity-60 font-mono">
                  Toxicity: {venomLevel}%
                </div>
                <div className="text-xs opacity-60 font-mono">
                  Status: {venomLevel > 80 ? 'LETHAL' : venomLevel > 60 ? 'TOXIC' : venomLevel > 40 ? 'DANGEROUS' : 'SAFE'}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Snake Name Modal */}
      <AnimatePresence>
        {isNameModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setIsNameModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-xl border-2 backdrop-blur-md p-6 w-full max-w-md ${getNavbarStyle()}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold mb-2 ${getTextColor()}`}>
                  🐍 Name Your Snake
                </h2>
                <p className="text-sm opacity-70 font-mono">
                  Give your venomous companion a fearsome name
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-mono mb-2 ${getTextColor()}`}>
                    Snake Name:
                  </label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Enter a deadly name..."
                    className={`w-full px-4 py-3 bg-black/50 border rounded-lg font-mono focus:outline-none focus:ring-2 transition-all duration-300 ${
                      venomLevel > 60 ? `border-current focus:ring-current/50 ${getTextColor()}` : 'border-venom-green/40 focus:ring-venom-green/50 text-venom-green'
                    }`}
                    maxLength={20}
                  />
                  <div className="text-xs opacity-60 mt-1 font-mono">
                    {tempName.length}/20 characters
                  </div>
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setIsNameModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-600/50 text-white rounded-lg font-mono hover:bg-gray-600/70 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={handleSaveName}
                    className={`flex-1 px-4 py-2 rounded-lg font-mono transition-all duration-300 ${
                      venomLevel > 60 ? `bg-current/20 ${getTextColor()} hover:bg-current/30` : 'bg-venom-green/20 text-venom-green hover:bg-venom-green/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Name 🐍
                  </motion.button>
                </div>
              </div>

              {/* Snake suggestions */}
              <div className="mt-4 pt-4 border-t border-current/20">
                <p className="text-xs opacity-60 mb-2 font-mono">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {['Viper', 'Cobra', 'Mamba', 'Toxin', 'Fang', 'Shadow'].map((name) => (
                    <button
                      key={name}
                      onClick={() => setTempName(name)}
                      className={`px-2 py-1 text-xs rounded border border-current/30 hover:bg-current/10 transition-all duration-300 font-mono ${getTextColor()}`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}