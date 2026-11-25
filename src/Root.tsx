import "./styles.css";
import React from "react";
import { Composition, Folder } from "remotion";
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
  SHORT_DURATION_IN_FRAMES,
  FinanceShort,
  calculateShortMetadata,
} from "@channels/shorts-9x16/FinanceShort";

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
          calculateMetadata={calculateFinanceMetadata}
        />
        <Composition
          id="Ep02TechAgent"
          component={TechEpisode}
          durationInFrames={TECH_DURATION_IN_FRAMES}
          fps={30}
          width={1920}
          height={1080}
          calculateMetadata={calculateTechMetadata}
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
          calculateMetadata={calculateShortMetadata}
        />
      </Folder>
    </>
  );
};
