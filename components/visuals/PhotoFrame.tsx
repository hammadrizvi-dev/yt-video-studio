import React from "react";
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";

export interface PhotoFrameProps {
  src: string;
  badgeText?: string;
  accentColor?: string;
  width?: number | string;
  height?: number;
  zoomFrom?: number;
  zoomTo?: number;
  showPulse?: boolean;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  src,
  badgeText,
  accentColor = "#F59E0B",
  width = "100%",
  height = 420,
  zoomFrom = 1.0,
  zoomTo = 1.08,
  showPulse = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 135 } });
  const scale = interpolate(frame, [0, Math.max(1, durationInFrames)], [zoomFrom, zoomTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const pulse = 0.75 + 0.25 * Math.sin(frame * 0.22);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 24,
        overflow: "hidden",
        border: `2px solid ${accentColor}66`,
        boxShadow: `0 22px 54px rgba(0,0,0,0.62), 0 0 28px ${accentColor}20`,
        opacity: enter,
        transform: `translate3d(0, ${(1 - enter) * 24}px, 0)`,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale.toFixed(4)})`,
          willChange: "transform",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 52%, rgba(4,7,16,0.78) 100%)",
          pointerEvents: "none",
        }}
      />

      {(badgeText || showPulse) && (
        <div
          style={{
            position: "absolute",
            left: 18,
            right: 18,
            bottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {badgeText ? (
            <span
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                backgroundColor: "rgba(4,7,16,0.86)",
                border: `1.5px solid ${accentColor}`,
                fontFamily: FONTS.mono,
                fontSize: 22,
                fontWeight: 900,
                color: accentColor,
                letterSpacing: "0.08em",
              }}
            >
              {badgeText}
            </span>
          ) : (
            <span />
          )}

          {showPulse && (
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                backgroundColor: accentColor,
                boxShadow: `0 0 18px ${accentColor}`,
                opacity: pulse,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
