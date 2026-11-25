import React from "react";
import { SceneViewport } from "@engine/index";
import { ChapterTitleCard } from "@components/index";

export const Scene01ActHook: React.FC = () => {
  return (
    <SceneViewport
      theme="documentary-noir"
      backdropMode="editorial-dark"
      camera="dramatic-pull"
      impactFrames={[2]}
    >
      <ChapterTitleCard
        chapterNumber="03"
        actLabel="CASE STUDY 03 · BUSINESS MODEL WAR"
        title="ZOMATO VS SWIGGY"
        subtitle="Same food delivery market, same 10-minute race — why did one post ₹125 Cr profit while the other lost ₹922 Cr?"
        metadataTags={["NSE: ETERNAL", "NSE: SWIGGY", "Q2 FY27 FILINGS"]}
        accentColor="#EAB308"
      />
    </SceneViewport>
  );
};
