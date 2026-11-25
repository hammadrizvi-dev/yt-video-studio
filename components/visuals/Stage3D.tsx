import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";
import "@react-three/fiber";

export interface Stage3DProps {
  width?: number;
  height?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
  children: React.ReactNode;
}

/**
 * Isolated @remotion/three + React Three Fiber 3D WebGL stage.
 * Opt-in per shot so regular 2D/GPU scenes stay locked at 30fps live preview.
 */
export const Stage3D: React.FC<Stage3DProps> = ({
  width,
  height,
  cameraPosition = [0, 0.4, 5],
  fov = 42,
  children,
}) => {
  const vc = useVideoConfig();
  const w = width ?? vc.width;
  const h = height ?? vc.height;

  return (
    <ThreeCanvas
      width={w}
      height={h}
      camera={{ position: cameraPosition, fov }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      {children}
    </ThreeCanvas>
  );
};
