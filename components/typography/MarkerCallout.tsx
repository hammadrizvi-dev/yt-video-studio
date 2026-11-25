import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { evolvePath } from "@remotion/paths";

export interface MarkerCalloutProps {
  kind: "circle" | "underline" | "strike";
  color?: string;
  startFrame?: number;
  durationFrames?: number;
  strokeWidth?: number;
  children: React.ReactNode;
}

/**
 * Deterministic pure-SVG marker stroke overlay (zero DOM measurement jitter).
 * Uses viewBox 0..100 x 0..100 with preserveAspectRatio="none" so strokes stay glued inside
 * any CSS transform or scale.
 */
export const MarkerCallout: React.FC<MarkerCalloutProps> = ({
  kind,
  color = "#EF4444",
  startFrame = 12,
  durationFrames = 20,
  strokeWidth = 6,
  children,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );

  const pathD =
    kind === "circle"
      ? "M 14 22 C 36 4, 82 6, 94 42 C 102 74, 68 94, 24 92 C 4 88, 2 34, 28 18"
      : kind === "strike"
        ? "M 4 56 Q 50 44, 96 52"
        : "M 4 90 Q 50 82, 96 88";

  const evolved = evolvePath(progress, pathD);

  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        padding: kind === "circle" ? "8px 22px" : "2px 6px",
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: kind === "circle" ? "-8px -12px" : 0,
          width: kind === "circle" ? "calc(100% + 24px)" : "100%",
          height: kind === "circle" ? "calc(100% + 16px)" : "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
        />
      </svg>
    </span>
  );
};
