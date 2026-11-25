import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { THEMES, ThemeId } from "@config/themes";

export type BackdropMode = "horizon" | "grid" | "paper" | "clean";

export interface BackdropProps {
  theme: ThemeId;
  mode?: BackdropMode;
  gridSpeed?: number;
  children?: React.ReactNode;
}

/**
 * Pure GPU-accelerated canvas backdrop:
 * - "horizon": Perspective 3D cyber/finance floor with scrolling wireframe lines
 * - "grid": Crisp architectural grid + dual soft atmospheric glows
 * - "paper": Tactile warm archival paper + fine engineering rulings
 * - "clean": Minimal studio gradient
 */
export const Backdrop: React.FC<BackdropProps> = ({
  theme,
  mode = "grid",
  gridSpeed = 2.2,
  children,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const isVertical = height > width;
  const t = THEMES[theme];
  const scrollPx = (frame * gridSpeed) % 72;

  return (
    <AbsoluteFill style={{ backgroundColor: t.bgBase, overflow: "hidden" }}>
      {/* Soft radial color grading */}
      <AbsoluteFill
        style={{
          background: t.isLight
            ? `radial-gradient(ellipse 88% 72% at 50% 35%, rgba(255,255,255,0.55) 0%, transparent 72%)`
            : `
              radial-gradient(ellipse 80% 48% at 50% ${mode === "horizon" ? "40%" : "22%"}, ${t.bgGlowPrimary}24 0%, transparent 70%),
              radial-gradient(circle at 18% 82%, ${t.bgGlowSecondary}16 0%, transparent 48%),
              radial-gradient(circle at 86% 18%, ${t.bgGlowPrimary}14 0%, transparent 45%)
            `,
          pointerEvents: "none",
        }}
      />

      {/* Optional paper texture for light editorial beats */}
      {t.isLight && t.paperTexture && mode === "paper" && (
        <Img
          src={staticFile(t.paperTexture)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.48,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Flat architectural grid */}
      {(mode === "grid" || mode === "paper") && (
        <AbsoluteFill
          style={{
            backgroundImage: `
              linear-gradient(to right, ${t.gridColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${t.gridColor} 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            backgroundPosition: `${(frame * 0.35) % 64}px 0px`,
            maskImage: "radial-gradient(ellipse 92% 92% at 50% 50%, black 42%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 92% 92% at 50% 50%, black 42%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* 3D Sloped Horizon Grid Floor (GPU perspective transform only) */}
      {mode === "horizon" && (
        <>
          <div
            style={{
              position: "absolute",
              left: "-32%",
              right: "-32%",
              top: isVertical ? "48%" : "44%",
              bottom: "-36%",
              perspective: isVertical ? 540 : 660,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: "rotateX(70deg)",
                transformOrigin: "center top",
                backgroundImage: `
                  linear-gradient(to right, ${t.gridColor} 1.5px, transparent 1.5px),
                  linear-gradient(to bottom, ${t.gridColor} 1.5px, transparent 1.5px)
                `,
                backgroundSize: "72px 72px",
                backgroundPosition: `0px ${scrollPx}px`,
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 26%, black 86%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 26%, black 86%, transparent 100%)",
              }}
            />
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: isVertical ? "50%" : "46%",
              height: 2,
              background: `linear-gradient(90deg, transparent 6%, ${t.bgGlowPrimary}66 50%, transparent 94%)`,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {children}
    </AbsoluteFill>
  );
};
