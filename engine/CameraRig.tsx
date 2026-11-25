import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { noise2D } from "@remotion/noise";

export type CameraMotionPreset =
  | "drift-in"
  | "swing-left"
  | "swing-right"
  | "zoom-punch"
  | "ken-burns"
  | "dolly-focus"
  | "dramatic-pull"
  | "rack-push"
  | "static";

export interface CameraRigProps {
  preset?: CameraMotionPreset;
  impactFrames?: number[];
  shakeAmplitude?: number;
  perspectivePx?: number;
  /** Subtle deterministic handheld micro-drift in px via @remotion/noise (0 disables) */
  handheldIntensity?: number;
  children: React.ReactNode;
}

/**
 * Pure GPU-accelerated per-scene camera choreography + organic @remotion/noise
 * handheld breathing + exponential damped impact shake with micro-scale punch.
 */
export const CameraRig: React.FC<CameraRigProps> = ({
  preset = "drift-in",
  impactFrames = [],
  shakeAmplitude = 8,
  perspectivePx = 1400,
  handheldIntensity,
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
  let rotateZ = 0;

  if (preset === "drift-in") {
    scale = interpolate(progress, [0, 1], [1.0, 1.038]);
  } else if (preset === "ken-burns") {
    scale = interpolate(progress, [0, 1], [1.01, 1.068]);
    translateX = interpolate(progress, [0, 1], [-16, 16]);
    translateY = interpolate(progress, [0, 1], [8, -8]);
  } else if (preset === "dolly-focus") {
    const eased = Easing.out(Easing.quad)(progress);
    scale = interpolate(eased, [0, 1], [0.985, 1.055]);
  } else if (preset === "dramatic-pull") {
    const pull = interpolate(frame, [0, 26], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    scale = interpolate(pull, [0, 1], [1.12, 1.0]) + progress * 0.016;
  } else if (preset === "rack-push") {
    const snap = interpolate(frame, [0, 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    });
    scale = interpolate(snap, [0, 1], [0.95, 1.015]) + progress * 0.03;
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

  // Deterministic documentary handheld micro-breathing via @remotion/noise
  const effectiveHandheld =
    handheldIntensity !== undefined
      ? handheldIntensity
      : preset === "static"
        ? 0
        : 1.5;

  if (effectiveHandheld > 0) {
    const t = frame / Math.max(1, fps);
    translateX += noise2D("cam-x", t * 0.35, 0) * effectiveHandheld;
    translateY += noise2D("cam-y", 0, t * 0.35) * effectiveHandheld * 0.8;
    rotateZ += noise2D("cam-r", t * 0.22, 1.7) * (effectiveHandheld * 0.045);
  }

  // Exponential damped impact shake + subtle scale punch
  for (const hit of impactFrames) {
    const dt = frame - hit;
    if (dt >= 0 && dt < 11) {
      const decay = Math.exp(-dt * 0.34);
      translateX += Math.sin(dt * 3.1) * shakeAmplitude * decay;
      translateY += Math.cos(dt * 3.9) * shakeAmplitude * 0.65 * decay;
      scale += 0.012 * Math.exp(-dt * 0.45);
    }
  }

  return (
    <AbsoluteFill style={{ perspective: `${perspectivePx}px`, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transformStyle: "preserve-3d",
          transform: `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) rotateY(${rotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(3)}deg) scale(${scale.toFixed(4)})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
