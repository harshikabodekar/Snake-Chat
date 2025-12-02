export const mutateText = (text: string, venomLevel: number, seed: number): string => {
  if (venomLevel < 10) return text;

  let corrupted = text;
  let currentSeed = seed + text.length; // varying seed slightly

  const random = () => {
      currentSeed = (currentSeed * 9301 + 49297) % 233280;
      return currentSeed / 233280;
  };

  // Chance to mutate increases with venom
  const mutationChance = venomLevel / 200; // 0.05 to 0.5

  // 1. Extend vowels
  corrupted = corrupted.replace(/[aeiou]/gi, (match) => {
    if (random() < mutationChance) {
      return match.repeat(Math.floor(random() * 3) + 2);
    }
    return match;
  });

  // 2. Add snake sounds
  const sss = ["sss", "hiss", "zszs", "~<>><<~"];
  const words = corrupted.split(" ");
  corrupted = words.map(word => {
    if (random() < mutationChance) {
      const sound = sss[Math.floor(random() * sss.length)];
      return random() > 0.5 ? `${word} ${sound}` : `${sound} ${word}`;
    }
    return word;
  }).join(" ");

  // 3. Replace S with Z or prolonged S
  corrupted = corrupted.replace(/s/gi, (match) => {
    if (random() < mutationChance) {
       return random() > 0.5 ? "zz" : "ssss";
    }
    return match;
  });

  return corrupted;
};
