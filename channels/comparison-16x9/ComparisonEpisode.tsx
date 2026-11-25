import React from "react";
import { CalculateMetadataFunction } from "remotion";
import { BGM_TRACKS } from "@config/audioMap";
import { StudioEpisodeProps } from "@config/studioSchema";
import {
  EpisodeShell,
  RelativeSfxCue,
  SceneSlot,
  computeSceneStartFrames,
  computeTotalFrames,
  resolveSceneSfxCues,
} from "@engine/index";
import { Scene01ActHook } from "./scenes/Scene01ActHook";
import { Scene02ProfitParadox } from "./scenes/Scene02ProfitParadox";
import { Scene02VersusBoard } from "./scenes/Scene02VersusBoard";
import { Scene03RevenueTrajectory } from "./scenes/Scene03RevenueTrajectory";
import { Scene05FilingAudit } from "./scenes/Scene05FilingAudit";
import { Scene04RiseFallTimeline } from "./scenes/Scene04RiseFallTimeline";
import { Scene07MarginBreakdown } from "./scenes/Scene07MarginBreakdown";
import { Scene06FinalVerdict } from "./scenes/Scene06FinalVerdict";

export type ComparisonEpisodeProps = Partial<StudioEpisodeProps>;

const TRANSITION_FRAMES = 9;

export const COMPARISON_SLOTS: SceneSlot[] = [
  { id: "c01-hook", durationInFrames: 90, cutMode: "push", isLight: false, Component: Scene01ActHook },
  { id: "c02-stakes", durationInFrames: 95, cutMode: "whip", isLight: false, Component: Scene02ProfitParadox },
  { id: "c03-versus", durationInFrames: 105, cutMode: "wipe", isLight: false, Component: Scene02VersusBoard },
  { id: "c04-ticker", durationInFrames: 105, cutMode: "cut", isLight: false, Component: Scene03RevenueTrajectory },
  { id: "c05-filing", durationInFrames: 105, cutMode: "cut", isLight: true, Component: Scene05FilingAudit },
  { id: "c06-timeline", durationInFrames: 105, cutMode: "cut", isLight: false, Component: Scene04RiseFallTimeline },
  { id: "c07-economics", durationInFrames: 95, cutMode: "cut", isLight: true, Component: Scene07MarginBreakdown },
  { id: "c08-verdict", durationInFrames: 105, cutMode: "cut", isLight: false, Component: Scene06FinalVerdict },
];

export const COMPARISON_DURATION_IN_FRAMES = computeTotalFrames(
  COMPARISON_SLOTS,
  TRANSITION_FRAMES,
);

const SCENE_STARTS = computeSceneStartFrames(
  COMPARISON_SLOTS,
  TRANSITION_FRAMES,
);

export const calculateComparisonMetadata: CalculateMetadataFunction<ComparisonEpisodeProps> =
  async () => ({
    durationInFrames: COMPARISON_DURATION_IN_FRAMES,
    fps: 30,
    width: 1920,
    height: 1080,
  });

const RELATIVE_SFX: RelativeSfxCue[] = [
  { sceneId: "c01-hook", offsetFrames: 2, type: "sub-hit", label: "act-open" },
  { sceneId: "c02-stakes", offsetFrames: 0, type: "whoosh", label: "stakes-enter" },
  { sceneId: "c02-stakes", offsetFrames: 18, type: "sub-drop", label: "profit-divergence-hit" },
  { sceneId: "c03-versus", offsetFrames: 0, type: "swipe", label: "versus-enter" },
  { sceneId: "c03-versus", offsetFrames: 9, type: "slam", label: "vs-badge-slam" },
  { sceneId: "c04-ticker", offsetFrames: 0, type: "riser", label: "ticker-climb" },
  { sceneId: "c04-ticker", offsetFrames: 42, type: "cash", label: "surge-badge" },
  { sceneId: "c05-filing", offsetFrames: 0, type: "newspaper", label: "filing-spotlight" },
  { sceneId: "c05-filing", offsetFrames: 14, type: "marker", label: "highlight-sweep" },
  { sceneId: "c05-filing", offsetFrames: 42, type: "slam", label: "stamp-verified" },
  { sceneId: "c06-timeline", offsetFrames: 0, type: "whoosh-soft", label: "timeline-draw" },
  { sceneId: "c06-timeline", offsetFrames: 19, type: "pop", label: "turning-point-blinkit" },
  { sceneId: "c07-economics", offsetFrames: 0, type: "paper", label: "economics-paper-flip" },
  { sceneId: "c07-economics", offsetFrames: 24, type: "soft-hit", label: "ebitda-bars-peak" },
  { sceneId: "c08-verdict", offsetFrames: 0, type: "sub-hit", label: "verdict-enter" },
  { sceneId: "c08-verdict", offsetFrames: 36, type: "slam", label: "winner-seal" },
];

const COMPARISON_SFX = resolveSceneSfxCues(
  COMPARISON_SLOTS,
  TRANSITION_FRAMES,
  RELATIVE_SFX,
);

export const ComparisonEpisode: React.FC<ComparisonEpisodeProps> = ({
  hasVoiceOverride = false,
  voiceFileOverride = null,
  showCaptions = false,
  debugSafeZone = false,
  progressColor = "#EAB308",
}) => {
  const actTwoStart = SCENE_STARTS["c05-filing"] ?? 368;
  const boostFrom = SCENE_STARTS["c02-stakes"] ?? 81;
  const boostTo = SCENE_STARTS["c05-filing"] ?? 368;

  return (
    <EpisodeShell
      slots={COMPARISON_SLOTS}
      transitionFrames={TRANSITION_FRAMES}
      hasVoice={hasVoiceOverride}
      voiceFile={voiceFileOverride}
      showCaptions={showCaptions}
      debugSafeZone={debugSafeZone}
      bgmSegments={[
        { from: 0, durationInFrames: actTwoStart, file: BGM_TRACKS.financeCase },
        { from: actTwoStart, file: BGM_TRACKS.financeWarm },
      ]}
      chapterRanges={[{ from: boostFrom, to: boostTo }]}
      sfxCues={COMPARISON_SFX}
      progressColor={progressColor}
      cinemaOverlay={true}
      grainOpacity={0.065}
      showFrameGuides={true}
    />
  );
};
