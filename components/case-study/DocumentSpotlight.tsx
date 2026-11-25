import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "@config/fonts";

export interface DocumentSpotlightProps {
  sourceTag: string;
  filingDate: string;
  headline: string;
  bodyBefore: string;
  highlightedClaim: string;
  bodyAfter?: string;
  handNote?: string;
  stampText?: string;
  stampColor?: string;
  highlightColor?: string;
  citationFooter?: string;
}

/**
 * MagnatesMedia / Vox Investigative Document Spotlight:
 * Textured archival filing sheet with multi-line-safe progressive highlighter sweep,
 * handwritten Kalam margin note, and high-impact rubber stamp slam.
 */
export const DocumentSpotlight: React.FC<DocumentSpotlightProps> = ({
  sourceTag,
  filingDate,
  headline,
  bodyBefore,
  highlightedClaim,
  bodyAfter = "",
  handNote,
  stampText = "VERIFIED FILING",
  stampColor = "#DC2626",
  highlightColor = "#FACC15",
  citationFooter,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSp = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 130 },
  });
  const sweepPct = interpolate(frame, [14, 42], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const noteSp = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 14, stiffness: 160 },
  });
  const stampSp = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: { damping: 9, stiffness: 240, mass: 0.65 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1400,
        padding: "44px 56px",
        borderRadius: 12,
        backgroundColor: "#FBF7EE",
        color: "#141413",
        border: "1.5px solid #D6CDBB",
        boxShadow: "0 30px 90px rgba(0,0,0,0.42)",
        overflow: "hidden",
        transform: `translate3d(0, ${(1 - cardSp) * 34}px, 0) rotate(-0.55deg)`,
        opacity: cardSp,
      }}
    >
      {/* Tactile Archival Paper Texture */}
      <Img
        src={staticFile("textures/user-paper-warm.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.36,
          pointerEvents: "none",
        }}
      />

      {/* Top Masthead */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "4px solid #141413",
          borderBottom: "2px solid #141413",
          padding: "10px 0",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.14em",
          }}
        >
          {sourceTag}
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            fontWeight: 700,
            color: "#6B6A64",
          }}
        >
          {filingDate}
        </span>
      </div>

      {/* Editorial Serif Headline */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: FONTS.serif,
          fontSize: 56,
          lineHeight: 1.08,
          color: "#141413",
          marginBottom: 26,
        }}
      >
        {headline}
      </div>

      {/* Body with Multi-Line-Safe Progressive Marker Sweep */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: FONTS.sans,
          fontSize: 31,
          lineHeight: 1.54,
          color: "#2E2E2B",
          maxWidth: "90%",
        }}
      >
        {bodyBefore}{" "}
        <span
          style={{
            fontWeight: 800,
            color: "#141413",
            padding: "2px 6px",
            borderRadius: 4,
            backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 85%",
            backgroundSize: `${sweepPct.toFixed(1)}% 82%`,
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {highlightedClaim}
        </span>{" "}
        {bodyAfter}
      </div>

      {/* Handwritten Margin Note (Kalam) */}
      {handNote && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: 26,
            fontFamily: FONTS.hand,
            fontSize: 36,
            color: "#B91C1C",
            transform: `rotate(-1.5deg) translate3d(0, ${(1 - noteSp) * 14}px, 0)`,
            opacity: noteSp,
          }}
        >
          ↳ {handNote}
        </div>
      )}

      {/* Optional Grounded Source Citation Footer */}
      {citationFooter && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: 20,
            paddingTop: 12,
            borderTop: "1px dashed rgba(20,20,19,0.22)",
            fontFamily: FONTS.mono,
            fontSize: 17,
            fontWeight: 700,
            color: "#6B6A64",
          }}
        >
          {citationFooter}
        </div>
      )}

      {/* Slamming Rubber Stamp */}
      {stampText && (
        <div
          style={{
            position: "absolute",
            right: 44,
            bottom: 34,
            padding: "10px 26px",
            border: `5px solid ${stampColor}`,
            borderRadius: 8,
            color: stampColor,
            fontFamily: FONTS.mono,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: "0.14em",
            backgroundColor: "rgba(251, 247, 238, 0.88)",
            transform: `rotate(-9deg) scale(${interpolate(stampSp, [0, 1], [2.1, 1]).toFixed(4)})`,
            opacity: Math.min(1, stampSp * 1.8),
            zIndex: 3,
          }}
        >
          {stampText}
        </div>
      )}
    </div>
  );
};
