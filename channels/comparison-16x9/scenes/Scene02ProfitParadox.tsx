import React from "react";
import { SceneViewport } from "@engine/index";
import {
  GlassCard,
  MetricCounter,
  PhotoFrame,
  PunchHeadline,
} from "@components/index";
import { FONTS } from "@config/fonts";

export const Scene02ProfitParadox: React.FC = () => {
  return (
    <SceneViewport
      theme="documentary-noir"
      backdropMode="dotted-board"
      camera="rack-push"
      impactFrames={[18]}
      gap={26}
    >
      <PunchHeadline
        text="ONE QUARTER. TWO COMPLETELY DIFFERENT REALITIES."
        highlightWords={["DIFFERENT", "REALITIES"]}
        highlightColor="#EAB308"
        fontSize={58}
      />

      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "stretch",
        }}
      >
        <GlassCard
          accentColor="#22C55E"
          padding="24px 28px"
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <PhotoFrame
            src="illustrations/food-delivery-hero.jpg"
            badgeText="ETERNAL (ZOMATO + BLINKIT)"
            accentColor="#22C55E"
            height={280}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 22,
                fontWeight: 800,
                color: "#94A3B8",
                letterSpacing: "0.1em",
              }}
            >
              Q2 FY27 NET PROFIT
            </span>
            <MetricCounter
              to={125}
              prefix="+₹"
              suffix=" Cr"
              color="#22C55E"
              fontSize={68}
              delay={10}
              durationFrames={28}
            />
          </div>
        </GlassCard>

        <GlassCard
          accentColor="#EF4444"
          padding="24px 28px"
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <PhotoFrame
            src="illustrations/indian-delivery-rider.jpg"
            badgeText="SWIGGY (FOOD + INSTAMART)"
            accentColor="#EF4444"
            height={280}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 22,
                fontWeight: 800,
                color: "#94A3B8",
                letterSpacing: "0.1em",
              }}
            >
              Q2 FY27 NET LOSS
            </span>
            <MetricCounter
              to={922}
              prefix="-₹"
              suffix=" Cr"
              color="#EF4444"
              fontSize={68}
              delay={14}
              durationFrames={28}
            />
          </div>
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
