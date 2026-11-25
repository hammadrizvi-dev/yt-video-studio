import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "@config/fonts";

export interface ScorecardBreakdownItem {
  label: string;
  value: string;
}

export interface ScorecardSide {
  name: string;
  score: number;
  maxScore?: number;
  color: string;
  summary: string;
  isWinner?: boolean;
  breakdown?: ScorecardBreakdownItem[];
}

export interface VerdictScorecardProps {
  title: string;
  left: ScorecardSide;
  right: ScorecardSide;
  verdictLine: string;
  isLight?: boolean;
}

/**
 * Case-Study Final Verdict & Scorecard with synchronized numeric score count-up,
 * animated score bars, optional breakdown pills, and WINNER seal slam.
 */
export const VerdictScorecard: React.FC<VerdictScorecardProps> = ({
  title,
  left,
  right,
  verdictLine,
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sides = [left, right];
  const textMain = isLight ? "#141413" : "#F8FAFC";
  const textMuted = isLight ? "#52524E" : "#94A3B8";
  const cardBg = isLight ? "#FFFFFF" : "rgba(15, 20, 32, 0.92)";
  const quoteSp = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: { damping: 16, stiffness: 130 },
  });

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
      <div
        style={{
          fontFamily: FONTS.display,
          fontSize: 56,
          color: textMain,
          textAlign: "center",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {sides.map((side, idx) => {
          const sp = spring({
            frame: Math.max(0, frame - idx * 8),
            fps,
            config: { damping: 14, stiffness: 140 },
          });
          const maxS = side.maxScore ?? 10;
          const progress = interpolate(
            frame,
            [10 + idx * 6, 42 + idx * 6],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            },
          );
          const animatedScore = side.score * progress;
          const fillPct = (animatedScore / maxS) * 100;
          const winSp = spring({
            frame: Math.max(0, frame - 36),
            fps,
            config: { damping: 10, stiffness: 230 },
          });

          return (
            <div
              key={side.name}
              style={{
                position: "relative",
                padding: "30px 34px",
                borderRadius: 20,
                backgroundColor: cardBg,
                backgroundImage: side.isWinner
                  ? `radial-gradient(circle at 88% 12%, ${side.color}22 0%, transparent 56%)`
                  : "none",
                border: `2px solid ${side.isWinner ? side.color : "rgba(148,163,184,0.22)"}`,
                boxShadow: side.isWinner ? `0 0 46px ${side.color}32` : "none",
                opacity: sp,
                transform: `translate3d(0, ${(1 - sp) * 24}px, 0)`,
              }}
            >
              {side.isWinner && (
                <div
                  style={{
                    position: "absolute",
                    top: 22,
                    right: 24,
                    padding: "6px 16px",
                    borderRadius: 8,
                    backgroundColor: side.color,
                    color: "#07090E",
                    fontFamily: FONTS.mono,
                    fontSize: 20,
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    transform: `scale(${interpolate(winSp, [0, 1], [1.8, 1]).toFixed(4)})`,
                    opacity: Math.min(1, winSp * 1.5),
                  }}
                >
                  ★ WINNER
                </div>
              )}

              <div style={{ fontFamily: FONTS.display, fontSize: 48, color: textMain }}>
                {side.name}
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 64,
                  fontWeight: 900,
                  color: side.color,
                  margin: "6px 0 14px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {animatedScore.toFixed(1)}
                <span style={{ fontSize: 30, color: textMuted }}>/{maxS}</span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: 16,
                  borderRadius: 99,
                  backgroundColor: isLight
                    ? "rgba(20,20,19,0.1)"
                    : "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${fillPct.toFixed(2)}%`,
                    backgroundColor: side.color,
                    borderRadius: 99,
                    boxShadow: `0 0 14px ${side.color}77`,
                  }}
                />
              </div>

              {side.breakdown && side.breakdown.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${side.breakdown.length}, minmax(0, 1fr))`,
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  {side.breakdown.map((b) => (
                    <div
                      key={b.label}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        backgroundColor: isLight
                          ? "rgba(20,20,19,0.04)"
                          : "rgba(255,255,255,0.05)",
                        border: `1px solid ${side.color}33`,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 15,
                          fontWeight: 700,
                          color: textMuted,
                          textTransform: "uppercase",
                        }}
                      >
                        {b.label}
                      </div>
                      <div
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: 22,
                          fontWeight: 900,
                          color: textMain,
                          marginTop: 4,
                        }}
                      >
                        {b.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 23,
                  color: textMuted,
                  lineHeight: 1.45,
                }}
              >
                {side.summary}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          textAlign: "center",
          fontFamily: FONTS.serif,
          fontStyle: "italic",
          fontSize: 36,
          color: isLight ? "#141413" : "#EAB308",
          marginTop: 2,
          opacity: quoteSp,
          transform: `translate3d(0, ${(1 - quoteSp) * 14}px, 0)`,
        }}
      >
        “{verdictLine}”
      </div>
    </div>
  );
};
