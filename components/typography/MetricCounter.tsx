import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";

export interface MetricCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  color?: string;
  fontSize?: number;
  delay?: number;
  durationFrames?: number;
  formatIndian?: boolean;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  color = "#FFFFFF",
  fontSize = 156,
  delay = 4,
  durationFrames = 26,
  formatIndian = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 13, stiffness: 155, mass: 0.8 },
  });

  const prog = interpolate(frame, [delay, delay + durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const val = from + (to - from) * prog;
  const formatted =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString(formatIndian ? "en-IN" : "en-US");

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: FONTS.mono,
        fontSize,
        fontWeight: 900,
        lineHeight: 0.94,
        color,
        fontVariantNumeric: "tabular-nums",
        transform: `scale(${0.86 + 0.14 * sp})`,
        opacity: Math.min(1, sp * 1.4),
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
