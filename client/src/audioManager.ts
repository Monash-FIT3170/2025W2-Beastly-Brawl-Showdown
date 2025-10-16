// audioManager.ts
// Place in client/ or imports/ depending on your project layout.

let bgm: HTMLAudioElement | null = null;

let currentTrack = "";
let bgmInitialized = false;
const sfxCache: Record<string, HTMLAudioElement> = {};



let bgmEnabled = false; 

export function playBGM(path: string) {
  // Create global audio instance once
  if (!bgm) {
    bgm = new Audio(path);
    bgm.loop = true;
    bgm.volume = 0.5;

    const storedPref = localStorage.getItem("bgmEnabled");
    bgmEnabled = storedPref === "true";

    // Try to auto-play if preference says on
    if (bgmEnabled) {
      bgm.play().catch(() => {
        console.warn("Autoplay blocked — waiting for toggle.");
      });
    }
  }
}

export function toggleBGM(): boolean {
  bgmEnabled = !bgmEnabled;
  localStorage.setItem("bgmEnabled", String(bgmEnabled));

  if (!bgm) return bgmEnabled;

  if (bgmEnabled) {
    bgm.play().catch((err) => {
      console.warn("Play failed:", err);
    });
  } else {
    bgm.pause();
  }

  return bgmEnabled;
}

export function isBGMEnabled(): boolean {
  const stored = localStorage.getItem("bgmEnabled");
  return stored === "true";
}

export const playSFX = (name: string, volume = 1.0) => {
  const path = `/sfx/${name}.wav`;
  let sfx = sfxCache[name];
  if (!sfx) {
    sfx = new Audio(path);
    sfxCache[name] = sfx;
  }
  sfx.volume = volume;
  sfx.currentTime = 0;
  sfx.play().catch(err => console.warn(`Could not play ${name}:`, err));
};

