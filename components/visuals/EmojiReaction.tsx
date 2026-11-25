import React from "react";
import { AnimatedEmoji, EmojiName } from "@remotion/animated-emoji";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface EmojiReactionProps {
  emoji: EmojiName;
  size?: number;
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * Animated Fluent/Noto emoji badge driven deterministically by Remotion frame.
 * Powered by @remotion/animated-emoji.
 */
export const EmojiReaction: React.FC<EmojiReactionProps> = ({
  emoji,
  size = 112,
  delay = 4,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sp = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 11, stiffness: 185, mass: 0.7 },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: Math.min(1, sp * 1.5),
        transform: `scale(${0.4 + 0.6 * sp})`,
        ...style,
      }}
    >
      <AnimatedEmoji
        emoji={emoji}
        style={{ width: size, height: size }}
      />
    </div>
  );
};
