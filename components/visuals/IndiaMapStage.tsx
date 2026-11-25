import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { FONTS } from "@config/fonts";

export interface IndiaMapStageProps {
  accentColor?: string;
  secondaryColor?: string;
  headline?: string;
  metricValue?: string;
  boxSize?: number;
}

const CITY_NODES = [
  { name: "DELHI", x: 185, y: 145 },
  { name: "MUMBAI", x: 112, y: 278 },
  { name: "BENGALURU", x: 175, y: 382 },
];

export const IndiaMapStage: React.FC<IndiaMapStageProps> = ({
  accentColor = "#F59E0B",
  secondaryColor = "#10B981",
  headline = "800+ CITIES SCALE",
  metricValue = "25L / DAY",
  boxSize = 460,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const zoom = interpolate(frame, [0, Math.max(1, durationInFrames)], [1.0, 1.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const route1 = "M 185 145 Q 110 205 112 278";
  const route2 = "M 112 278 Q 140 340 175 382";
  const len1 = getLength(route1);
  const len2 = getLength(route2);

  const p1 = interpolate(frame, [8, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p2 = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ev1 = evolvePath(p1, route1);
  const ev2 = evolvePath(p2, route2);
  const tip1 = getPointAtLength(route1, len1 * p1);
  const tip2 = getPointAtLength(route2, len2 * p2);

  return (
    <div
      style={{
        position: "relative",
        width: boxSize,
        height: boxSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 28,
        border: `2px solid ${accentColor}55`,
        backgroundColor: "rgba(9, 13, 24, 0.84)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.55)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 440,
          height: 480,
          transform: `scale(${(boxSize / 480) * zoom})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        <Img
          src={staticFile("brands/india-map.svg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0.36,
            filter: "brightness(1.3) sepia(0.35) hue-rotate(175deg)",
          }}
        />

        <svg
          width={440}
          height={480}
          viewBox="0 0 440 480"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d={route1}
            fill="none"
            stroke={accentColor}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={ev1.strokeDasharray}
            strokeDashoffset={ev1.strokeDashoffset}
          />
          <path
            d={route2}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={ev2.strokeDasharray}
            strokeDashoffset={ev2.strokeDashoffset}
          />

          {tip1 && p1 > 0.05 && p1 < 0.99 && (
            <circle cx={tip1.x} cy={tip1.y} r={7} fill="#FFFFFF" />
          )}
          {tip2 && p2 > 0.05 && p2 < 0.99 && (
            <circle cx={tip2.x} cy={tip2.y} r={7} fill="#FFFFFF" />
          )}

          {CITY_NODES.map((city, idx) => {
            const nodeSp = spring({
              frame: Math.max(0, frame - (4 + idx * 8)),
              fps,
              config: { damping: 12, stiffness: 180 },
            });
            const pulse = 1 + 0.16 * Math.sin((frame + idx * 7) * 0.25);

            return (
              <g key={city.name} opacity={nodeSp}>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={18 * pulse}
                  fill={accentColor}
                  fillOpacity={0.22}
                />
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={8}
                  fill={accentColor}
                  stroke="#FFFFFF"
                  strokeWidth={2.5}
                />
                <text
                  x={city.x + 14}
                  y={city.y + 6}
                  fill="#F8FAFC"
                  fontFamily={FONTS.mono}
                  fontSize={16}
                  fontWeight={900}
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          left: 18,
          right: 18,
          bottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 18px",
          borderRadius: 14,
          backgroundColor: "rgba(4, 7, 16, 0.9)",
          border: `1.5px solid ${secondaryColor}`,
        }}
      >
        <span style={{ fontFamily: FONTS.mono, fontSize: 18, fontWeight: 900, color: accentColor }}>
          {headline}
        </span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 22, fontWeight: 900, color: secondaryColor }}>
          {metricValue}
        </span>
      </div>
    </div>
  );
};
