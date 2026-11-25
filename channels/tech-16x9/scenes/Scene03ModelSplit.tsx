import React from "react";
import { SceneViewport } from "@engine/index";
import { FlowTree, GlassCard, PunchHeadline } from "@components/index";

export const Scene03ModelSplit: React.FC = () => {
  return (
    <SceneViewport theme="tech-obsidian" backdropMode="horizon" camera="drift-in">
      <GlassCard accentColor="#38F2FF" width="100%" padding="38px 46px">
        <div style={{ marginBottom: 20 }}>
          <PunchHeadline
            text="SMART TASK ROUTING TREE"
            highlightWords={["SMART", "ROUTING"]}
            highlightColor="#38F2FF"
            fontSize={62}
            align="left"
          />
        </div>

        <FlowTree
          sourceLabel="ROUTER POOL"
          sourceValue="14 KEYS"
          primaryColor="#38F2FF"
          targets={[
            { label: "Deep Context (Gemini)", value: "1M TOKENS", pct: 45, color: "#38BDF8" },
            { label: "Live Stream (Groq)", value: "500 TOK/S", pct: 35, color: "#FBBF24" },
            { label: "Clean Code (Claude)", value: "PRECISION", pct: 20, color: "#34D399" },
          ]}
        />
      </GlassCard>
    </SceneViewport>
  );
};
