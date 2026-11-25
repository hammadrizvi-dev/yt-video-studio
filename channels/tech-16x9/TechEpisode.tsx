import React from "react";
import { CalculateMetadataFunction } from "remotion";
import { BGM_TRACKS } from "@config/audioMap";
import {
  EpisodeShell,
  SceneSlot,
  SfxCue,
  computeTotalFrames,
} from "@engine/index";
import { Scene01HookCost } from "./scenes/Scene01HookCost";
import { Scene02RouterGauge } from "./scenes/Scene02RouterGauge";
import { Scene03ModelSplit } from "./scenes/Scene03ModelSplit";
import { Scene04CodeLive } from "./scenes/Scene04CodeLive";
import { Scene05BenchmarkNews } from "./scenes/Scene05BenchmarkNews";
import { Scene06PowerStack } from "./scenes/Scene06PowerStack";
import { Scene07OutroDev } from "./scenes/Scene07OutroDev";

export type TechEpisodeProps = {
  hasVoiceOverride?: boolean;
  voiceFileOverride?: string | null;
};

const TRANSITION_FRAMES = 9;

export const TECH_SLOTS: SceneSlot[] = [
  { id: "s01-hook", durationInFrames: 95, cutMode: "whip", isLight: false, Component: Scene01HookCost },
  { id: "s02-gauge", durationInFrames: 95, cutMode: "push", isLight: false, Component: Scene02RouterGauge },
  { id: "s03-flow", durationInFrames: 105, cutMode: "whip", isLight: false, Component: Scene03ModelSplit },
  { id: "s04-code", durationInFrames: 100, cutMode: "cut", isLight: false, Component: Scene04CodeLive },
  { id: "s05-news", durationInFrames: 95, cutMode: "cut", isLight: true, Component: Scene05BenchmarkNews },
  { id: "s06-stack", durationInFrames: 95, cutMode: "push", isLight: false, Component: Scene06PowerStack },
  { id: "s07-outro", durationInFrames: 85, cutMode: "cut", isLight: false, Component: Scene07OutroDev },
];

export const TECH_DURATION_IN_FRAMES = computeTotalFrames(
  TECH_SLOTS,
  TRANSITION_FRAMES,
);

export const calculateTechMetadata: CalculateMetadataFunction<TechEpisodeProps> =
  async () => ({
    durationInFrames: TECH_DURATION_IN_FRAMES,
    fps: 30,
    width: 1920,
    height: 1080,
  });

const TECH_SFX: SfxCue[] = [
  { frame: 2, type: "slam", label: "hook-15k" },
  { frame: 28, type: "cash", label: "zero-cost" },
  { frame: 86, type: "whoosh", label: "cluster-gauge" },
  { frame: 172, type: "soft-hit", label: "router-flow" },
  { frame: 268, type: "type", label: "code-live" },
  { frame: 368, type: "newspaper", label: "news-cut" },
  { frame: 463, type: "pop", label: "power-stack" },
  { frame: 549, type: "riser", label: "outro-curve" },
];

export const TechEpisode: React.FC<TechEpisodeProps> = ({
  hasVoiceOverride = false,
  voiceFileOverride = null,
}) => {
  return (
    <EpisodeShell
      slots={TECH_SLOTS}
      transitionFrames={TRANSITION_FRAMES}
      hasVoice={hasVoiceOverride}
      voiceFile={voiceFileOverride}
      bgmSegments={[
        { from: 0, durationInFrames: 368, file: BGM_TRACKS.techExplainer },
        { from: 368, file: BGM_TRACKS.techLofi },
      ]}
      chapterRanges={[{ from: 86, to: 268 }]}
      sfxCues={TECH_SFX}
      progressColor="#38F2FF"
    />
  );
};
