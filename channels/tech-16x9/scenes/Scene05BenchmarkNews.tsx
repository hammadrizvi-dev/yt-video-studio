import React from "react";
import { SceneViewport } from "@engine/index";
import { EditorialNewspaper } from "@components/index";

export const Scene05BenchmarkNews: React.FC = () => {
  return (
    <SceneViewport
      theme="tech-studio"
      backdropMode="paper"
      camera="drift-in"
      impactFrames={[28]}
    >
      <EditorialNewspaper
        sourceName="SOLO BUILDER BENCHMARK"
        dateLabel="2026 REPORT"
        headline="Indie Devs Cut Monthly AI API Spend By 94% Using Local Key Routers"
        highlightPhrase="Cut Monthly AI API Spend By 94%"
        excerpt="Rate-limit hit hone par engine bina crash huye turant agle backup key par switch ho jaata hai."
        stampText="94% SAVED"
        stampColor="#059669"
      />
    </SceneViewport>
  );
};
