import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "@config/fonts";
import { getSafeZone } from "@config/safeZones";

export interface TimedWord {
  word: string;
  start: number;
  end: number;
}

export interface CaptionEngineProps {
  showCaptions?: boolean;
  words?: TimedWord[];
  accentColor?: string;
}

/**
 * Optional YT-Punch captions placed strictly ABOVE YouTube UI danger zones.
 * Disabled cleanly by default (showCaptions = false).
 */
export const CaptionEngine: React.FC<CaptionEngineProps> = ({
  showCaptions = false,
  words = [],
  accentColor = "#FBBF24",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  if (!showCaptions || words.length === 0) {
    return null;
  }

  const sz = getSafeZone(width, height);
  const currentSec = frame / fps;
  const activeIdx = words.findIndex(
    (w) => currentSec >= w.start && currentSec <= w.end + 0.12,
  );
  if (activeIdx === -1) return null;

  const chunkStart = Math.max(0, activeIdx - (activeIdx % 3));
  const chunk = words.slice(chunkStart, chunkStart + 3);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: sz.left,
          right: sz.right,
          bottom: sz.bottom + 14,
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {chunk.map((item, i) => {
          const isCurrent = chunkStart + i === activeIdx;
          return (
            <span
              key={`${item.word}-${chunkStart + i}`}
              style={{
                fontFamily: FONTS.sans,
                fontSize: sz.isVertical ? 46 : 42,
                fontWeight: 900,
                padding: "8px 18px",
                borderRadius: 12,
                backgroundColor: isCurrent
                  ? accentColor
                  : "rgba(4, 7, 16, 0.84)",
                color: isCurrent ? "#040710" : "#FFFFFF",
                boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
