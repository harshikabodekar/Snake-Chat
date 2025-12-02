# Snake-Chat
#  Snake Chat — Venom Meter Edition

##  Project Description  
**Snake Chat** is a weird, interactive, visually chaotic chat app where the more you type…  
**the more your text mutates into a snake.**

Every message increases a **Venom Meter**, the UI becomes more toxic, snake emojis start slithering across the bubbles, and eventually a giant snake flash appears when venom hits 100%.

It’s built for fun, experimentation, and showing off strange UI concepts to tools like Jules.

---

##  Features  
-  **Text Mutation Engine** — adds “sss”, bends letters, inserts snake symbols  
-  **Venom Meter** — fills with each message, triggers a toxic event at 100%  
-  **Animated Snake Emojis** — wiggle + crawl across message bubbles  
-  **Snake Cursor** — small snake follows your mouse  
-  **Lightweight WebGL Background** — neon-green fluid shader  
-  **Framer Motion Animations** — smooth slithering & corruption  
-  100% Client-Side  

---

##  Tech Stack  
- Next.js + TypeScript  
- Tailwind CSS  
- Framer Motion  
- Lightweight WebGL / GLSL shader  
- No backend  

---

##  Structure  
```
/pages/index.tsx
/components/
   MessageBubble.tsx
   VenomMeter.tsx
   SnakeCursor.tsx
   BackgroundWebGL.tsx
/utils/mutateText.ts
/tailwind.config.js
```

---

##  How It Works  
1. You type a message  
2. Message count increases corruption level  
3. Venom Meter fills  
4. Letters mutate ("s", "sss", snake glyphs, curvy distortions)  
5. At venom 100% ⇒ toxic flash animation  
6. Meter resets  

---

##  Run Locally  
```
npm install
npm run dev
```

---
