import React from "react";
import { SceneViewport } from "@engine/index";
import { PunchHeadline, TimelineRail } from "@components/index";

export const Scene04RiseFallTimeline: React.FC = () => {
  return (
    <SceneViewport
      theme="documentary-noir"
      backdropMode="dotted-board"
      camera="drift-in"
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 36 }}>
        <PunchHeadline
          text="FROM CASH-BURN WAR TO MULTI-VERTICAL FLYWHEEL"
          highlightWords={["MULTI-VERTICAL", "FLYWHEEL"]}
          highlightColor="#EAB308"
          fontSize={58}
        />
        <TimelineRail
          accentColor="#EAB308"
          highlightColor="#EF4444"
          nodes={[
            {
              year: "2021",
              badge: "PUBLIC DEBUT",
              title: "Zomato IPO Era",
              metric: "Heavy Discount Scrutiny",
            },
            {
              year: "2022",
              badge: "TURNING POINT",
              title: "Blinkit Acquisition",
              metric: "10-Min Commerce Bet",
              highlight: true,
            },
            {
              year: "FY25",
              badge: "PROFIT INFLECTION",
              title: "Full-Year Scale",
              metric: "₹20,243 Cr Rev · ₹527 Cr PAT",
            },
            {
              year: "Q2 FY27",
              badge: "DENSITY MOAT",
              title: "Blinkit + Food Engine",
              metric: "2,751 Stores · ₹752 Cr EBITDA",
            },
          ]}
        />
      </div>
    </SceneViewport>
  );
};
