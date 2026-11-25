import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";

export interface PunchHeadlineProps {
  text: string;
  highlightWords?: string[];
  highlightColor?: string;
  markerFill?: string;
  color?: string;
  fontSize?: number;
  align?: "left" | "center" | "right";
  delay?: number;
  stagger?: number;
  maxWidth?: number | string;
}

export const PunchHeadline: React.FC<PunchHeadlineProps> = ({
  text,
  highlightWords = [],
  highlightColor = "#FBBF24",
  markerFill,
  color = "#FFFFFF",
  fontSize = 72,
  align = "center",
  delay = 0,
  stagger = 2,
  maxWidth = "100%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ").filter(Boolean);
  const hlSet = new Set(highlightWords.map((w) => w.toLowerCase()));

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
              ? "flex-end"
              : "flex-start",
        columnGap: "0.24em",
        rowGap: "0.1em",
        maxWidth,
        fontFamily: FONTS.sans,
        fontSize,
        fontWeight: 900,
        lineHeight: 1.08,
        letterSpacing: "-0.03em",
        textAlign: align,
      }}
    >
      {words.map((word, idx) => {
        const startF = delay + idx * stagger;
        const sp = spring({
          frame: Math.max(0, frame - startF),
          fps,
          config: { damping: 13, stiffness: 175, mass: 0.72 },
        });
        const clean = word.replace(/[.,!?"'₹—:%]/g, "").toLowerCase();
        const isHl = hlSet.has(clean) || hlSet.has(word.toLowerCase());
        const sweep = isHl
          ? interpolate(frame, [startF + 3, startF + 16], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 0;

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              position: "relative",
              display: "inline-block",
              color: isHl ? highlightColor : color,
              opacity: sp,
              transform: `translate3d(0, ${(1 - sp) * 26}px, 0) scale(${0.86 + 0.14 * sp})`,
              padding: markerFill && isHl ? "0 10px" : undefined,
            }}
          >
            {markerFill && isHl && (
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "5%",
                  height: "36%",
                  width: `${sweep}%`,
                  backgroundColor: markerFill,
                  zIndex: -1,
                  borderRadius: 6,
                }}
              />
            )}
            {word}
          </span>
        );
      })}
    </div>
  );
};
