import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { GlassCard, MarkerCallout, PunchHeadline } from "@components/index";

const ROWS = [
  { label: "Kitchen Food Payout (62%)", val: "₹186", color: "#FBBF24" },
  { label: "Rider Delivery + Fuel (16%)", val: "₹48", color: "#38BDF8" },
  { label: "GST, Gateway & Tech (17%)", val: "₹50", color: "#FB7185" },
];

export const Scene02BillBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const netSp = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { damping: 12, stiffness: 170 },
  });

  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="horizon"
      camera="swing-left"
      impactFrames={[38]}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 56,
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 28,
              fontWeight: 900,
              color: "#10B981",
              letterSpacing: "0.14em",
            }}
          >
            FORENSIC RECEIPT CHECK
          </div>
          <PunchHeadline
            text="₹300 KA ASLI HISAAB KAHAN GAYA?"
            highlightWords={["ASLI", "HISAAB"]}
            highlightColor="#FBBF24"
            fontSize={76}
            align="left"
          />
        </div>

        <GlassCard accentColor="#10B981" width={720} padding="32px">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {ROWS.map((row, idx) => {
              const sp = spring({
                frame: Math.max(0, frame - (6 + idx * 8)),
                fps,
                config: { damping: 14, stiffness: 150 },
              });
              return (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "18px 24px",
                    borderRadius: 16,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    opacity: sp,
                    transform: `translate3d(${(1 - sp) * 24}px, 0, 0)`,
                  }}
                >
                  <span style={{ fontFamily: FONTS.sans, fontSize: 32, fontWeight: 700, color: "#E2E8F0" }}>
                    {row.label}
                  </span>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 40, fontWeight: 900, color: row.color }}>
                    {row.val}
                  </span>
                </div>
              );
            })}

            <div
              style={{
                marginTop: 8,
                padding: "20px 26px",
                borderRadius: 18,
                backgroundColor: "#10B981",
                color: "#04120B",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: netSp,
                transform: `scale(${0.9 + 0.1 * netSp})`,
              }}
            >
              <span style={{ fontFamily: FONTS.sans, fontSize: 36, fontWeight: 900 }}>
                APP NET PROFIT (5.3%)
              </span>
              <span style={{ fontFamily: FONTS.mono, fontSize: 54, fontWeight: 900 }}>
                <MarkerCallout kind="underline" color="#04120B" startFrame={44}>
                  ₹16
                </MarkerCallout>
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
