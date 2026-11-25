import React from "react";
import { SceneViewport } from "@engine/index";
import { DonutChart, PunchHeadline } from "@components/index";

export const Scene07DonutSplit: React.FC = () => {
  return (
    <SceneViewport theme="finance-paper" backdropMode="paper" camera="swing-left">
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 36 }}>
        <PunchHeadline
          text="HAR RUPAYE KA PI-PI HISAAB"
          highlightWords={["PI-PI", "HISAAB"]}
          highlightColor="#047857"
          markerFill="rgba(16, 185, 129, 0.22)"
          color="#18181B"
          fontSize={68}
          align="center"
        />

        <DonutChart
          centerLabel="ORDER BILL"
          centerValue="₹300"
          isLight
          slices={[
            { label: "Restaurant", value: "₹186", pct: 62, color: "#D97706" },
            { label: "Rider Fee", value: "₹48", pct: 16, color: "#0284C7" },
            { label: "GST & Ops", value: "₹50", pct: 17, color: "#DC2626" },
            { label: "App Profit", value: "₹16", pct: 5, color: "#059669" },
          ]}
        />
      </div>
    </SceneViewport>
  );
};
