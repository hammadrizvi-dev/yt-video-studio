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
import { TransitionMode, pushThrough, whipPan } from "./Transitions";

export interface SceneSlot {
  id: string;
  durationInFrames: number;
  cutMode: TransitionMode;
  isLight?: boolean;
  Component: React.FC;
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
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = Math.max(
    0,
    Math.min(1, frame / Math.max(1, durationInFrames - 1)),
  );
  const timing = linearTiming({ durationInFrames: transitionFrames });

  return (
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
            </React.Fragment>
          );
        })}
      </TransitionSeries>

      <CaptionEngine
        showCaptions={showCaptions}
        words={captionWords}
        accentColor={progressColor}
      />

      {/* Global Subtle 3px Watch-Progress Hairline */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 3,
          backgroundColor: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(progress * 100).toFixed(2)}%`,
            backgroundColor: progressColor,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
