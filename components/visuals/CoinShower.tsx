import React, { useMemo } from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";
import { getSafeZone } from "@config/safeZones";

export interface CoinShowerProps {
  mode?: "coins" | "sparks";
  accentColor?: string;
  count?: number;
  seedPrefix?: string;
}

/**
 * Aspect-ratio aware, purely deterministic GPU coin & cyber spark shower.
 * Uses SafeCanvas width/height so particles never clip off-screen on 9:16 Shorts.
 */
export const CoinShower: React.FC<CoinShowerProps> = ({
  mode = "coins",
  accentColor = "#F59E0B",
  count = 14,
  seedPrefix = "particle",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const sz = getSafeZone(width, height);

  const items = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = random(`${seedPrefix}-x-${i}`);
      const r2 = random(`${seedPrefix}-sp-${i}`);
      const r3 = random(`${seedPrefix}-ph-${i}`);
      const r4 = random(`${seedPrefix}-sz-${i}`);
      return {
        xNorm: 0.08 + r1 * 0.84,
        speed: 0.0045 + r2 * 0.005,
        phase: r3,
        scale: 0.72 + r4 * 0.45,
        swayAmp: 10 + r2 * 16,
      };
    });
  }, [count, seedPrefix]);

  const isCoins = mode === "coins";

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {items.map((p, i) => {
        const life = (p.phase + frame * p.speed) % 1;
        const x =
          sz.left +
          p.xNorm * sz.innerWidth +
          Math.sin(frame * 0.07 + i * 1.3) * p.swayAmp;
        const y = sz.top + sz.innerHeight * (1.05 - life * 1.1);
        const fade = life < 0.14 ? life / 0.14 : life > 0.82 ? (1 - life) / 0.18 : 1;

        return (
          <div
            key={`${seedPrefix}-${i}`}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              opacity: Math.max(0, Math.min(0.88, fade)),
              transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${p.scale.toFixed(2)})`,
              willChange: "transform, opacity",
            }}
          >
            {isCoins ? (
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%, #FEF08A, #F59E0B)",
                  border: "2px solid #FDE68A",
                  boxShadow: "0 4px 14px rgba(245, 158, 11, 0.36)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#78350F",
                }}
              >
                ₹
              </div>
            ) : (
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: accentColor,
                  boxShadow: `0 0 14px ${accentColor}`,
                }}
              />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
