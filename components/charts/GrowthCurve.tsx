import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { FONTS } from "@config/fonts";

export interface GrowthCurveProps {
  title: string;
  highlightEndValue: string;
  accentColor?: string;
  mutedColor?: string;
  isLight?: boolean;
}

export const GrowthCurve: React.FC<GrowthCurveProps> = ({
  title,
  highlightEndValue,
  accentColor = "#10B981",
  mutedColor = "#64748B",
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [6, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const w = 1120;
  const h = 420;
  const expPath = "M 70 350 C 320 340, 620 270, 1020 62";
  const linPath = "M 70 350 L 1020 250";

  const evExp = evolvePath(progress, expPath);
  const evLin = evolvePath(progress, linPath);
  const expLen = getLength(expPath);
  const tip = getPointAtLength(expPath, expLen * progress);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: "0.14em",
          color: accentColor,
          marginBottom: 12,
        }}
      >
        {title}
      </div>

      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        <line x1={70} y1={350} x2={1040} y2={350} stroke={mutedColor} strokeOpacity={0.35} strokeWidth={2} />
        <path
          d={linPath}
          fill="none"
          stroke={mutedColor}
          strokeWidth={5}
          strokeDasharray={evLin.strokeDasharray}
          strokeDashoffset={evLin.strokeDashoffset}
          strokeOpacity={0.7}
        />
        <path
          d={expPath}
          fill="none"
          stroke={accentColor}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={evExp.strokeDasharray}
          strokeDashoffset={evExp.strokeDashoffset}
        />
        {tip && progress > 0.05 && (
          <>
            <circle cx={tip.x} cy={tip.y} r={14} fill={accentColor} />
            <circle cx={tip.x} cy={tip.y} r={24} fill={accentColor} fillOpacity={0.22} />
          </>
        )}

        {progress > 0.72 && (
          <g transform="translate(820, 16)">
            <rect
              x={0}
              y={0}
              width={260}
              height={74}
              rx={14}
              fill={isLight ? "#FFFFFF" : "#0B1325"}
              stroke={accentColor}
              strokeWidth={3}
            />
            <text
              x={130}
              y={48}
              textAnchor="middle"
              fill={accentColor}
              fontFamily={FONTS.mono}
              fontSize={36}
              fontWeight={900}
            >
              {highlightEndValue}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
