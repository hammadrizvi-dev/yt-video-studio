export type AspectProfile = "16x9" | "9x16";

export interface SafeZoneSpec {
  profile: AspectProfile;
  isVertical: boolean;
  canvasWidth: number;
  canvasHeight: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  innerWidth: number;
  innerHeight: number;
  centerX: number;
  centerY: number;
  typography: {
    eyebrow: number;
    body: number;
    cardTitle: number;
    headline: number;
    hero: number;
  };
}

export const SAFE_ZONES: Record<AspectProfile, SafeZoneSpec> = {
  "16x9": {
    profile: "16x9",
    isVertical: false,
    canvasWidth: 1920,
    canvasHeight: 1080,
    top: 64,
    right: 80,
    bottom: 88,
    left: 80,
    innerWidth: 1760,
    innerHeight: 928,
    centerX: 960,
    centerY: 528,
    typography: {
      eyebrow: 28,
      body: 34,
      cardTitle: 42,
      headline: 74,
      hero: 172,
    },
  },
  "9x16": {
    profile: "9x16",
    isVertical: true,
    canvasWidth: 1080,
    canvasHeight: 1920,
    top: 240,
    right: 120,
    bottom: 460,
    left: 72,
    innerWidth: 888,
    innerHeight: 1220,
    centerX: 516,
    centerY: 850,
    typography: {
      eyebrow: 28,
      body: 34,
      cardTitle: 40,
      headline: 60,
      hero: 142,
    },
  },
};

export function getSafeZone(width: number, height: number): SafeZoneSpec {
  return height > width ? SAFE_ZONES["9x16"] : SAFE_ZONES["16x9"];
}
