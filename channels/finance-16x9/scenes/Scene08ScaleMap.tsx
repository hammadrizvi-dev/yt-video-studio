import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import {
  ComparisonBars,
  GlassCard,
  IndiaMapStage,
  MetricCounter,
  PunchHeadline,
} from "@components/index";

export const Scene08ScaleMap: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="horizon"
      camera="zoom-punch"
      impactFrames={[6, 42]}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 54,
        }}
      >
        <IndiaMapStage
          headline="800+ CITIES"
          metricValue="25L / DAY"
          accentColor="#F59E0B"
          secondaryColor="#10B981"
          boxSize={500}
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 28,
                fontWeight: 900,
                color: "#34D399",
                letterSpacing: "0.14em",
                marginBottom: 8,
              }}
            >
              UNIT x SCALE MULTIPLIER
            </div>
            <PunchHeadline
              text="25 LAKH ORDERS DAILY ="
              highlightWords={["25", "LAKH"]}
              highlightColor="#FBBF24"
              fontSize={58}
              align="left"
            />
            <MetricCounter
              from={100}
              to={1460}
              prefix="₹"
              suffix=" CR / YR"
              fontSize={106}
              color="#10B981"
              delay={12}
              durationFrames={34}
            />
          </div>

          <GlassCard accentColor="#10B981" padding="26px 30px">
            <ComparisonBars
              items={[
                { label: "1 Order Margin", valueLabel: "₹16", pct: 12, color: "#38BDF8" },
                { label: "1 Day (25L Orders)", valueLabel: "₹4 Crore", pct: 48, color: "#F59E0B" },
                { label: "365 Days Scale", valueLabel: "₹1,460 Cr", pct: 96, color: "#10B981" },
              ]}
            />
          </GlassCard>
        </div>
      </div>
    </SceneViewport>
  );
};
