import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { BrandBadge, GlassCard, PunchHeadline } from "@components/index";

const STACK = [
  { brand: "gemini" as const, tag: "CONTEXT", title: "Gemini Flash", stat: "1M Window", color: "#38BDF8" },
  { brand: "openai" as const, tag: "SPEED", title: "Groq / GPT", stat: "500 tok/sec", color: "#FBBF24" },
  { brand: "claude" as const, tag: "QUALITY", title: "Claude Code", stat: "Zero Bugs", color: "#34D399" },
];

export const Scene06PowerStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <SceneViewport theme="tech-obsidian" backdropMode="horizon" camera="zoom-punch">
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 38 }}>
        <PunchHeadline
          text="EK STACK. TEENO SUPERPOWERS."
          highlightWords={["TEENO", "SUPERPOWERS."]}
          highlightColor="#38F2FF"
          fontSize={72}
          align="center"
        />

        <div style={{ display: "flex", gap: 30, width: "100%" }}>
          {STACK.map((col, idx) => {
            const sp = spring({
              frame: Math.max(0, frame - (6 + idx * 9)),
              fps,
              config: { damping: 14, stiffness: 145 },
            });
            return (
              <GlassCard
                key={col.title}
                accentColor={col.color}
                width="33%"
                padding="34px 30px"
                style={{
                  opacity: sp,
                  transform: `translate3d(0, ${(1 - sp) * 26}px, 0)`,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <BrandBadge
                    brand={col.brand}
                    size={62}
                    color={col.brand === "openai" ? "#FFFFFF" : undefined}
                  />
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 22,
                      fontWeight: 900,
                      color: col.color,
                      letterSpacing: "0.14em",
                    }}
                  >
                    {col.tag}
                  </div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: 42, fontWeight: 900, color: "#FFFFFF" }}>
                    {col.title}
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 34, fontWeight: 900, color: col.color }}>
                    {col.stat}
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SceneViewport>
  );
};
