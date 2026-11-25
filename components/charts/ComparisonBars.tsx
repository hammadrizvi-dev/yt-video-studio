import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";

export interface ComparisonBarItem {
  label: string;
  valueLabel: string;
  pct: number;
  color: string;
}

export interface ComparisonBarsProps {
  items: ComparisonBarItem[];
  isLight?: boolean;
}

export const ComparisonBars: React.FC<ComparisonBarsProps> = ({
  items,
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 22 }}>
      {items.map((item, idx) => {
        const sp = spring({
          frame: Math.max(0, frame - idx * 6),
          fps,
          config: { damping: 14, stiffness: 145 },
        });
        const fill = interpolate(frame, [6 + idx * 7, 34 + idx * 7], [0, item.pct], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

        return (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              opacity: sp,
              transform: `translate3d(0, ${(1 - sp) * 20}px, 0)`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 32,
                  fontWeight: 800,
                  color: isLight ? "#18181B" : "#F8FAFC",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 34,
                  fontWeight: 900,
                  color: item.color,
                }}
              >
                {item.valueLabel}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: 30,
                borderRadius: 99,
                backgroundColor: isLight ? "rgba(24,24,27,0.08)" : "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(4, Math.min(100, fill))}%`,
                  borderRadius: 99,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
