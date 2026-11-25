import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type CameraMotionPreset =
  | "drift-in"
  | "swing-left"
  | "swing-right"
  | "zoom-punch"
  | "static";

export interface CameraRigProps {
  preset?: CameraMotionPreset;
  impactFrames?: number[];
  shakeAmplitude?: number;
  perspectivePx?: number;
  children: React.ReactNode;
}

/**
 * Pure GPU-accelerated per-scene camera choreography + damped impact shake.
 * Zero WebGL overhead and zero multi-sample blur lag in live Studio playback.
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  preset = "drift-in",
  impactFrames = [],
  shakeAmplitude = 8,
  perspectivePx = 1400,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const dur = Math.max(2, durationInFrames);
  const progress = Math.min(1, frame / dur);

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let rotateY = 0;

  if (preset === "drift-in") {
    scale = interpolate(progress, [0, 1], [1.0, 1.032]);
  } else if (preset === "swing-left") {
    const settle = spring({
      frame,
      fps,
      config: { damping: 16, stiffness: 110, mass: 0.9 },
    });
    rotateY = interpolate(settle, [0, 1], [-5.5, 0]);
    translateX = interpolate(settle, [0, 1], [42, 0]);
    scale = interpolate(progress, [0, 1], [0.99, 1.02]);
  } else if (preset === "swing-right") {
    const settle = spring({
      frame,
      fps,
      config: { damping: 16, stiffness: 110, mass: 0.9 },
    });
    rotateY = interpolate(settle, [0, 1], [5.5, 0]);
    translateX = interpolate(settle, [0, 1], [-42, 0]);
    scale = interpolate(progress, [0, 1], [0.99, 1.02]);
  } else if (preset === "zoom-punch") {
    const punch = interpolate(frame, [0, 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    scale = interpolate(punch, [0, 1], [1.07, 1.0]) + progress * 0.02;
  }

  for (const hit of impactFrames) {
    const dt = frame - hit;
    if (dt >= 0 && dt < 9) {
      const decay = 1 - dt / 9;
      translateX += Math.sin(dt * 2.8) * shakeAmplitude * decay;
      translateY += Math.cos(dt * 3.5) * shakeAmplitude * 0.65 * decay;
    }
  }

  return (
    <AbsoluteFill style={{ perspective: `${perspectivePx}px`, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transformStyle: "preserve-3d",
          transform: `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
