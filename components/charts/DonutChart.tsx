import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";

export interface DonutSlice {
  label: string;
  value: string;
  pct: number;
  color: string;
}

export interface DonutChartProps {
  centerLabel: string;
  centerValue: string;
  slices: DonutSlice[];
  size?: number;
  isLight?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  centerLabel,
  centerValue,
  slices,
  size = 420,
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const strokeWidth = 54;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const sp = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });

  let acc = 0;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: isVertical ? 34 : 64,
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          flexShrink: 0,
          transform: `scale(${0.86 + 0.14 * sp})`,
        }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={isLight ? "rgba(24,24,27,0.08)" : "rgba(255,255,255,0.09)"}
            strokeWidth={strokeWidth}
          />
          {slices.map((s, idx) => {
            const share = s.pct / 100;
            const arcLen = Math.max(8, share * circumference - 8);
            const offset = (acc / 100) * circumference;
            acc += s.pct;

            const prog = interpolate(
              frame,
              [6 + idx * 10, 30 + idx * 10],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              },
            );

            return (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${arcLen * prog} ${circumference}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
          })}
        </svg>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              fontWeight: 800,
              color: isLight ? "#71717A" : "#94A3B8",
              letterSpacing: "0.14em",
            }}
          >
            {centerLabel}
          </span>
          <span
            style={{
              fontFamily: FONTS.mono,
              fontSize: 72,
              fontWeight: 900,
              color: isLight ? "#18181B" : "#FFFFFF",
              lineHeight: 1.0,
            }}
          >
            {centerValue}
          </span>
        </div>
      </div>

      <div
        style={{
          width: isVertical ? "100%" : 680,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {slices.map((s, idx) => {
          const itemSp = spring({
            frame: Math.max(0, frame - (10 + idx * 8)),
            fps,
            config: { damping: 14, stiffness: 150 },
          });
          return (
            <div
              key={s.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderRadius: 16,
                backgroundColor: isLight ? "#FFFFFF" : "rgba(15, 23, 42, 0.85)",
                border: `2px solid ${s.color}55`,
                opacity: itemSp,
                transform: `translate3d(${(1 - itemSp) * 24}px, 0, 0)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 6,
                    backgroundColor: s.color,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 32,
                    fontWeight: 800,
                    color: isLight ? "#18181B" : "#F8FAFC",
                  }}
                >
                  {s.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 36,
                    fontWeight: 900,
                    color: s.color,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 24,
                    fontWeight: 700,
                    color: isLight ? "#71717A" : "#94A3B8",
                  }}
                >
                  {s.pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
