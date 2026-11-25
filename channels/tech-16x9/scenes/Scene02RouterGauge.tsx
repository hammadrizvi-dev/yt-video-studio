import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { GlassCard, PhotoFrame, PunchHeadline, RadialGauge } from "@components/index";

export const Scene02RouterGauge: React.FC = () => {
  const frame = useCurrentFrame();
  const speedVal = Math.round(
    interpolate(frame, [8, 42], [0, 500], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <SceneViewport
      theme="tech-obsidian"
      backdropMode="grid"
      camera="swing-left"
      impactFrames={[10]}
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
        <GlassCard accentColor="#38F2FF" width={560} padding="24px">
          <PhotoFrame
            src="illustrations/ai-server-cluster.jpg"
            badgeText="14-KEY POOL"
            accentColor="#38F2FF"
            height={380}
          />
          <PunchHeadline
            text="ZERO RATE LIMIT"
            highlightWords={["ZERO"]}
            highlightColor="#34D399"
            fontSize={44}
            align="center"
            delay={12}
          />
        </GlassCard>

        <GlassCard accentColor="#34D399" width={520} padding="44px">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <RadialGauge
              label="TOKENS / SECOND"
              targetPct={92}
              displayValue={`${speedVal}`}
              accentColor="#38F2FF"
              size={400}
            />
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 24,
                fontWeight: 800,
                color: "#34D399",
              }}
            >
              7 GROQ + 7 GEMINI AUTO-FAILOVER
            </span>
          </div>
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
