// audioManager.ts
// Place in client/ or imports/ depending on your project layout.

let currentBGM: HTMLAudioElement | null = null;

let currentTrack = ""; 
const sfxCache: Record<string, HTMLAudioElement> = {};



let bgmEnabled = false; 

let bgm: HTMLAudioElement | null = null;


export function initBGM() {
  if (!bgm) {
    bgm = new Audio("/music/Beastly_brawl_menu_screen_music.mp3");
    bgm.loop = true;
    bgm.volume = 0.5;
  }
}

export function playBGM(src?: string) {
  initBGM();

  if (src && bgm?.src !== window.location.origin + src) {
    bgm.src = src;
  }

  if (bgmEnabled && bgm) {
    bgm.play().catch((err) => console.warn("BGM play blocked:", err));
  }
}

export function stopBGM() {
  if (bgm) {
    bgm.pause();
  }
}

export function toggleBGM() {
  bgmEnabled = !bgmEnabled;
  if (bgmEnabled) {
    playBGM();
  } else {
    stopBGM();
  }
  return bgmEnabled;
}

export function isBGMEnabled() {
  return bgmEnabled;
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

