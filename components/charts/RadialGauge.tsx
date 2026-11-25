import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { FONTS } from "@config/fonts";

export interface RadialGaugeProps {
  label: string;
  targetPct: number;
  displayValue: string;
  accentColor?: string;
  trackColor?: string;
  textColor?: string;
  startFrame?: number;
  size?: number;
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  label,
  targetPct,
  displayValue,
  accentColor = "#10B981",
  trackColor = "rgba(255,255,255,0.12)",
  textColor = "#CBD5E1",
  startFrame = 6,
  size = 380,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, startFrame + 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const clamped = Math.max(0, Math.min(100, targetPct));
  const cx = size / 2;
  const cy = size * 0.56;
  const r = size * 0.38;
  const arcLen = Math.PI * r;
  const filledLen = arcLen * (clamped / 100) * progress;
  const needleDeg = -180 + 180 * (clamped / 100) * progress;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: size,
      }}
    >
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={trackColor}
          strokeWidth={26}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={accentColor}
          strokeWidth={26}
          strokeLinecap="round"
          strokeDasharray={`${filledLen} ${arcLen * 2}`}
        />
        <g transform={`translate(${cx}, ${cy}) rotate(${needleDeg})`}>
          <line
            x1={0}
            y1={0}
            x2={r - 18}
            y2={0}
            stroke="#FFFFFF"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <circle cx={0} cy={0} r={12} fill={accentColor} />
        </g>
      </svg>

      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: Math.round(size * 0.17),
          fontWeight: 900,
          color: accentColor,
          lineHeight: 1.0,
          marginTop: -4,
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: textColor,
          marginTop: 10,
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};
