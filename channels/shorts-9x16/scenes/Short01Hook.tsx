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

/**
 * Vertically centered strictly inside SafeCanvas (888 x 1220 @ y:240..1460).
 * Zero overflow into Shorts bottom title/captions danger zone.
 */
export const Short01Hook: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="horizon"
      camera="zoom-punch"
      impactFrames={[4, 30]}
      gap={26}
    >
      <CoinShower mode="coins" count={10} seedPrefix="sh01-hook" />

      <GlassCard accentColor="#F59E0B" width={460} padding="16px">
        <PhotoFrame
          src="illustrations/food-delivery-hero.jpg"
          badgeText="ORDER BILL AUDIT"
          accentColor="#F59E0B"
          height={340}
        />
      </GlassCard>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 28,
            fontWeight: 900,
            color: "#FBBF24",
            letterSpacing: "0.14em",
          }}
        >
          AAPKA FOOD ORDER
        </div>

        <MetricCounter
          from={100}
          to={300}
          prefix="₹"
          fontSize={152}
          color="#FFFFFF"
          delay={2}
          durationFrames={18}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <PunchHeadline
          text="APP PROFIT SIRF"
          fontSize={58}
          color="#E2E8F0"
          delay={16}
          align="center"
        />
        <span style={{ fontFamily: FONTS.mono, fontSize: 88, fontWeight: 900, color: "#EF4444" }}>
          <MarkerCallout kind="circle" color="#EF4444" startFrame={26} durationFrames={18}>
            ₹16?
          </MarkerCallout>
        </span>
      </div>
    </SceneViewport>
  );
};
