import React, { useId } from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { evolvePath, getLength, getPointAtLength } from "@remotion/paths";
import { FONTS } from "@config/fonts";

export interface StockPoint {
  label: string;
  value: number;
}

export interface SecondarySeries {
  label: string;
  color: string;
  points: StockPoint[];
}

export interface ChartCallout {
  pointIndex: number;
  label: string;
}

export interface StockTickerChartProps {
  title: string;
  ticker: string;
  points: StockPoint[];
  primaryLabel?: string;
  secondarySeries?: SecondarySeries;
  callout?: ChartCallout;
  accentColor?: string;
  deltaBadge?: string;
  unitPrefix?: string;
  unitSuffix?: string;
  sourceNote?: string;
  isLight?: boolean;
  height?: number;
}

function buildSmoothPath(coords: { x: number; y: number }[]): string {
  if (coords.length === 0) return "";
  if (coords.length === 1) {
    return `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
  }
  let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(0, i - 1)];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[Math.min(coords.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/**
 * Bloomberg / MagnatesMedia animated revenue & stock trajectory chart.
 * Uses @remotion/paths smooth cubic curves, live crosshair beacon, dual-series
 * comparison mode, and inflection callout pins.
 */
export const StockTickerChart: React.FC<StockTickerChartProps> = ({
  title,
  ticker,
  points,
  primaryLabel,
  secondarySeries,
  callout,
  accentColor = "#22C55E",
  deltaBadge,
  unitPrefix = "₹",
  unitSuffix = " Cr",
  sourceNote,
  isLight = false,
  height = 420,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const W = 1040;
  const H = height;
  const padL = 104;
  const padR = 44;
  const padT = 38;
  const padB = 56;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const allVals = [
    ...points.map((p) => p.value),
    ...(secondarySeries ? secondarySeries.points.map((p) => p.value) : []),
  ];
  const minVal = Math.min(...allVals) * 0.85;
  const maxVal = Math.max(...allVals) * 1.1;
  const span = Math.max(1, maxVal - minVal);

  const mapPoints = (pts: StockPoint[]) =>
    pts.map((p, i) => {
      const x = padL + (i / Math.max(1, pts.length - 1)) * chartW;
      const y = padT + chartH - ((p.value - minVal) / span) * chartH;
      return { x, y, ...p };
    });

  const coords = mapPoints(points);
  const secCoords = secondarySeries ? mapPoints(secondarySeries.points) : [];

  const drawProgress = interpolate(frame, [6, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const pathD = buildSmoothPath(coords);
  const areaD = `${pathD} L ${coords[coords.length - 1].x.toFixed(1)} ${(padT + chartH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;
  const evPrimary = evolvePath(drawProgress, pathD);
  const primaryLen = getLength(pathD);
  const tip = getPointAtLength(pathD, primaryLen * drawProgress) ?? coords[0];

  const secPathD = secCoords.length > 1 ? buildSmoothPath(secCoords) : "";
  const evSec = secPathD ? evolvePath(drawProgress, secPathD) : null;
  const secLen = secPathD ? getLength(secPathD) : 0;
  const secTip = secPathD ? getPointAtLength(secPathD, secLen * drawProgress) : null;

  // Interpolated live headline value
  const tipIdx = Math.min(
    coords.length - 1,
    Math.floor(drawProgress * (coords.length - 1)),
  );
  const nextIdx = Math.min(coords.length - 1, tipIdx + 1);
  const segFrac = drawProgress * (coords.length - 1) - tipIdx;
  const liveVal =
    coords[tipIdx].value + (coords[nextIdx].value - coords[tipIdx].value) * segFrac;

  const badgeSp = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const calloutSp = spring({
    frame: Math.max(0, frame - 46),
    fps,
    config: { damping: 13, stiffness: 180 },
  });

  const textMain = isLight ? "#141413" : "#F8FAFC";
  const textMuted = isLight ? "#52524E" : "#94A3B8";
  const gridStroke = isLight ? "rgba(20,20,19,0.12)" : "rgba(255,255,255,0.10)";
  const gradId = `stock-grad-${uid}`;
  const formattedLive =
    Math.abs(liveVal) >= 100
      ? Math.round(liveVal).toLocaleString("en-IN")
      : liveVal.toFixed(1);

  const calloutCoord =
    callout && coords[callout.pointIndex] ? coords[callout.pointIndex] : null;

  return (
    <div
      style={{
        width: "100%",
        padding: "26px 34px",
        borderRadius: 20,
        backgroundColor: isLight ? "#FFFFFF" : "rgba(12, 16, 26, 0.92)",
        border: `1px solid ${accentColor}44`,
        boxShadow: isLight
          ? "0 14px 40px rgba(0,0,0,0.08)"
          : "0 24px 64px rgba(0,0,0,0.55)",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 19,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: "0.14em",
            }}
          >
            {ticker}
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 34,
              fontWeight: 800,
              color: textMain,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 44,
              fontWeight: 800,
              color: textMain,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {unitPrefix}
            {formattedLive}
            {unitSuffix}
          </div>
          {deltaBadge && (
            <div
              style={{
                padding: "8px 18px",
                borderRadius: 10,
                backgroundColor: `${accentColor}22`,
                border: `2px solid ${accentColor}`,
                color: accentColor,
                fontFamily: FONTS.mono,
                fontSize: 24,
                fontWeight: 800,
                transform: `scale(${(0.7 + 0.3 * badgeSp).toFixed(4)})`,
                opacity: badgeSp,
              }}
            >
              {deltaBadge}
            </div>
          )}
        </div>
      </div>

      {/* Optional Dual-Series Legend */}
      {(primaryLabel || secondarySeries) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginBottom: 8,
          }}
        >
          {primaryLabel && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 18,
                  height: 5,
                  borderRadius: 99,
                  backgroundColor: accentColor,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 19,
                  fontWeight: 700,
                  color: textMain,
                }}
              >
                {primaryLabel}
              </span>
            </div>
          )}
          {secondarySeries && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 18,
                  height: 5,
                  borderRadius: 99,
                  backgroundColor: secondarySeries.color,
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 19,
                  fontWeight: 700,
                  color: textMuted,
                }}
              >
                {secondarySeries.label}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Animated SVG Chart */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.34" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.0" />
          </linearGradient>
          <clipPath id={`${gradId}-clip`}>
            <rect x={padL} y={0} width={Math.max(0, tip.x - padL)} height={H} />
          </clipPath>
        </defs>

        {/* Horizontal Gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padT + chartH * (1 - t);
          const v = minVal + span * t;
          const labelVal =
            Math.abs(v) >= 100 ? Math.round(v).toLocaleString("en-IN") : v.toFixed(1);
          return (
            <g key={t}>
              <line
                x1={padL}
                y1={y}
                x2={W - padR}
                y2={y}
                stroke={gridStroke}
                strokeWidth={1.2}
                strokeDasharray="5 6"
              />
              <text
                x={padL - 14}
                y={y + 6}
                textAnchor="end"
                fontFamily={FONTS.mono}
                fontSize={17}
                fill={textMuted}
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Live Vertical Crosshair */}
        <line
          x1={tip.x}
          y1={padT}
          x2={tip.x}
          y2={padT + chartH}
          stroke={accentColor}
          strokeOpacity={0.35}
          strokeWidth={1.5}
          strokeDasharray="4 4"
        />

        {/* Area Fill clipped to live tip */}
        <path
          d={areaD}
          fill={`url(#${gradId})`}
          clipPath={`url(#${gradId}-clip)`}
        />

        {/* Optional Secondary Comparison Series */}
        {secPathD && evSec && secondarySeries && (
          <>
            <path
              d={secPathD}
              fill="none"
              stroke={secondarySeries.color}
              strokeWidth={4.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={evSec.strokeDasharray}
              strokeDashoffset={evSec.strokeDashoffset}
              opacity={0.9}
            />
            {secTip && (
              <circle
                cx={secTip.x}
                cy={secTip.y}
                r={6.5}
                fill={secondarySeries.color}
                stroke="#FFFFFF"
                strokeWidth={2}
              />
            )}
          </>
        )}

        {/* Progressive Primary Smooth Line */}
        <path
          d={pathD}
          fill="none"
          stroke={accentColor}
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={evPrimary.strokeDasharray}
          strokeDashoffset={evPrimary.strokeDashoffset}
        />

        {/* X-Axis Labels */}
        {coords.map((c) => (
          <text
            key={c.label}
            x={c.x}
            y={H - 14}
            textAnchor="middle"
            fontFamily={FONTS.mono}
            fontSize={20}
            fontWeight={700}
            fill={textMuted}
          >
            {c.label}
          </text>
        ))}

        {/* Optional Inflection Callout Pin */}
        {calloutCoord && callout && (
          <g opacity={calloutSp}>
            <line
              x1={calloutCoord.x}
              y1={calloutCoord.y - 12}
              x2={calloutCoord.x}
              y2={Math.max(padT + 26, calloutCoord.y - 68)}
              stroke={accentColor}
              strokeWidth={2}
            />
            <rect
              x={Math.min(W - padR - 230, Math.max(padL, calloutCoord.x - 115))}
              y={Math.max(padT - 8, calloutCoord.y - 102)}
              width={230}
              height={36}
              rx={8}
              fill={isLight ? "#141413" : "#07090E"}
              stroke={accentColor}
              strokeWidth={2}
            />
            <text
              x={
                Math.min(W - padR - 230, Math.max(padL, calloutCoord.x - 115)) +
                115
              }
              y={Math.max(padT - 8, calloutCoord.y - 102) + 24}
              textAnchor="middle"
              fontFamily={FONTS.mono}
              fontSize={16}
              fontWeight={800}
              fill={accentColor}
            >
              {callout.label}
            </text>
          </g>
        )}

        {/* Live Pulsing Beacon Dot */}
        <circle
          cx={tip.x}
          cy={tip.y}
          r={14 + Math.sin(frame * 0.35) * 4}
          fill={`${accentColor}38`}
        />
        <circle
          cx={tip.x}
          cy={tip.y}
          r={7.5}
          fill={accentColor}
          stroke="#FFFFFF"
          strokeWidth={2.5}
        />
      </svg>

      {sourceNote && (
        <div
          style={{
            marginTop: 8,
            textAlign: "right",
            fontFamily: FONTS.mono,
            fontSize: 17,
            fontWeight: 600,
            color: textMuted,
            opacity: 0.78,
          }}
        >
          {sourceNote}
        </div>
      )}
    </div>
  );
};
