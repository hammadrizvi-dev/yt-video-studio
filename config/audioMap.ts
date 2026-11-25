export type SfxKind =
  | "slam"
  | "whoosh"
  | "whoosh-soft"
  | "riser"
  | "riser-long"
  | "pop"
  | "click"
  | "tick"
  | "cash"
  | "marker"
  | "marker-squeak"
  | "newspaper"
  | "paper"
  | "type"
  | "shutter"
  | "glitch"
  | "soft-hit"
  | "sub-hit"
  | "sub-drop"
  | "swipe"
  | "zoom";

export const BGM_TRACKS = {
  financeCase: "bgm/finance-case.mp3",
  financeWarm: "bgm/finance-warm.mp3",
  financeAmbient: "bgm/finance-ambient.wav",
  techExplainer: "bgm/tech-explainer.mp3",
  techLofi: "bgm/tech-lofi.mp3",
  techAmbient: "bgm/tech-ambient.wav",
} as const;

export const SFX_FILES: Record<SfxKind, string> = {
  slam: "sfx/slam.mp3",
  whoosh: "sfx/whoosh-deep.mp3",
  "whoosh-soft": "sfx/whoosh-soft.mp3",
  riser: "sfx/riser_short.mp3",
  "riser-long": "sfx/riser.wav",
  pop: "sfx/pop.wav",
  click: "sfx/ui-click.ogg",
  tick: "sfx/ui-tick.ogg",
  cash: "sfx/coin_clink.mp3",
  marker: "sfx/marker-draw.mp3",
  "marker-squeak": "sfx/marker_squeak.mp3",
  newspaper: "sfx/newspaper-open.mp3",
  paper: "sfx/paper-slide.mp3",
  type: "sfx/typewriter-keys.mp3",
  shutter: "sfx/shutter.mp3",
  glitch: "sfx/glitch_digital.mp3",
  "soft-hit": "sfx/soft-hit.mp3",
  "sub-hit": "sfx/sub-hit.mp3",
  "sub-drop": "sfx/sub_drop.mp3",
  swipe: "sfx/swipe.mp3",
  zoom: "sfx/zoom.mp3",
};

export const SFX_DEFAULT_DURATIONS: Record<SfxKind, number> = {
  slam: 26,
  whoosh: 22,
  "whoosh-soft": 20,
  riser: 30,
  "riser-long": 45,
  pop: 12,
  click: 8,
  tick: 8,
  cash: 22,
  marker: 26,
  "marker-squeak": 22,
  newspaper: 26,
  paper: 22,
  type: 28,
  shutter: 18,
  glitch: 18,
  "soft-hit": 16,
  "sub-hit": 22,
  "sub-drop": 32,
  swipe: 16,
  zoom: 20,
};

export const SFX_VOLUMES: Record<SfxKind, number> = {
  slam: 0.24,
  whoosh: 0.16,
  "whoosh-soft": 0.12,
  riser: 0.15,
  "riser-long": 0.14,
  pop: 0.14,
  click: 0.1,
  tick: 0.08,
  cash: 0.18,
  marker: 0.15,
  "marker-squeak": 0.14,
  newspaper: 0.18,
  paper: 0.14,
  type: 0.11,
  shutter: 0.16,
  glitch: 0.14,
  "soft-hit": 0.14,
  "sub-hit": 0.2,
  "sub-drop": 0.22,
  swipe: 0.15,
  zoom: 0.16,
};

export const AUDIO_MIX = {
  VOICE: 1.0,
  BGM_NORMAL: 0.075,
  BGM_CHAPTER: 0.145,
  BGM_DUCK_FLOOR: 0.055,
} as const;
