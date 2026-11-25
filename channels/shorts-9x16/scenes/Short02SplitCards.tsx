import React from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { GlassCard, PunchHeadline } from "@components/index";

const CARDS = [
  {
    img: "illustrations/restaurant-kitchen.jpg",
    tag: "62% KITCHEN COST",
    title: "Restaurant",
    val: "₹186",
    color: "#F59E0B",
  },
  {
    img: "illustrations/indian-delivery-rider.jpg",
    tag: "16% FLEET PAYOUT",
    title: "Delivery Rider",
    val: "₹48",
    color: "#38BDF8",
  },
];

export const Short02SplitCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const taxSp = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  return (
    <SceneViewport
      theme="finance-dark"
      backdropMode="grid"
      camera="swing-left"
      gap={26}
    >
      <PunchHeadline
        text="78% KITCHEN AUR RIDER LE JAATE HAIN"
        highlightWords={["78%", "KITCHEN", "RIDER"]}
        highlightColor="#FBBF24"
        fontSize={52}
        align="center"
      />

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 22 }}>
        {CARDS.map((card, idx) => {
          const sp = spring({
            frame: Math.max(0, frame - (4 + idx * 10)),
            fps,
            config: { damping: 14, stiffness: 145 },
          });
          return (
            <GlassCard
              key={card.title}
              accentColor={card.color}
              padding="20px 24px"
              style={{
                opacity: sp,
                transform: `translate3d(${(1 - sp) * 32}px, 0, 0)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ width: 210, height: 165, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
                  <Img
                    src={staticFile(card.img)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 900, color: card.color }}>
                    {card.tag}
                  </span>
                  <span style={{ fontFamily: FONTS.sans, fontSize: 34, fontWeight: 900, color: "#FFFFFF" }}>
                    {card.title}
                  </span>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 64, fontWeight: 900, color: card.color, lineHeight: 1.0 }}>
                    {card.val}
                  </span>
                </div>
              </div>
            </GlassCard>
          );
        })}

        <GlassCard
          accentColor="#FB7185"
          padding="20px 28px"
          style={{ opacity: taxSp, transform: `scale(${0.92 + 0.08 * taxSp})` }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: FONTS.sans, fontSize: 32, fontWeight: 800, color: "#E2E8F0" }}>
              GST & Server Ops (17%)
            </span>
            <span style={{ fontFamily: FONTS.mono, fontSize: 48, fontWeight: 900, color: "#FB7185" }}>
              ₹50
            </span>
          </div>
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
