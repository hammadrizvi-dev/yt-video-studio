import "./styles.css";
import React from "react";
import { Composition, Folder } from "remotion";
import { StudioEpisodeSchema } from "@config/studioSchema";
import {
  FINANCE_DURATION_IN_FRAMES,
  FinanceEpisode,
  calculateFinanceMetadata,
} from "@channels/finance-16x9/FinanceEpisode";
import {
  TECH_DURATION_IN_FRAMES,
  TechEpisode,
  calculateTechMetadata,
} from "@channels/tech-16x9/TechEpisode";
import {
  COMPARISON_DURATION_IN_FRAMES,
  ComparisonEpisode,
  calculateComparisonMetadata,
} from "@channels/comparison-16x9/ComparisonEpisode";
import {
  SHORT_DURATION_IN_FRAMES,
  FinanceShort,
  calculateShortMetadata,
} from "@channels/shorts-9x16/FinanceShort";

const DEFAULT_STUDIO_PROPS = {
  hasVoiceOverride: false,
  voiceFileOverride: null,
  showCaptions: false,
  debugSafeZone: false,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="LongForm-16x9">
        <Composition
          id="Ep01KamaiKitni"
          component={FinanceEpisode}
          durationInFrames={FINANCE_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          schema={StudioEpisodeSchema}
          defaultProps={{ ...DEFAULT_STUDIO_PROPS, progressColor: "#F59E0B" }}
          calculateMetadata={calculateFinanceMetadata}
        />
        <Composition
          id="Ep02TechAgent"
          component={TechEpisode}
          durationInFrames={TECH_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          schema={StudioEpisodeSchema}
          defaultProps={{ ...DEFAULT_STUDIO_PROPS, progressColor: "#38F2FF" }}
          calculateMetadata={calculateTechMetadata}
        />
        <Composition
          id="Ep03CaseComparison"
          component={ComparisonEpisode}
          durationInFrames={COMPARISON_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          schema={StudioEpisodeSchema}
          defaultProps={{ ...DEFAULT_STUDIO_PROPS, progressColor: "#EAB308" }}
          calculateMetadata={calculateComparisonMetadata}
        />
      </Folder>

      <Folder name="Shorts-9x16">
        <Composition
          id="Sh01KamaiShort"
          component={FinanceShort}
          durationInFrames={SHORT_DURATION_IN_FRAMES}
          fps={30}
          width={1080}
          height={1920}
          schema={StudioEpisodeSchema}
          defaultProps={{ ...DEFAULT_STUDIO_PROPS, progressColor: "#F59E0B" }}
          calculateMetadata={calculateShortMetadata}
        />
      </Folder>
    </>
  );
};
