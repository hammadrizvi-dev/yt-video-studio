import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";

export interface FilmOverlayProps {
  /** Enable subtle animated 35mm film grain texture */
  grainOpacity?: number;
  /** Enable cinematic edge vignette */
  vignetteStrength?: number;
  /** Subtle warm/cool atmospheric sheen */
  tintColor?: string;
  /** Polarity-aware mode: uses crisp paper grain + softer editorial edge on light scenes */
  isLightScene?: boolean;
  /** Subtle documentary viewfinder corner brackets */
  showFrameGuides?: boolean;
}

/**
 * Polarity-aware broadcast post-processing pass:
 * - Dark scenes: stepped 15fps 35mm film grain (assets/textures/film-grain.png) + deep radial vignette
 * - Light scenes: stepped warm archival grain (assets/textures/paper-grain.png) + subtle editorial vignette
 * - Pure GPU CSS compositing (zero canvas/WebGL lag in Remotion Studio)
 */
export const FilmOverlay: React.FC<FilmOverlayProps> = ({
  grainOpacity = 0.065,
  vignetteStrength = 0.42,
  tintColor = "rgba(234, 179, 8, 0.03)",
  isLightScene = false,
  showFrameGuides = false,
}) => {
  const frame = useCurrentFrame();
  // Step grain every 2 frames (~15Hz) for authentic organic 35mm texture feel
  const step = Math.floor(frame / 2);
  const offsetX = ((step * 73) % 180) - 90;
  const offsetY = ((step * 41) % 140) - 70;

  const grainAsset = isLightScene
    ? "textures/paper-grain.png"
    : "textures/film-grain.png";
  const effectiveGrainOpacity = isLightScene
    ? Math.min(0.11, grainOpacity * 1.25)
    : grainOpacity;
  const effectiveVignette = isLightScene
    ? Math.min(0.14, vignetteStrength * 0.32)
    : vignetteStrength;

  const guideColor = isLightScene
    ? "rgba(20, 20, 19, 0.14)"
    : "rgba(248, 250, 252, 0.14)";

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 90 }}>
      {/* Animated 15fps Film / Paper Grain (using Remotion <Img> for frame safety) */}
      {effectiveGrainOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: -120,
            transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
            opacity: effectiveGrainOpacity,
            mixBlendMode: isLightScene ? "multiply" : "overlay",
          }}
        >
          <Img
            src={staticFile(grainAsset)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Polarity-Aware Cinema Vignette */}
      {effectiveVignette > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isLightScene
              ? `radial-gradient(ellipse 88% 82% at 50% 48%, transparent 62%, rgba(92, 74, 46, ${effectiveVignette}) 100%)`
              : `radial-gradient(ellipse 84% 78% at 50% 48%, transparent 56%, rgba(4, 6, 12, ${effectiveVignette}) 100%)`,
          }}
        />
      )}

      {/* Subtle Atmospheric Grade */}
      {!isLightScene && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${tintColor} 0%, transparent 45%, rgba(0, 0, 0, 0.06) 100%)`,
          }}
        />
      )}

      {/* Optional Subtle Documentary Viewfinder Corner Brackets */}
      {showFrameGuides && (
        <>
          <div
            style={{
              position: "absolute",
              top: 24,
              left: 28,
              width: 22,
              height: 22,
              borderTop: `2px solid ${guideColor}`,
              borderLeft: `2px solid ${guideColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 24,
              right: 28,
              width: 22,
              height: 22,
              borderTop: `2px solid ${guideColor}`,
              borderRight: `2px solid ${guideColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 28,
              width: 22,
              height: 22,
              borderBottom: `2px solid ${guideColor}`,
              borderLeft: `2px solid ${guideColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 28,
              width: 22,
              height: 22,
              borderBottom: `2px solid ${guideColor}`,
              borderRight: `2px solid ${guideColor}`,
            }}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
