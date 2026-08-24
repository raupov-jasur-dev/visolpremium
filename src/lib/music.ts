/**
 * Ichki ambient musiqa dvigateli.
 * Haqiqiy MP3 o'rniga Web Audio API orqali nafis pad/arpeggio chaladi.
 * Foydalanuvchi o'z faylini yuklasa, HTMLAudio ishlatiladi.
 */

export const MUSIC_TRACKS = [
  { id: "none", title: "Musiqasiz" },
  { id: "ipak-tuni", title: "Ipak tuni" },
  { id: "guliston", title: "Guliston" },
  { id: "yulduzlar", title: "Yulduzlar ostida" },
  { id: "sokin-yurak", title: "Sokin yurak" },
] as const;

export type MusicId = (typeof MUSIC_TRACKS)[number]["id"];

type Voice = {
  osc: OscillatorNode;
  gain: GainNode;
  filter: BiquadFilterNode;
};

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let voices: Voice[] = [];
let interval: number | null = null;
let currentId: string | null = null;
let htmlAudio: HTMLAudioElement | null = null;

function ensureCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);
  }
  return ctx;
}

function stopVoices() {
  if (interval != null) {
    window.clearInterval(interval);
    interval = null;
  }
  for (const v of voices) {
    try {
      v.osc.stop();
    } catch {
      /* already stopped */
    }
    v.osc.disconnect();
    v.gain.disconnect();
    v.filter.disconnect();
  }
  voices = [];
  if (htmlAudio) {
    htmlAudio.pause();
    htmlAudio = null;
  }
  currentId = null;
}

function note(freq: number, type: OscillatorType, filterFreq: number): Voice {
  const c = ensureCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  const filter = c.createBiquadFilter();
  osc.type = type;
  osc.frequency.value = freq;
  filter.type = "lowpass";
  filter.frequency.value = filterFreq;
  gain.gain.value = 0;
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master!);
  osc.start();
  return { osc, gain, filter };
}

const SCALES: Record<string, number[]> = {
  "ipak-tuni": [220, 261.63, 329.63, 392, 440],
  guliston: [246.94, 293.66, 329.63, 392, 493.88],
  yulduzlar: [196, 246.94, 293.66, 392, 493.88],
  "sokin-yurak": [174.61, 220, 261.63, 329.63, 349.23],
};

function startPad(id: string) {
  const scale = SCALES[id];
  if (!scale) return;
  const c = ensureCtx();
  void c.resume();
  // Ikki sekin pad ovozi — ipakdek yoyiladi.
  const v1 = note(scale[0], "sine", 900);
  const v2 = note(scale[2], "triangle", 700);
  voices = [v1, v2];
  const now = c.currentTime;
  v1.gain.gain.setTargetAtTime(0.35, now, 1.4);
  v2.gain.gain.setTargetAtTime(0.18, now, 1.8);

  let i = 0;
  interval = window.setInterval(() => {
    const freq = scale[i % scale.length];
    const v = voices[0];
    if (!v || !ctx) return;
    v.osc.frequency.setTargetAtTime(freq, ctx.currentTime, 0.8);
    voices[1]?.osc.frequency.setTargetAtTime(scale[(i + 2) % scale.length] / 2, ctx.currentTime, 1.2);
    i += 1;
  }, 2400);
}

export function playMusic(id: string | undefined) {
  if (typeof window === "undefined") return;
  if (!id || id === "none") {
    stopVoices();
    return;
  }
  if (id.startsWith("data:") || id.startsWith("blob:") || id.startsWith("http")) {
    stopVoices();
    htmlAudio = new Audio(id);
    htmlAudio.loop = true;
    htmlAudio.volume = 0.45;
    void htmlAudio.play().catch(() => {
      /* avtoplay bloklangan — foydalanuvchi tugmani bosadi */
    });
    currentId = id;
    return;
  }
  if (currentId === id && voices.length) return;
  stopVoices();
  startPad(id);
  currentId = id;
}

export function stopMusic() {
  if (typeof window === "undefined") return;
  stopVoices();
}

export function isCustomMusic(id: string | undefined): boolean {
  if (!id) return false;
  return id.startsWith("data:") || id.startsWith("blob:") || id.startsWith("http");
}
