import React from "react";
import { SceneViewport } from "@engine/index";
import { StockTickerChart } from "@components/index";

export const Scene03RevenueTrajectory: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="editorial-dark"
      camera="dolly-focus"
      impactFrames={[42]}
    >
      <StockTickerChart
        ticker="QUARTERLY OPERATING REVENUE · ETERNAL VS SWIGGY"
        title="The Quick-Commerce Scale Gap Widened Fast"
        primaryLabel="Eternal Ltd (Zomato + Blinkit)"
        accentColor="#22C55E"
        deltaBadge="+77.6% YoY"
        unitPrefix="₹"
        unitSuffix=" Cr"
        points={[
          { label: "Q2 FY26", value: 13590 },
          { label: "Q1 FY27", value: 20211 },
          { label: "Q2 FY27", value: 24138 },
        ]}
        secondarySeries={{
          label: "Swiggy Ltd (Food + Instamart)",
          color: "#F97316",
          points: [
            { label: "Q2 FY26", value: 5561 },
            { label: "Q1 FY27", value: 6812 },
            { label: "Q2 FY27", value: 7571 },
          ],
        }}
        callout={{
          pointIndex: 2,
          label: "3.19x REVENUE LEAD",
        }}
        sourceNote="Sources: Kotak Neo / Entrackr Eternal Q2 FY27 filings; LiveMint & MECE Swiggy Q2 FY26–Q2 FY27 results."
      />
    </SceneViewport>
  );
};
