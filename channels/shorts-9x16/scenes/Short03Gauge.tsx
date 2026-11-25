import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { GlassCard, PunchHeadline, RadialGauge } from "@components/index";

export const Short03Gauge: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="horizon"
      camera="zoom-punch"
      impactFrames={[8]}
      gap={34}
    >
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 28,
          fontWeight: 900,
          color: "#34D399",
          letterSpacing: "0.14em",
        }}
      >
        APP KE PAAS KYA BACHA?
      </div>

      <GlassCard accentColor="#10B981" width={640} padding="44px 36px">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RadialGauge
            label="NET PROFIT MARGIN"
            targetPct={18}
            displayValue="5.3%"
            accentColor="#10B981"
            size={460}
          />
        </div>
      </GlassCard>

      <PunchHeadline
        text="EK ORDER = SIRF ₹16 NET PROFIT"
        highlightWords={["SIRF", "₹16"]}
        highlightColor="#10B981"
        fontSize={60}
        align="center"
      />
    </SceneViewport>
  );
};
