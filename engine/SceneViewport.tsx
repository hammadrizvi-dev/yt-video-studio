import React from "react";
import { AbsoluteFill } from "remotion";
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
  handheldIntensity?: number;
  align?: SafeCanvasProps["align"];
  gap?: number;
  debugSafeZone?: boolean;
  children: React.ReactNode;
}

/**
 * Standard per-scene container combining Backdrop + CameraRig + SafeCanvas.
 * Guarantees every scene respects 16:9 / 9:16 YouTube UI safe zones.
 */
export const SceneViewport: React.FC<SceneViewportProps> = ({
  theme,
  backdropMode = "grid",
  camera = "drift-in",
  impactFrames,
  shakeAmplitude,
  handheldIntensity,
  align = "center",
  gap,
  debugSafeZone = false,
  children,
}) => {
  return (
    <AbsoluteFill>
      <Backdrop theme={theme} mode={backdropMode}>
        <CameraRig
          preset={camera}
          impactFrames={impactFrames}
          shakeAmplitude={shakeAmplitude}
          handheldIntensity={handheldIntensity}
        >
          <SafeCanvas align={align} gap={gap} debugGuide={debugSafeZone}>
            {children}
          </SafeCanvas>
        </CameraRig>
      </Backdrop>
    </AbsoluteFill>
  );
};
