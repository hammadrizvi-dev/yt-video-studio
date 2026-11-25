import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { GlassCard, PhotoFrame, PunchHeadline } from "@components/index";

export const Scene03KitchenRider: React.FC = () => {
  const frame = useCurrentFrame();
  const beamPct = interpolate(frame, [10, 48], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneViewport theme="finance-dark" backdropMode="grid" camera="swing-right">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}
      >
        <PunchHeadline
          text="78% ECOSYSTEM MEIN CHALA JAATA HAI"
          highlightWords={["78%", "ECOSYSTEM"]}
          highlightColor="#F59E0B"
          fontSize={66}
          align="center"
        />

        <div style={{ display: "flex", alignItems: "center", gap: 28, width: "100%" }}>
          <GlassCard accentColor="#F59E0B" width="45%" padding="22px">
            <PhotoFrame
              src="illustrations/restaurant-kitchen.jpg"
              badgeText="RESTAURANT SHARE"
              accentColor="#F59E0B"
              height={320}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 18,
              }}
            >
              <span style={{ fontFamily: FONTS.sans, fontSize: 34, fontWeight: 900, color: "#FFFFFF" }}>
                KITCHEN COST
              </span>
              <span style={{ fontFamily: FONTS.mono, fontSize: 52, fontWeight: 900, color: "#FBBF24" }}>
                ₹186 (62%)
              </span>
            </div>
          </GlassCard>

          <div
            style={{
              flex: 1,
              height: 10,
              borderRadius: 99,
              backgroundColor: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${beamPct}%`,
                height: "100%",
                background: "linear-gradient(90deg, #F59E0B, #38BDF8)",
              }}
            />
          </div>

          <GlassCard accentColor="#38BDF8" width="45%" padding="22px">
            <PhotoFrame
              src="illustrations/indian-delivery-rider.jpg"
              badgeText="FLEET PAYOUT"
              accentColor="#38BDF8"
              height={320}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: 18,
              }}
            >
              <span style={{ fontFamily: FONTS.sans, fontSize: 34, fontWeight: 900, color: "#FFFFFF" }}>
                DELIVERY RIDER
              </span>
              <span style={{ fontFamily: FONTS.mono, fontSize: 52, fontWeight: 900, color: "#38BDF8" }}>
                ₹48 (16%)
              </span>
            </div>
          </GlassCard>
        </div>
      </div>
    </SceneViewport>
  );
};
