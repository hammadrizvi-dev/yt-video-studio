import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";
import { MarkerCallout } from "../typography/MarkerCallout";

const StampBadge: React.FC<{
  text: string;
  color: string;
  delay: number;
}> = ({ text, color, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.7 },
  });
  const scale = interpolate(sp, [0, 1], [1.9, 1]);

  return (
    <div
      style={{
        position: "absolute",
        right: 36,
        bottom: 28,
        padding: "10px 24px",
        borderRadius: 8,
        border: `4px solid ${color}`,
        color,
        fontFamily: FONTS.mono,
        fontSize: 30,
        fontWeight: 900,
        letterSpacing: "0.14em",
        transform: `rotate(-8deg) scale(${scale})`,
        opacity: Math.min(1, sp * 1.6),
        backgroundColor: "rgba(255,255,255,0.72)",
        zIndex: 5,
      }}
    >
      {text}
    </div>
  );
};

export interface EditorialNewspaperProps {
  sourceName: string;
  dateLabel?: string;
  headline: string;
  highlightPhrase?: string;
  excerpt?: string;
  stampText?: string;
  stampColor?: string;
}

export const EditorialNewspaper: React.FC<EditorialNewspaperProps> = ({
  sourceName,
  dateLabel = "VERIFIED REPORT",
  headline,
  highlightPhrase,
  excerpt,
  stampText,
  stampColor = "#DC2626",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 125 } });
  const sweep = interpolate(frame, [14, 38], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const renderHeadline = () => {
    if (!highlightPhrase) return headline;
    const idx = headline.toLowerCase().indexOf(highlightPhrase.toLowerCase());
    if (idx === -1) return headline;
    const before = headline.slice(0, idx);
    const match = headline.slice(idx, idx + highlightPhrase.length);
    const after = headline.slice(idx + highlightPhrase.length);

    return (
      <>
        {before}
        <span style={{ position: "relative", display: "inline-block", padding: "0 8px" }}>
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: "6%",
              height: "46%",
              width: `${sweep}%`,
              backgroundColor: "#FDE047",
              zIndex: 0,
              borderRadius: 4,
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>{match}</span>
        </span>
        {after}
      </>
    );
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1120,
        backgroundColor: "#FBF7EE",
        color: "#18181B",
        borderRadius: 12,
        padding: "40px 52px",
        boxShadow: "0 28px 64px rgba(0,0,0,0.28)",
        border: "1.5px solid #D6CFC2",
        overflow: "hidden",
        opacity: enter,
        transform: `translate3d(0, ${(1 - enter) * 32}px, 0) rotate(-0.8deg)`,
      }}
    >
      <Img
        src={staticFile("textures/user-paper-warm.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.38,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "4px solid #18181B",
          borderBottom: "2px solid #18181B",
          padding: "10px 0",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: "0.14em",
          }}
        >
          {sourceName}
        </span>
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 22,
            fontWeight: 700,
            color: "#52525B",
          }}
        >
          {dateLabel}
        </span>
      </div>

      <div
        style={{
          position: "relative",
          fontFamily: FONTS.sans,
          fontSize: 56,
          fontWeight: 900,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          marginBottom: excerpt ? 22 : 0,
        }}
      >
        {renderHeadline()}
      </div>

      {excerpt && (
        <div
          style={{
            position: "relative",
            fontFamily: FONTS.sans,
            fontSize: 32,
            fontWeight: 600,
            lineHeight: 1.4,
            color: "#3F3F46",
            maxWidth: "84%",
          }}
        >
          {excerpt}
        </div>
      )}

      {stampText && <StampBadge text={stampText} color={stampColor} delay={28} />}
    </div>
  );
};

export interface LedgerRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface EditorialLedgerProps {
  docType: string;
  docTitle: string;
  docCode: string;
  rows: LedgerRow[];
  circleRowIndex?: number;
  stampText?: string;
  stampColor?: string;
}

export const EditorialLedger: React.FC<EditorialLedgerProps> = ({
  docType,
  docTitle,
  docCode,
  rows,
  circleRowIndex,
  stampText,
  stampColor = "#059669",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 130 } });

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1020,
        backgroundColor: "#FAF4E8",
        color: "#1C1917",
        borderRadius: 12,
        padding: "36px 48px",
        boxShadow: "0 28px 64px rgba(0, 0, 0, 0.28)",
        border: "1.5px solid #D6CFC2",
        overflow: "hidden",
        opacity: enter,
        transform: `translate3d(0, ${(1 - enter) * 32}px, 0) rotate(-0.8deg)`,
      }}
    >
      <Img
        src={staticFile("textures/user-paper-warm.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.34,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "3px solid #1C1917",
          paddingBottom: 14,
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 20,
              fontWeight: 800,
              color: "#B45309",
              letterSpacing: "0.14em",
            }}
          >
            {docType}
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 44,
              fontWeight: 900,
            }}
          >
            {docTitle}
          </div>
        </div>
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 20,
            fontWeight: 700,
            color: "#57534E",
          }}
        >
          {docCode}
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 14 }}>
        {rows.map((r, idx) => {
          const rSp = spring({
            frame: Math.max(0, frame - (6 + idx * 5)),
            fps,
            config: { damping: 14, stiffness: 150 },
          });
          const isCircled = circleRowIndex === idx;
          return (
            <div
              key={r.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 22px",
                borderRadius: 10,
                backgroundColor: r.highlight
                  ? "rgba(5, 150, 105, 0.12)"
                  : "rgba(28, 25, 23, 0.05)",
                opacity: rSp,
                transform: `translate3d(${(1 - rSp) * 20}px, 0, 0)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#292524",
                }}
              >
                {r.label}
              </span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: r.highlight ? 44 : 36,
                  fontWeight: 900,
                  color: r.highlight ? "#047857" : "#1C1917",
                }}
              >
                {isCircled ? (
                  <MarkerCallout kind="circle" color="#DC2626" startFrame={24}>
                    {r.value}
                  </MarkerCallout>
                ) : (
                  r.value
                )}
              </span>
            </div>
          );
        })}
      </div>

      {stampText && <StampBadge text={stampText} color={stampColor} delay={34} />}
    </div>
  );
};
