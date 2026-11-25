import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import {
  BrandBadge,
  CoinShower,
  GlassCard,
  MarkerCallout,
  PhotoFrame,
  PunchHeadline,
} from "@components/index";

export const Scene01HookCost: React.FC = () => {
  return (
    <SceneViewport
      theme="tech-obsidian"
      backdropMode="horizon"
      camera="zoom-punch"
      impactFrames={[4, 34]}
    >
      <CoinShower mode="sparks" accentColor="#38F2FF" count={14} seedPrefix="ep02-s1" />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 54,
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <BrandBadge brand="gemini" size={60} />
            <BrandBadge brand="openai" size={60} color="#FFFFFF" />
            <BrandBadge brand="claude" size={60} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 34, flexWrap: "wrap" }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 102, fontWeight: 900, color: "#94A3B8" }}>
              <MarkerCallout kind="strike" color="#EF4444" startFrame={10} durationFrames={16}>
                ₹15,000
              </MarkerCallout>
            </span>

            <span style={{ fontFamily: FONTS.mono, fontSize: 138, fontWeight: 900, color: "#38F2FF" }}>
              <MarkerCallout kind="circle" color="#38F2FF" startFrame={28} durationFrames={20}>
                ₹0/MO
              </MarkerCallout>
            </span>
          </div>

          <PunchHeadline
            text="LOCAL + FREE AGENT STACK"
            highlightWords={["FREE", "AGENT"]}
            highlightColor="#FBBF24"
            fontSize={72}
            align="left"
            delay={14}
          />
        </div>

        <GlassCard accentColor="#38F2FF" width={540} padding="20px">
          <PhotoFrame
            src="illustrations/solo-dev-desk.jpg"
            badgeText="SOLO STACK"
            accentColor="#38F2FF"
            height={440}
          />
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
