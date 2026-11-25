import React from "react";
import { FONTS } from "@config/fonts";
import { SceneViewport } from "@engine/index";
import { CoinShower, GrowthCurve, GlassCard, PunchHeadline } from "@components/index";

export const Scene07OutroDev: React.FC = () => {
  return (
    <SceneViewport theme="tech-obsidian" backdropMode="horizon" camera="drift-in">
      <CoinShower mode="sparks" accentColor="#34D399" count={16} seedPrefix="ep02-outro" />

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 28 }}>
        <PunchHeadline
          text="BUILD FAST. SHIP FOR ₹0 API COST."
          highlightWords={["SHIP", "₹0"]}
          highlightColor="#34D399"
          fontSize={68}
          align="center"
        />

        <GlassCard accentColor="#34D399" padding="30px 42px">
          <GrowthCurve
            title="WEEKLY SHIPPING VELOCITY vs API COST"
            highlightEndValue="10X OUTPUT"
            accentColor="#34D399"
          />
          <div
            style={{
              marginTop: 12,
              fontFamily: FONTS.mono,
              fontSize: 24,
              fontWeight: 800,
              color: "#94A3B8",
              textAlign: "right",
            }}
          >
            DEMO READY · DROP REAL VOICE.WAV FROM D:\AUDIO
          </div>
        </GlassCard>
      </div>
    </SceneViewport>
  );
};
