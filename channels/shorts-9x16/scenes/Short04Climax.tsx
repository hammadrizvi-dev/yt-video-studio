import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import {
  CoinShower,
  GlassCard,
  IndiaMapStage,
  MetricCounter,
  PunchHeadline,
} from "@components/index";

export const Short04Climax: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="horizon"
      camera="drift-in"
      impactFrames={[8, 40]}
      gap={24}
    >
      <CoinShower mode="coins" count={14} seedPrefix="sh01-climax" />

      <IndiaMapStage
        headline="800+ CITIES SCALE"
        metricValue="25L ORDERS / DAY"
        accentColor="#F59E0B"
        secondaryColor="#10B981"
        boxSize={410}
      />

      <GlassCard accentColor="#10B981" padding="26px 32px">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              fontWeight: 900,
              color: "#34D399",
              letterSpacing: "0.14em",
            }}
          >
            365 DAYS UNIT x SCALE PROFIT
          </span>

          <MetricCounter
            from={100}
            to={1460}
            prefix="₹"
            suffix=" CR"
            fontSize={126}
            color="#10B981"
            delay={10}
            durationFrames={34}
          />

          <PunchHeadline
            text="CHHOTA MARGIN × BADA SCALE"
            highlightWords={["BADA", "SCALE"]}
            highlightColor="#FBBF24"
            fontSize={44}
            align="center"
            delay={18}
          />
        </div>
      </GlassCard>
    </SceneViewport>
  );
};
