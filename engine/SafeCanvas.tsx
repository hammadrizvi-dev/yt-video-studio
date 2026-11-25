import React, { useContext } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { getSafeZone } from "@config/safeZones";
import { SafeZoneDebugContext } from "./SafeZoneContext";

export interface SafeCanvasProps {
  children: React.ReactNode;
  align?: "center" | "top" | "between";
  gap?: number;
  debugGuide?: boolean;
  style?: React.CSSProperties;
}

/**
 * Exact UI-safe bounding box for YouTube 16:9 (1760x928) and 9:16 Shorts (888x1220).
 * Anchors strictly at [top, left, innerWidth, innerHeight] so content can never slip into
 * the bottom Shorts captions/description danger zone or right-edge engagement buttons.
 */
export const SafeCanvas: React.FC<SafeCanvasProps> = ({
  children,
  align = "center",
  gap = 28,
  debugGuide = false,
  style,
}) => {
  const { width, height } = useVideoConfig();
  const sz = getSafeZone(width, height);
  const contextDebug = useContext(SafeZoneDebugContext);
  const showGuide = debugGuide || contextDebug;

  const justifyContent =
    align === "top"
      ? "flex-start"
      : align === "between"
        ? "space-between"
        : "center";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {showGuide && (
        <div
          style={{
            position: "absolute",
            top: sz.top,
            left: sz.left,
            width: sz.innerWidth,
            height: sz.innerHeight,
            border: "2px dashed rgba(52, 211, 153, 0.7)",
            backgroundColor: "rgba(52, 211, 153, 0.04)",
            pointerEvents: "none",
            zIndex: 99,
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: sz.top,
          left: sz.left,
          width: sz.innerWidth,
          height: sz.innerHeight,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent,
          gap,
          overflow: "hidden",
          pointerEvents: "auto",
          ...style,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};
