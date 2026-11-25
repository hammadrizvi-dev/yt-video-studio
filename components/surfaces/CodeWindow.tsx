import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";

export interface CodeWindowProps {
  title?: string;
  lines: string[];
  accentColor?: string;
  fontSize?: number;
  startDelay?: number;
}

/**
 * Clean GPU-animated code/terminal card with crisp line-by-line reveal.
 */
export const CodeWindow: React.FC<CodeWindowProps> = ({
  title = "router.py",
  lines,
  accentColor = "#38F2FF",
  fontSize = 30,
  startDelay = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSp = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 135 },
  });

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 22,
        backgroundColor: "#060B18",
        border: `1.5px solid ${accentColor}55`,
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
        opacity: cardSp,
        transform: `translate3d(0, ${(1 - cardSp) * 26}px, 0)`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 22px",
          backgroundColor: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FB7185" }} />
          <span style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#FBBF24" }} />
          <span style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#34D399" }} />
        </div>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            fontWeight: 700,
            color: "#94A3B8",
          }}
        >
          {title}
        </span>
      </div>

      <div
        style={{
          padding: "28px 34px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {lines.map((line, idx) => {
          const lineSp = spring({
            frame: Math.max(0, frame - (startDelay + idx * 8)),
            fps,
            config: { damping: 14, stiffness: 165 },
          });
          const isComment = line.trim().startsWith("#");
          const isBlank = line.trim().length === 0;
          return (
            <div
              key={`${idx}-${line}`}
              style={{
                fontFamily: FONTS.mono,
                fontSize,
                lineHeight: 1.4,
                fontWeight: isComment ? 600 : 700,
                color: isComment ? "#64748B" : idx === lines.length - 1 ? "#34D399" : "#E2E8F0",
                opacity: lineSp,
                minHeight: isBlank ? 14 : undefined,
                transform: `translate3d(${(1 - lineSp) * 16}px, 0, 0)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};
