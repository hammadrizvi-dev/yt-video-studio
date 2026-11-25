import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "@config/fonts";

export interface TimelineNode {
  year: string;
  title: string;
  metric?: string;
  highlight?: boolean;
  badge?: string;
}

export interface TimelineRailProps {
  nodes: TimelineNode[];
  accentColor?: string;
  highlightColor?: string;
  isLight?: boolean;
}

/**
 * Johnny Harris / Vox Documentary Rise & Fall Timeline Rail.
 * Progressive glowing rail synced to node arrivals + pulsing turning-point beacon.
 */
export const TimelineRail: React.FC<TimelineRailProps> = ({
  nodes,
  accentColor = "#EAB308",
  highlightColor = "#EF4444",
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lastNodeDelay = 8 + Math.max(0, nodes.length - 1) * 11;
  const railProgress = interpolate(frame, [4, lastNodeDelay + 12], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const textMain = isLight ? "#141413" : "#F8FAFC";
  const textMuted = isLight ? "#52524E" : "#94A3B8";
  const cardBg = isLight ? "#FFFFFF" : "rgba(15, 20, 32, 0.92)";

  return (
    <div style={{ width: "100%", position: "relative", paddingTop: 28 }}>
      {/* Background Rail */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 48,
          right: 48,
          height: 6,
          borderRadius: 99,
          backgroundColor: isLight
            ? "rgba(20,20,19,0.14)"
            : "rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${railProgress}%`,
            borderRadius: 99,
            background: `linear-gradient(90deg, ${accentColor} 0%, ${highlightColor} 100%)`,
            boxShadow: `0 0 18px ${accentColor}88`,
          }}
        />
      </div>

      {/* Nodes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${nodes.length}, minmax(0, 1fr))`,
          gap: 24,
          position: "relative",
          zIndex: 2,
        }}
      >
        {nodes.map((node, idx) => {
          const delay = 8 + idx * 11;
          const sp = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 13, stiffness: 165 },
          });
          const nodeColor = node.highlight ? highlightColor : accentColor;
          const ringScale = 1 + 0.35 * Math.sin(Math.max(0, frame - delay) * 0.2);

          return (
            <div
              key={node.year}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: sp,
                transform: `translate3d(0, ${(1 - sp) * 28}px, 0)`,
              }}
            >
              {/* Glowing Circle Dot + Turning-Point Pulse Ring */}
              <div
                style={{
                  position: "relative",
                  width: 36,
                  height: 36,
                  marginTop: 11,
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {node.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      inset: -8,
                      borderRadius: "50%",
                      border: `2.5px solid ${highlightColor}`,
                      transform: `scale(${ringScale.toFixed(3)})`,
                      opacity: 0.55,
                    }}
                  />
                )}
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    backgroundColor: nodeColor,
                    border: `5px solid ${isLight ? "#F5F0E3" : "#07090E"}`,
                    boxShadow: `0 0 22px ${nodeColor}99`,
                  }}
                />
              </div>

              {/* Milestone Card */}
              <div
                style={{
                  width: "100%",
                  padding: "24px 20px",
                  borderRadius: 16,
                  backgroundColor: cardBg,
                  border: `${node.highlight ? 2 : 1.5}px solid ${node.highlight ? highlightColor : `${accentColor}44`}`,
                  boxShadow: node.highlight
                    ? `0 16px 42px ${highlightColor}2E`
                    : `0 10px 28px rgba(0,0,0,${isLight ? 0.06 : 0.35})`,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {node.badge && (
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: 999,
                      backgroundColor: `${nodeColor}22`,
                      color: nodeColor,
                      fontFamily: FONTS.mono,
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {node.badge}
                  </span>
                )}
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 46,
                    color: nodeColor,
                    lineHeight: 1,
                  }}
                >
                  {node.year}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 24,
                    fontWeight: 800,
                    color: textMain,
                    lineHeight: 1.25,
                  }}
                >
                  {node.title}
                </div>
                {node.metric && (
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 21,
                      fontWeight: 700,
                      color: textMuted,
                    }}
                  >
                    {node.metric}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
