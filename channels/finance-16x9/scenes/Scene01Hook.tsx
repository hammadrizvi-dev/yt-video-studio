import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import {
  CoinShower,
  GlassCard,
  MarkerCallout,
  MetricCounter,
  PhotoFrame,
  PunchHeadline,
} from "@components/index";

export const Scene01Hook: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="horizon"
      camera="zoom-punch"
      impactFrames={[4, 34]}
    >
      <CoinShower mode="coins" count={12} seedPrefix="ep01-s1" />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 54,
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 30,
              fontWeight: 900,
              color: "#FBBF24",
              letterSpacing: "0.14em",
            }}
          >
            AAPKA FOOD ORDER BILL
          </div>

          <MetricCounter
            from={80}
            to={300}
            prefix="₹"
            fontSize={184}
            color="#FFFFFF"
            delay={2}
            durationFrames={20}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
            <PunchHeadline
              text="APP PROFIT SIRF"
              fontSize={64}
              color="#E2E8F0"
              delay={18}
              align="left"
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 88,
                fontWeight: 900,
                color: "#EF4444",
              }}
            >
              <MarkerCallout kind="circle" color="#EF4444" startFrame={28} durationFrames={18}>
                ₹16?
              </MarkerCallout>
            </span>
          </div>
        </div>

        <GlassCard accentColor="#F59E0B" width={540} padding="20px">
          <PhotoFrame
            src="illustrations/food-delivery-hero.jpg"
            badgeText="UNIT AUDIT"
            accentColor="#F59E0B"
            height={480}
          />
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
