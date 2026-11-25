import React from "react";
import { CalculateMetadataFunction } from "remotion";
import { BGM_TRACKS } from "@config/audioMap";
import {
  EpisodeShell,
  SceneSlot,
  SfxCue,
  computeTotalFrames,
} from "@engine/index";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02BillBreakdown } from "./scenes/Scene02BillBreakdown";
import { Scene03KitchenRider } from "./scenes/Scene03KitchenRider";
import { Scene04MarginGauge } from "./scenes/Scene04MarginGauge";
import { Scene05CashFlow } from "./scenes/Scene05CashFlow";
import { Scene06NewsAudit } from "./scenes/Scene06NewsAudit";
import { Scene07DonutSplit } from "./scenes/Scene07DonutSplit";
import { Scene08ScaleMap } from "./scenes/Scene08ScaleMap";
import { Scene09Outro } from "./scenes/Scene09Outro";

export type FinanceEpisodeProps = {
  hasVoiceOverride?: boolean;
  voiceFileOverride?: string | null;
};

const TRANSITION_FRAMES = 9;

export const FINANCE_SLOTS: SceneSlot[] = [
  { id: "s01-hook", durationInFrames: 90, cutMode: "whip", isLight: false, Component: Scene01Hook },
  { id: "s02-bill", durationInFrames: 100, cutMode: "push", isLight: false, Component: Scene02BillBreakdown },
  { id: "s03-split", durationInFrames: 95, cutMode: "whip", isLight: false, Component: Scene03KitchenRider },
  { id: "s04-gauge", durationInFrames: 95, cutMode: "push", isLight: false, Component: Scene04MarginGauge },
  { id: "s05-flow", durationInFrames: 110, cutMode: "cut", isLight: false, Component: Scene05CashFlow },
  { id: "s06-news", durationInFrames: 95, cutMode: "push", isLight: true, Component: Scene06NewsAudit },
  { id: "s07-donut", durationInFrames: 100, cutMode: "cut", isLight: true, Component: Scene07DonutSplit },
  { id: "s08-map", durationInFrames: 110, cutMode: "cut", isLight: false, Component: Scene08ScaleMap },
  { id: "s09-outro", durationInFrames: 90, cutMode: "cut", isLight: true, Component: Scene09Outro },
];

export const FINANCE_DURATION_IN_FRAMES = computeTotalFrames(
  FINANCE_SLOTS,
  TRANSITION_FRAMES,
);

export const calculateFinanceMetadata: CalculateMetadataFunction<FinanceEpisodeProps> =
  async () => ({
    durationInFrames: FINANCE_DURATION_IN_FRAMES,
    fps: 30,
    width: 1920,
    height: 1080,
  });

const FINANCE_SFX: SfxCue[] = [
  { frame: 2, type: "slam", label: "hook-300" },
  { frame: 28, type: "riser", label: "reveal-16" },
  { frame: 81, type: "whoosh", label: "bill-enter" },
  { frame: 119, type: "cash", label: "net-16" },
  { frame: 172, type: "whoosh-soft", label: "kitchen-rider" },
  { frame: 258, type: "pop", label: "gauge" },
  { frame: 344, type: "cash", label: "sankey-flow" },
  { frame: 454, type: "newspaper", label: "news-cut" },
  { frame: 540, type: "paper", label: "donut-paper" },
  { frame: 640, type: "slam", label: "scale-map" },
  { frame: 750, type: "marker", label: "ledger-verify" },
];

export const FinanceEpisode: React.FC<FinanceEpisodeProps> = ({
  hasVoiceOverride = false,
  voiceFileOverride = null,
}) => {
  return (
    <EpisodeShell
      slots={FINANCE_SLOTS}
      transitionFrames={TRANSITION_FRAMES}
      hasVoice={hasVoiceOverride}
      voiceFile={voiceFileOverride}
      bgmSegments={[
        { from: 0, durationInFrames: 454, file: BGM_TRACKS.financeCase },
        { from: 454, file: BGM_TRACKS.financeWarm },
      ]}
      chapterRanges={[{ from: 172, to: 344 }]}
      sfxCues={FINANCE_SFX}
      progressColor="#F59E0B"
    />
  );
};
