import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "@config/fonts";

export interface ChapterTitleCardProps {
  actLabel: string;
  title: string;
  subtitle?: string;
  chapterNumber?: string;
  metadataTags?: string[];
  accentColor?: string;
  isLight?: boolean;
}

/**
 * Full-canvas Documentary Act Break Card (Netflix / Vox / MagnatesMedia pacing reset).
 * Uses masked kinetic reveal, giant low-opacity chapter watermark, and metadata chips.
 */
export const ChapterTitleCard: React.FC<ChapterTitleCardProps> = ({
  actLabel,
  title,
  subtitle,
  chapterNumber,
  metadataTags = [],
  accentColor = "#EAB308",
  isLight = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelSp = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 150 },
  });
  const titleSp = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 145, mass: 0.85 },
  });
  const subSp = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 16, stiffness: 135 },
  });
  const tagsSp = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 15, stiffness: 140 },
  });
  const lineW = interpolate(frame, [6, 30], [0, 360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const pulse = 0.55 + 0.45 * Math.sin(frame * 0.28);

  const textMain = isLight ? "#141413" : "#F8FAFC";
  const textMuted = isLight ? "#52524E" : "#CBD5E1";
  const watermarkColor = isLight
    ? "rgba(20, 20, 19, 0.05)"
    : "rgba(255, 255, 255, 0.045)";
  const chipBg = isLight
    ? "rgba(20, 20, 19, 0.06)"
    : "rgba(255, 255, 255, 0.06)";
  const chipBorder = isLight
    ? "rgba(20, 20, 19, 0.14)"
    : "rgba(255, 255, 255, 0.14)";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 22,
        maxWidth: 1380,
        width: "100%",
        padding: "24px 0",
      }}
    >
      {/* Background Oversized Chapter Number Watermark */}
      {chapterNumber && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -52%) scale(${interpolate(labelSp, [0, 1], [1.14, 1]).toFixed(4)})`,
            fontFamily: FONTS.display,
            fontSize: 420,
            lineHeight: 0.85,
            color: watermarkColor,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {chapterNumber}
        </div>
      )}

      {/* Kicker Pill with Pulsing Indicator */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 20px",
          borderRadius: 999,
          backgroundColor: `${accentColor}1A`,
          border: `1.5px solid ${accentColor}55`,
          opacity: labelSp,
          transform: `translate3d(0, ${(1 - labelSp) * 16}px, 0)`,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: accentColor,
            boxShadow: `0 0 14px ${accentColor}`,
            opacity: pulse,
          }}
        />
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: accentColor,
            textTransform: "uppercase",
          }}
        >
          {actLabel}
        </span>
      </div>

      {/* Expanding Accent Hairline */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: lineW,
          height: 4,
          backgroundColor: accentColor,
          borderRadius: 99,
          boxShadow: `0 0 18px ${accentColor}88`,
        }}
      />

      {/* Masked Kinetic Title Reveal */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
          padding: "4px 12px",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 118,
            lineHeight: 1.02,
            letterSpacing: "0.02em",
            color: textMain,
            opacity: Math.min(1, titleSp * 1.4),
            transform: `translate3d(0, ${(1 - titleSp) * 110}px, 0)`,
          }}
        >
          {title}
        </div>
      </div>

      {/* Editorial Serif Subtitle */}
      {subtitle && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 42,
            lineHeight: 1.25,
            color: textMuted,
            maxWidth: 1040,
            opacity: subSp,
            transform: `translate3d(0, ${(1 - subSp) * 18}px, 0)`,
          }}
        >
          {subtitle}
        </div>
      )}

      {/* Optional Metadata Chips */}
      {metadataTags.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            marginTop: 8,
            opacity: tagsSp,
            transform: `translate3d(0, ${(1 - tagsSp) * 14}px, 0)`,
          }}
        >
          {metadataTags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                backgroundColor: chipBg,
                border: `1px solid ${chipBorder}`,
                fontFamily: FONTS.mono,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: textMuted,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
