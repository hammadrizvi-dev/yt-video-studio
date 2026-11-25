import React from "react";
import { CalculateMetadataFunction } from "remotion";
import { BGM_TRACKS } from "@config/audioMap";
import {
  EpisodeShell,
  SceneSlot,
  SfxCue,
  computeTotalFrames,
} from "@engine/index";
import { Short01Hook } from "./scenes/Short01Hook";
import { Short02SplitCards } from "./scenes/Short02SplitCards";
import { Short03Gauge } from "./scenes/Short03Gauge";
import { Short04Climax } from "./scenes/Short04Climax";

export type ShortEpisodeProps = {
  hasVoiceOverride?: boolean;
  voiceFileOverride?: string | null;
};

const TRANSITION_FRAMES = 8;

export const SHORT_SLOTS: SceneSlot[] = [
  { id: "sh01-hook", durationInFrames: 85, cutMode: "whip", isLight: false, Component: Short01Hook },
  { id: "sh02-split", durationInFrames: 95, cutMode: "push", isLight: false, Component: Short02SplitCards },
  { id: "sh03-gauge", durationInFrames: 90, cutMode: "whip", isLight: false, Component: Short03Gauge },
  { id: "sh04-climax", durationInFrames: 105, cutMode: "cut", isLight: false, Component: Short04Climax },
];

export const SHORT_DURATION_IN_FRAMES = computeTotalFrames(
  SHORT_SLOTS,
  TRANSITION_FRAMES,
);

export const calculateShortMetadata: CalculateMetadataFunction<ShortEpisodeProps> =
  async () => ({
    durationInFrames: SHORT_DURATION_IN_FRAMES,
    fps: 30,
    width: 1080,
    height: 1920,
  });

const SHORT_SFX: SfxCue[] = [
  { frame: 2, type: "slam", label: "short-hook" },
  { frame: 26, type: "riser", label: "short-16" },
  { frame: 77, type: "whoosh", label: "short-split" },
  { frame: 164, type: "pop", label: "short-gauge" },
  { frame: 246, type: "cash", label: "short-climax" },
];

export const FinanceShort: React.FC<ShortEpisodeProps> = ({
  hasVoiceOverride = false,
  voiceFileOverride = null,
}) => {
  return (
    <EpisodeShell
      slots={SHORT_SLOTS}
      transitionFrames={TRANSITION_FRAMES}
      hasVoice={hasVoiceOverride}
      voiceFile={voiceFileOverride}
      bgmSegments={[{ from: 0, file: BGM_TRACKS.financeCase }]}
      chapterRanges={[{ from: 77, to: 164 }]}
      sfxCues={SHORT_SFX}
      progressColor="#F59E0B"
    />
  );
};
