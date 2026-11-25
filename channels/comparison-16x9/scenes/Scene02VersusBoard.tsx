import React from "react";
import { SceneViewport } from "@engine/index";
import { SplitVersusBoard } from "@components/index";

export const Scene02VersusBoard: React.FC = () => {
  return (
    <SceneViewport
      theme="documentary-noir"
      backdropMode="dotted-board"
      camera="ken-burns"
      impactFrames={[9]}
    >
      <SplitVersusBoard
        leftName="ETERNAL (ZOMATO)"
        leftTag="BLINKIT + FOOD ECOSYSTEM"
        leftColor="#22C55E"
        rightName="SWIGGY"
        rightTag="INSTAMART + FOOD CORE"
        rightColor="#F97316"
        rows={[
          {
            label: "Q2 FY27 Revenue",
            leftValue: "₹24,138 Cr",
            rightValue: "₹7,571 Cr",
            winner: "left",
          },
          {
            label: "Q2 FY27 Net PAT",
            leftValue: "+₹125 Cr",
            rightValue: "-₹922 Cr",
            winner: "left",
          },
          {
            label: "Dark Store Network",
            leftValue: "2,751 Stores",
            rightValue: "1,240 Stores",
            winner: "left",
          },
          {
            label: "Quick Commerce Share",
            leftValue: "46% GMV",
            rightValue: "22% GMV",
            winner: "left",
          },
        ]}
        sourceNote="Sources: Eternal & Swiggy Q2 FY27 results (Oct 2026); SW Cybernetics QC GMV report (Oct 2026)."
      />
    </SceneViewport>
  );
};
