// imports/audioManager.ts
let bgm: HTMLAudioElement | null = null;
const sfxCache: Record<string, HTMLAudioElement> = {};


export const playBGM = (src: string, volume = 0.5) => {
  if (bgm) return; 

  bgm = new Audio(src);
  bgm.loop = true;
  bgm.volume = volume;

  bgm.play().catch(() => {
    console.warn("Autoplay blocked");
  });

  (window as any).bgm = bgm;
};

export const stopBGM = () => {
  if (bgm) {
    bgm.pause();
    bgm = null;
  }
};

/**
 * Plays  sound effect
 */
export const playSFX = (name: string, volume = 1.0) => {
  const path = `/sfx/${name}.wav`;
  let sfx = sfxCache[name];

  if (!sfx) {
    sfx = new Audio(path);
    sfxCache[name] = sfx;
  }

  sfx.currentTime = 0;
  sfx.volume = volume;
  sfx.play().catch((err) => {
    console.warn(`Could not play SFX "${name}":`, err);
  });
};
