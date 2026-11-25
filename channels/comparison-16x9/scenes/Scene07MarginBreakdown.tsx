import React from "react";
import { SceneViewport } from "@engine/index";
import { ComparisonBars, PunchHeadline } from "@components/index";
import { FONTS } from "@config/fonts";

export const Scene07MarginBreakdown: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-paper"
      backdropMode="paper"
      camera="dolly-focus"
      impactFrames={[24]}
      gap={30}
    >
      <PunchHeadline
        text="Q2 FY27 SEGMENT EBITDA: WHERE THE CASH ACTUALLY COMES FROM"
        highlightWords={["EBITDA:", "CASH"]}
        highlightColor="#B45309"
        color="#18181B"
        fontSize={52}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 1360,
          padding: "32px 40px",
          borderRadius: 20,
          backgroundColor: "#FFFDF7",
          border: "1.5px solid #D6CFC2",
          boxShadow: "0 20px 56px rgba(0,0,0,0.12)",
        }}
      >
        <ComparisonBars
          isLight={true}
          items={[
            {
              label: "Zomato Food Delivery (EBITDA)",
              valueLabel: "+₹647 Cr",
              pct: 72,
              color: "#059669",
            },
            {
              label: "Blinkit Quick Commerce (EBITDA)",
              valueLabel: "+₹488 Cr",
              pct: 55,
              color: "#10B981",
            },
            {
              label: "Swiggy Food Delivery (Adj. EBITDA)",
              valueLabel: "+₹341 Cr",
              pct: 38,
              color: "#D97706",
            },
            {
              label: "Swiggy Instamart (Adj. EBITDA Loss)",
              valueLabel: "-₹895 Cr",
              pct: 100,
              color: "#DC2626",
            },
          ]}
        />

        <div
          style={{
            marginTop: 22,
            textAlign: "right",
            fontFamily: FONTS.mono,
            fontSize: 18,
            fontWeight: 700,
            color: "#71717A",
          }}
        >
          Bar scale = absolute magnitude relative to ₹895 Cr peak segment swing · Sources: Entrackr & MECE (Oct 2026).
        </div>
      </div>
    </SceneViewport>
  );
};
