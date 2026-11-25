import React from "react";
import { SceneViewport } from "@engine/index";
import { CodeWindow, PunchHeadline } from "@components/index";

const CODE_LINES = [
  "from ai_router import KeyPool",
  "",
  "# 7 Groq + 7 Gemini Free Keys (Auto Cooldown)",
  "pool = KeyPool(failover=True)",
  "res = pool.ask('Build interactive analytics engine')",
  "print(res.tokens_per_sec)  # -> 500 tok/s | Cost: ₹0",
];

export const Scene04CodeLive: React.FC = () => {
  return (
    <SceneViewport theme="tech-obsidian" backdropMode="grid" camera="swing-right">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <PunchHeadline
          text="5 LINES MEIN AUTO-FAILOVER PIPELINE"
          highlightWords={["5", "LINES", "AUTO-FAILOVER"]}
          highlightColor="#38F2FF"
          fontSize={66}
          align="center"
        />

        <CodeWindow
          title="ai_router/failover_pool.py"
          lines={CODE_LINES}
          accentColor="#38F2FF"
          fontSize={30}
        />
      </div>
    </SceneViewport>
  );
};
