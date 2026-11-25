import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { FONTS } from "@config/fonts";

export interface FlowTarget {
  label: string;
  value: string;
  pct: number;
  color: string;
}

export interface FlowTreeProps {
  sourceLabel: string;
  sourceValue: string;
  targets: FlowTarget[];
  primaryColor?: string;
  textColor?: string;
  mutedColor?: string;
  isLight?: boolean;
}

export const FlowTree: React.FC<FlowTreeProps> = ({
  sourceLabel,
  sourceValue,
  targets,
  primaryColor = "#F59E0B",
  textColor = "#FFFFFF",
  mutedColor = "#94A3B8",
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const items = targets.slice(0, 4);
  const srcSp = spring({ frame, fps, config: { damping: 14, stiffness: 135 } });

  const svgW = 1480;
  const svgH = 500;
  const startX = 320;
  const startY = svgH / 2;
  const endX = 960;

  return (
    <div style={{ width: "100%", height: svgH, position: "relative" }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Source Node */}
        <g opacity={srcSp}>
          <rect
            x={16}
            y={startY - 82}
            width={296}
            height={164}
            rx={22}
            fill={isLight ? "#FFFFFF" : "rgba(15, 23, 42, 0.92)"}
            stroke={primaryColor}
            strokeWidth={3}
          />
          <text
            x={164}
            y={startY - 22}
            textAnchor="middle"
            fill={mutedColor}
            fontFamily={FONTS.mono}
            fontSize={22}
            fontWeight={800}
            letterSpacing="2"
          >
            {sourceLabel.toUpperCase()}
          </text>
          <text
            x={164}
            y={startY + 34}
            textAnchor="middle"
            fill={primaryColor}
            fontFamily={FONTS.mono}
            fontSize={52}
            fontWeight={900}
          >
            {sourceValue}
          </text>
        </g>

        {items.map((item, idx) => {
          const count = items.length;
          const spacing = count <= 2 ? 200 : count === 3 ? 156 : 118;
          const span = (count - 1) * spacing;
          const targetY = svgH / 2 - span / 2 + idx * spacing;

          const pathD = `M ${startX} ${startY} C ${startX + 260} ${startY}, ${endX - 260} ${targetY}, ${endX} ${targetY}`;
          const pathLength = getLength(pathD);
          const delay = 8 + idx * 8;
          const progress = interpolate(frame, [delay, delay + 26], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });
          const evolved = evolvePath(progress, pathD);
          const sw = Math.max(8, Math.min(26, (item.pct / 100) * 42));
          const pulseT = ((Math.max(0, frame - delay) % 34) / 34) * progress;
          const tip = getPointAtLength(pathD, Math.min(pathLength, pathLength * pulseT));

          const targetSp = spring({
            frame: Math.max(0, frame - (delay + 12)),
            fps,
            config: { damping: 14, stiffness: 150 },
          });

          return (
            <g key={item.label}>
              <path
                d={pathD}
                fill="none"
                stroke={item.color}
                strokeOpacity={0.14}
                strokeWidth={sw}
                strokeLinecap="round"
              />
              <path
                d={pathD}
                fill="none"
                stroke={item.color}
                strokeWidth={sw}
                strokeLinecap="round"
                strokeDasharray={evolved.strokeDasharray}
                strokeDashoffset={evolved.strokeDashoffset}
              />
              {tip && progress > 0.08 && (
                <circle cx={tip.x} cy={tip.y} r={8} fill="#FFFFFF" opacity={0.92} />
              )}

              <g
                opacity={targetSp}
                transform={`translate(${endX + 18}, ${targetY - 42})`}
              >
                <rect
                  x={0}
                  y={0}
                  width={480}
                  height={84}
                  rx={16}
                  fill={isLight ? "#FFFFFF" : "rgba(15, 23, 42, 0.90)"}
                  stroke={item.color}
                  strokeWidth={2.5}
                />
                <text
                  x={24}
                  y={52}
                  fill={textColor}
                  fontFamily={FONTS.sans}
                  fontSize={28}
                  fontWeight={800}
                >
                  {item.label}
                </text>
                <text
                  x={456}
                  y={52}
                  textAnchor="end"
                  fill={item.color}
                  fontFamily={FONTS.mono}
                  fontSize={34}
                  fontWeight={900}
                >
                  {item.value}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
