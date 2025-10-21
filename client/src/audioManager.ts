// audioManager.ts
// Place in client/ or imports/ depending on your project layout.

let currentBGM: HTMLAudioElement | null = null;

let currentTrack = ""; 
const sfxCache: Record<string, HTMLAudioElement> = {};



let bgmEnabled = false; 
export function initBGM() {
  const storedPref = localStorage.getItem("bgmEnabled");
  bgmEnabled = storedPref === "true";
}
export function playBGM(path: string) {
  // Skip if music is disabled
  if (!bgmEnabled) return;

  // If same track is already playing, skip restart
  if (currentTrack === path && currentBGM) return;

  // Fade out existing music
  if (currentBGM) {
    const fading = currentBGM;
    const fadeOut = setInterval(() => {
      if (fading.volume > 0.05) {
        fading.volume -= 0.05;
      } else {
        fading.pause();
        clearInterval(fadeOut);
      }
    }, 100);
  }

  // Load and play new track
  const bgm = new Audio(path);
  bgm.loop = true;
  bgm.volume = 0.5;
  currentBGM = bgm;
  currentTrack = path;

  bgm.play().catch((err) => {
    console.warn("Play blocked:", err);
  });
}

export function toggleBGM(): boolean {
  bgmEnabled = !bgmEnabled;
  localStorage.setItem("bgmEnabled", String(bgmEnabled));

  if (bgmEnabled && currentBGM) {
    currentBGM.play().catch(console.error);
  } else if (!bgmEnabled && currentBGM) {
    currentBGM.pause();
  }

  return bgmEnabled;
}

export function isBGMEnabled(): boolean {
  const stored = localStorage.getItem("bgmEnabled");
  return stored === "true";
}
export function stopBGM() {
  if (currentBGM) {
    currentBGM.pause();
    currentBGM.currentTime = 0;
  }
}
export function getCurrentBGM(): string {
  return currentTrack;
}

export const playSFX = (name: string, volume = 1.0) => {
  const path = `/sfx/${name}.wav`;
  let sfx = sfxCache[name];
  if (!sfx) {
    sfx = new Audio(path);
    sfxCache[name] = sfx;
  }
  sfx.volume = volume/2;
  sfx.currentTime = 0;
  sfx.play().catch(err => console.warn(`Could not play ${name}:`, err));
};

