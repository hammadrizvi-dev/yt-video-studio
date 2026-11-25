import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "@config/fonts";

export interface VersusMetricRow {
  label: string;
  leftValue: string;
  rightValue: string;
  winner?: "left" | "right" | "tie";
}

export interface SplitVersusBoardProps {
  leftName: string;
  leftTag?: string;
  leftColor: string;
  rightName: string;
  rightTag?: string;
  rightColor: string;
  rows: VersusMetricRow[];
  sourceNote?: string;
  isLight?: boolean;
}

/**
 * Broadcast-grade Head-to-Head Comparison Board (Think School / MagnatesMedia style).
 * Animates contender headers with live edge tally, central VS slam, and staggered metric rows.
 */
export const SplitVersusBoard: React.FC<SplitVersusBoardProps> = ({
  leftName,
  leftTag,
  leftColor,
  rightName,
  rightTag,
  rightColor,
  rows,
  sourceNote,
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftEnter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const rightEnter = spring({
    frame: Math.max(0, frame - 4),
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const vsSlam = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 10, stiffness: 240, mass: 0.7 },
  });

  // Live tally of edges revealed so far
  let leftTally = 0;
  let rightTally = 0;
  rows.forEach((row, idx) => {
    const revealFrame = 22 + idx * 8;
    if (frame >= revealFrame) {
      if (row.winner === "left") leftTally++;
      if (row.winner === "right") rightTally++;
    }
  });

  const textMain = isLight ? "#141413" : "#F8FAFC";
  const textMuted = isLight ? "#52524E" : "#94A3B8";
  const rowBg = isLight ? "rgba(20,20,19,0.04)" : "rgba(255,255,255,0.04)";
  const rowBorder = isLight ? "rgba(20,20,19,0.12)" : "rgba(255,255,255,0.10)";
  const cardBg = isLight ? "#FFFFFF" : "rgba(15, 20, 32, 0.92)";

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Contender Header Strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 120px 1fr",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            padding: "20px 28px",
            borderRadius: 16,
            borderTop: `5px solid ${leftColor}`,
            borderRight: `1px solid ${leftColor}55`,
            borderBottom: `1px solid ${leftColor}55`,
            borderLeft: `1px solid ${leftColor}55`,
            backgroundColor: cardBg,
            boxShadow: `0 14px 38px rgba(0,0,0,${isLight ? 0.08 : 0.42})`,
            transform: `translate3d(${(1 - leftEnter) * -60}px, 0, 0)`,
            opacity: leftEnter,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 52,
                letterSpacing: "0.02em",
                color: textMain,
                lineHeight: 1.05,
              }}
            >
              {leftName}
            </div>
            {leftTag && (
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  color: leftColor,
                  marginTop: 6,
                }}
              >
                {leftTag}
              </div>
            )}
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              backgroundColor: `${leftColor}20`,
              border: `1.5px solid ${leftColor}66`,
              fontFamily: FONTS.mono,
              fontSize: 28,
              fontWeight: 900,
              color: leftColor,
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}
          >
            {leftTally}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${interpolate(vsSlam, [0, 1], [1.9, 1]).toFixed(4)}) rotate(-6deg)`,
            opacity: Math.min(1, vsSlam * 1.6),
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              backgroundColor: "#EAB308",
              color: "#07090E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONTS.display,
              fontSize: 42,
              boxShadow: "0 0 36px rgba(234, 179, 8, 0.55)",
            }}
          >
            VS
          </div>
        </div>

        <div
          style={{
            padding: "20px 28px",
            borderRadius: 16,
            borderTop: `5px solid ${rightColor}`,
            borderRight: `1px solid ${rightColor}55`,
            borderBottom: `1px solid ${rightColor}55`,
            borderLeft: `1px solid ${rightColor}55`,
            backgroundColor: cardBg,
            boxShadow: `0 14px 38px rgba(0,0,0,${isLight ? 0.08 : 0.42})`,
            textAlign: "right",
            transform: `translate3d(${(1 - rightEnter) * 60}px, 0, 0)`,
            opacity: rightEnter,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              backgroundColor: `${rightColor}20`,
              border: `1.5px solid ${rightColor}66`,
              fontFamily: FONTS.mono,
              fontSize: 28,
              fontWeight: 900,
              color: rightColor,
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}
          >
            {rightTally}
          </div>
          <div>
            <div
              style={{
                fontFamily: FONTS.display,
                fontSize: 52,
                letterSpacing: "0.02em",
                color: textMain,
                lineHeight: 1.05,
              }}
            >
              {rightName}
            </div>
            {rightTag && (
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 20,
                  fontWeight: 700,
                  color: rightColor,
                  marginTop: 6,
                }}
              >
                {rightTag}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Staggered Comparison Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((row, idx) => {
          const delay = 14 + idx * 8;
          const sp = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 15, stiffness: 160 },
          });
          const badgeOp = interpolate(frame, [delay + 8, delay + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.quad),
          });

          const leftWins = row.winner === "left";
          const rightWins = row.winner === "right";
          const activeGlow = leftWins
            ? `linear-gradient(90deg, ${leftColor}18 0%, transparent 42%)`
            : rightWins
              ? `linear-gradient(270deg, ${rightColor}18 0%, transparent 42%)`
              : "none";

          return (
            <div
              key={row.label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 310px 1fr",
                alignItems: "center",
                padding: "16px 26px",
                borderRadius: 14,
                backgroundColor: rowBg,
                backgroundImage: activeGlow,
                border: `1px solid ${rowBorder}`,
                opacity: sp,
                transform: `translate3d(0, ${(1 - sp) * 22}px, 0)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 34,
                    fontWeight: 800,
                    color: leftWins ? leftColor : textMuted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {row.leftValue}
                </span>
                {leftWins && (
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 19,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 6,
                      backgroundColor: `${leftColor}26`,
                      border: `1px solid ${leftColor}66`,
                      color: leftColor,
                      opacity: badgeOp,
                    }}
                  >
                    ▲ EDGE
                  </span>
                )}
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontFamily: FONTS.sans,
                  fontSize: 22,
                  fontWeight: 700,
                  color: textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {row.label}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 14,
                }}
              >
                {rightWins && (
                  <span
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 19,
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: 6,
                      backgroundColor: `${rightColor}26`,
                      border: `1px solid ${rightColor}66`,
                      color: rightColor,
                      opacity: badgeOp,
                    }}
                  >
                    ▲ EDGE
                  </span>
                )}
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 34,
                    fontWeight: 800,
                    color: rightWins ? rightColor : textMuted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {row.rightValue}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {sourceNote && (
        <div
          style={{
            textAlign: "right",
            fontFamily: FONTS.mono,
            fontSize: 18,
            fontWeight: 600,
            color: textMuted,
            opacity: 0.78,
          }}
        >
          {sourceNote}
        </div>
      )}
    </div>
  );
};
