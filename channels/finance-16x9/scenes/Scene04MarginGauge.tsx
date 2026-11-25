import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { GlassCard, PunchHeadline, RadialGauge } from "@components/index";

export const Scene04MarginGauge: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="grid"
      camera="zoom-punch"
      impactFrames={[8]}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 64,
        }}
      >
        <GlassCard accentColor="#10B981" width={540} padding="44px">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RadialGauge
              label="APP NET MARGIN"
              targetPct={18}
              displayValue="5.3%"
              accentColor="#10B981"
              size={420}
            />
          </div>
        </GlassCard>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 30,
              fontWeight: 900,
              color: "#34D399",
              letterSpacing: "0.14em",
            }}
          >
            RAZOR-THIN UNIT MARGIN
          </div>
          <PunchHeadline
            text="EK ORDER PAR SIRF ₹16 BACHTA HAI"
            highlightWords={["SIRF", "₹16"]}
            highlightColor="#10B981"
            fontSize={78}
            align="left"
          />
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 34,
              fontWeight: 600,
              color: "#94A3B8",
              lineHeight: 1.4,
            }}
          >
            Single delivery se koi unicorn nahi banta — asli khel daily volume par chalta hai.
          </div>
        </div>
      </div>
    </SceneViewport>
  );
};
