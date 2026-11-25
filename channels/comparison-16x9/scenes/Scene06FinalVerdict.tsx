import React from "react";
import { SceneViewport } from "@engine/index";
import { VerdictScorecard } from "@components/index";

export const Scene06FinalVerdict: React.FC = () => {
  return (
    <SceneViewport
      theme="documentary-noir"
      backdropMode="editorial-dark"
      camera="zoom-punch"
      impactFrames={[36]}
    >
      <VerdictScorecard
        title="FINAL BUSINESS MODEL VERDICT"
        left={{
          name: "ETERNAL (ZOMATO)",
          score: 9.1,
          color: "#22C55E",
          isWinner: true,
          breakdown: [
            { label: "Q2 FY27 Rev", value: "₹24,138 Cr" },
            { label: "Net Profit", value: "+₹125 Cr" },
            { label: "Dark Stores", value: "2,751" },
          ],
          summary:
            "Both core engines — Zomato food delivery and Blinkit quick commerce — are EBITDA-positive, funding expansion from internal cash flow.",
        }}
        right={{
          name: "SWIGGY",
          score: 7.4,
          color: "#F97316",
          breakdown: [
            { label: "Q2 FY27 Rev", value: "₹7,571 Cr" },
            { label: "Net Loss", value: "-₹922 Cr" },
            { label: "Dark Stores", value: "1,240" },
          ],
          summary:
            "Food delivery generates solid +₹341 Cr EBITDA, but Instamart's -₹895 Cr quarterly burn keeps consolidated earnings in catch-up mode.",
        }}
        verdictLine="In quick commerce, store density compounds into profit — until every dark store clears breakeven, growth costs cash."
      />
    </SceneViewport>
  );
};
