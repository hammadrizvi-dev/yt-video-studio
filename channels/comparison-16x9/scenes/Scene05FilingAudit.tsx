import React from "react";
import { SceneViewport } from "@engine/index";
import { DocumentSpotlight } from "@components/index";

export const Scene05FilingAudit: React.FC = () => {
  return (
    <SceneViewport
      theme="vox-editorial"
      backdropMode="paper"
      camera="ken-burns"
      impactFrames={[42]}
    >
      <DocumentSpotlight
        sourceTag="Q2 FY27 SEGMENT EARNINGS AUDIT"
        filingDate="SEP 2026 QUARTER"
        headline="Food Delivery Is Profitable for Both — Quick Commerce Decides the Winner"
        bodyBefore="In Q2 FY27, Zomato's food delivery earned ₹647 Cr EBITDA while Swiggy's food arm posted ₹341 Cr. The real split happened in 10-minute delivery:"
        highlightedClaim="Blinkit generated ₹488 Cr positive EBITDA while Instamart posted an ₹895 Cr EBITDA loss"
        bodyAfter="as dense mature stores turned into an ad and throughput engine."
        handNote="Density turns dark stores from cash burn into cash flow!"
        stampText="VERIFIED FILING"
        stampColor="#B91C1C"
        highlightColor="#FACC15"
        citationFooter="Sources: Eternal Q2 FY27 Results (Entrackr / Kotak Neo, Oct 2026) & Swiggy Q2 FY27 Analysis (MECE, Oct 2026)."
      />
    </SceneViewport>
  );
};
