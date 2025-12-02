import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "venom-green": "#39ff14",
        "venom-dark": "#0a0f0a",
        "toxin-red": "#ff1439",
        "poison-purple": "#8b14ff",
        "death-yellow": "#ffff14",
        "shadow-black": "#000000",
      },
      animation: {
        'pulse-danger': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite linear alternate',
        'toxin-drift': 'toxin-drift 3s infinite ease-in-out',
        'danger-glow': 'danger-glow 2s infinite ease-in-out alternate',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.8' },
        },
        'toxin-drift': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(2deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'danger-glow': {
          '0%': { boxShadow: '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 15px #39ff14' },
          '100%': { boxShadow: '0 0 10px #ff1439, 0 0 20px #ff1439, 0 0 30px #ff1439' },
        },
      },
      fontFamily: {
        // We can add a custom spooky font later or use standard ones
      },
    },
  },
  plugins: [],
};
export default config;
