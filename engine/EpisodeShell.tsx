import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import {
  AudioEngine,
  BgmSegment,
  ChapterBoostRange,
  SfxCue,
} from "./AudioEngine";
import { CaptionEngine, TimedWord } from "./CaptionEngine";
import { FilmOverlay } from "./FilmOverlay";
import { SafeZoneDebugContext } from "./SafeZoneContext";
import {
  TransitionMode,
  pushThrough,
  whipPan,
  wipeReveal,
} from "./Transitions";
import { SfxKind } from "@config/audioMap";

export interface SceneSlot {
  id: string;
  durationInFrames: number;
  cutMode: TransitionMode;
  isLight?: boolean;
  Component: React.FC;
}

export interface RelativeSfxCue {
  sceneId: string;
  offsetFrames: number;
  type: SfxKind;
  file?: string;
  volume?: number;
  durationInFrames?: number;
  label?: string;
}

/**
 * Computes exact global start frame for every SceneSlot, accounting for
 * transition overlaps and the Mandatory Polarity-Flip Cut Rule.
 */
export function computeSceneStartFrames(
  slots: readonly SceneSlot[],
  transitionFrames: number,
): Record<string, number> {
  const starts: Record<string, number> = {};
  let cursor = 0;

  slots.forEach((slot, idx) => {
    starts[slot.id] = cursor;
    const isLast = idx === slots.length - 1;
    const next = slots[idx + 1];
    const polarityFlip =
      !isLast && Boolean(slot.isLight) !== Boolean(next?.isLight);
    const hasOverlap = !isLast && !polarityFlip && slot.cutMode !== "cut";
    cursor += slot.durationInFrames - (hasOverlap ? transitionFrames : 0);
  });

  return starts;
}

/**
 * Converts scene-relative SFX cues into frame-accurate global SfxCues so
 * audio timing never drifts when scene durations are edited.
 */
export function resolveSceneSfxCues(
  slots: readonly SceneSlot[],
  transitionFrames: number,
  relativeCues: readonly RelativeSfxCue[],
): SfxCue[] {
  const starts = computeSceneStartFrames(slots, transitionFrames);
  const resolved: SfxCue[] = [];

  for (const cue of relativeCues) {
    const base = starts[cue.sceneId];
    if (base === undefined) continue;
    resolved.push({
      frame: Math.max(0, base + cue.offsetFrames),
      type: cue.type,
      file: cue.file,
      volume: cue.volume,
      durationInFrames: cue.durationInFrames,
      label: cue.label ?? `${cue.sceneId}+${cue.offsetFrames}`,
    });
  }

  return resolved;
}

export function computeTotalFrames(
  slots: readonly SceneSlot[],
  transitionFrames: number,
): number {
  const raw = slots.reduce((sum, s) => sum + s.durationInFrames, 0);
  const overlaps = slots.slice(0, -1).filter((s, idx) => {
    const next = slots[idx + 1];
    // Mandatory Cut Rule: never animate across opposite luminance polarity
    if (Boolean(s.isLight) !== Boolean(next?.isLight)) {
      return false;
    }
    return s.cutMode !== "cut";
  }).length;
  return Math.max(1, raw - overlaps * transitionFrames);
}

export interface EpisodeShellProps {
  slots: readonly SceneSlot[];
  transitionFrames?: number;
  hasVoice?: boolean;
  voiceFile?: string | null;
  bgmSegments?: BgmSegment[];
  chapterRanges?: ChapterBoostRange[];
  sfxCues?: SfxCue[];
  progressColor?: string;
  showCaptions?: boolean;
  captionWords?: TimedWord[];
  /** Enable 35mm documentary film grain & vignette overlay (default: true) */
  cinemaOverlay?: boolean;
  grainOpacity?: number;
  /** Subtle documentary viewfinder corner brackets */
  showFrameGuides?: boolean;
  /** Toggle Studio safe-zone overlay across every scene */
  debugSafeZone?: boolean;
}

export const EpisodeShell: React.FC<EpisodeShellProps> = ({
  slots,
  transitionFrames = 9,
  hasVoice = false,
  voiceFile = null,
  bgmSegments = [],
  chapterRanges = [],
  sfxCues = [],
  progressColor = "#F59E0B",
  showCaptions = false,
  captionWords = [],
  cinemaOverlay = true,
  grainOpacity = 0.06,
  showFrameGuides = false,
  debugSafeZone = false,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = Math.max(
    0,
    Math.min(1, frame / Math.max(1, durationInFrames - 1)),
  );
  const timing = linearTiming({ durationInFrames: transitionFrames });

  const sceneStarts = computeSceneStartFrames(slots, transitionFrames);
  let activeIsLight = false;
  for (let i = 0; i < slots.length; i++) {
    const startF = sceneStarts[slots[i].id] ?? 0;
    if (frame >= startF) {
      activeIsLight = Boolean(slots[i].isLight);
    }
  }

  return (
    <SafeZoneDebugContext.Provider value={debugSafeZone}>
      <AbsoluteFill style={{ backgroundColor: "#040710" }}>
      <AudioEngine
        hasVoice={hasVoice}
        voiceFile={voiceFile}
        bgmSegments={bgmSegments}
        chapterRanges={chapterRanges}
        sfxCues={sfxCues}
      />

      <TransitionSeries>
        {slots.map((slot, idx) => {
          const isLast = idx === slots.length - 1;
          const next = slots[idx + 1];
          const polarityFlip =
            !isLast && Boolean(slot.isLight) !== Boolean(next?.isLight);
          const effectiveMode: TransitionMode = polarityFlip
            ? "cut"
            : slot.cutMode;
          const Comp = slot.Component;

          return (
            <React.Fragment key={slot.id}>
              <TransitionSeries.Sequence durationInFrames={slot.durationInFrames}>
                <Comp />
              </TransitionSeries.Sequence>

              {!isLast && effectiveMode === "whip" && (
                <TransitionSeries.Transition
                  presentation={whipPan(idx % 2 === 0 ? "left" : "right")}
                  timing={timing}
                />
              )}

              {!isLast && effectiveMode === "push" && (
                <TransitionSeries.Transition
                  presentation={pushThrough()}
                  timing={timing}
                />
              )}

              {!isLast && effectiveMode === "wipe" && (
                <TransitionSeries.Transition
                  presentation={wipeReveal(
                    idx % 2 === 0 ? "left" : "right",
                    progressColor,
                  )}
                  timing={timing}
                />
              )}
            </React.Fragment>
          );
        })}
      </TransitionSeries>

      {cinemaOverlay && (
        <FilmOverlay
          grainOpacity={grainOpacity}
          isLightScene={activeIsLight}
          showFrameGuides={showFrameGuides}
        />
      )}

      <CaptionEngine
        showCaptions={showCaptions}
        words={captionWords}
        accentColor={progressColor}
      />

      {/* Global Top Progress Hairline with Chapter Boundary Notches */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: activeIsLight
            ? "rgba(20,20,19,0.12)"
            : "rgba(255,255,255,0.08)",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(progress * 100).toFixed(2)}%`,
            backgroundColor: progressColor,
            boxShadow: `0 0 12px ${progressColor}`,
          }}
        />
        {slots.slice(1).map((slot) => {
          const startF = sceneStarts[slot.id] ?? 0;
          const leftPct = (startF / Math.max(1, durationInFrames)) * 100;
          return (
            <div
              key={`tick-${slot.id}`}
              style={{
                position: "absolute",
                top: 0,
                left: `${leftPct.toFixed(2)}%`,
                width: 2,
                height: 6,
                backgroundColor: activeIsLight
                  ? "rgba(20,20,19,0.28)"
                  : "rgba(255,255,255,0.34)",
              }}
            />
          );
        })}
      </div>
      </AbsoluteFill>
    </SafeZoneDebugContext.Provider>
  );
};
