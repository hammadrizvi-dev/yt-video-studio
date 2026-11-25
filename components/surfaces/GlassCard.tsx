import React from "react";

export interface GlassCardProps {
  accentColor?: string;
  width?: number | string;
  padding?: string;
  borderRadius?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  accentColor = "#38F2FF",
  width = "100%",
  padding = "28px 34px",
  borderRadius = 24,
  children,
  style,
}) => {
  return (
    <div
      style={{
        width,
        padding,
        borderRadius,
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(12,19,38,0.88) 48%, rgba(5,9,20,0.94) 100%)",
        border: `1.5px solid ${accentColor}55`,
        boxShadow: `0 22px 54px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255,255,255,0.20)`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
