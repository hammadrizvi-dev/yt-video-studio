import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SafeCanvas, SafeCanvasProps } from "./SafeCanvas";
import { Backdrop, BackdropMode } from "./Backdrop";
import { CameraMotionPreset, CameraRig } from "./CameraRig";
import { ThemeId } from "@config/themes";

export interface SceneViewportProps {
  theme: ThemeId;
  backdropMode?: BackdropMode;
  camera?: CameraMotionPreset;
  impactFrames?: number[];
  shakeAmplitude?: number;
  align?: SafeCanvasProps["align"];
  gap?: number;
  debugSafeZone?: boolean;
  children: React.ReactNode;
}

/**
 * Standard per-scene container combining Backdrop + CameraRig + SafeCanvas.
 * Only active scenes mount here, eliminating Scene3D DOM pileup.
 */
export const SceneViewport: React.FC<SceneViewportProps> = ({
  theme,
  backdropMode = "grid",
  camera = "drift-in",
  impactFrames,
  shakeAmplitude,
  align = "center",
  gap,
  debugSafeZone = false,
  children,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Gentle 10-frame micro-opacity settle avoids abrupt pixel pop without blurring
  const fadeSafety = durationInFrames > 0 ? (frame >= 0 ? 1 : 0) : 1;

  return (
    <AbsoluteFill style={{ opacity: fadeSafety }}>
      <Backdrop theme={theme} mode={backdropMode}>
        <CameraRig
          preset={camera}
          impactFrames={impactFrames}
          shakeAmplitude={shakeAmplitude}
        >
          <SafeCanvas align={align} gap={gap} debugGuide={debugSafeZone}>
            {children}
          </SafeCanvas>
        </CameraRig>
      </Backdrop>
    </AbsoluteFill>
  );
};
