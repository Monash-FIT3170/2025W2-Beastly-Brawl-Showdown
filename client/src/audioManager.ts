// audioManager.ts
// Place in client/ or imports/ depending on your project layout.

let bgm: HTMLAudioElement | null = null;
let bgmEnabled = true;
let currentTrack = "";
let bgmInitialized = false;
const sfxCache: Record<string, HTMLAudioElement> = {};


async function safePlay(audio: HTMLAudioElement) {
  try {
    await audio.play();
    return true;
  } catch (err) {
  
    console.warn("Audio playback blocked / deferred:", err);
    return false;
  }
}





export function playBGM(path: string) {
  if (!bgm) {
    bgm = new Audio(path);
    bgm.loop = true;
    bgm.volume = 0.5;

    const storedPref = localStorage.getItem("bgmEnabled");
    bgmEnabled = storedPref === null ? true : storedPref === "true";

    if (bgmEnabled) {
      bgm.play().catch(() => {
        console.warn("Autoplay blocked until user gesture");
      });
    }
  } else if (bgm.src !== new URL(path, window.location.href).href) {
    bgm.src = path;
    if (bgmEnabled) {
      bgm.play().catch(() => {});
    }
  }
}


export function toggleBGM(): boolean {
  bgmEnabled = !bgmEnabled;
  localStorage.setItem("bgmEnabled", String(bgmEnabled));

  if (!bgm) return bgmEnabled;

  if (bgmEnabled) {
    bgm.play().catch(() => {});
  } else {
    bgm.pause();
  }

  return bgmEnabled;
}

export function isBGMEnabled(): boolean {
  const stored = localStorage.getItem("bgmEnabled");
  return stored === null ? bgmEnabled : stored === "true";
}


export function stopBGM() {
  if (bgm) {
    bgm.pause();
    bgm.currentTime = 0;
  }
}



export function restoreBGMPreference(path: string) {
  try {
    bgmEnabled = isBGMEnabled();
    if (bgmEnabled) playBGM(path);
  } catch (err) {
    console.warn("restoreBGMPreference error:", err);
  }
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

