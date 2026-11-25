import React from "react";
import { SceneViewport } from "@engine/index";
import { EditorialNewspaper } from "@components/index";

export const Scene06NewsAudit: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-paper"
      backdropMode="paper"
      camera="drift-in"
      impactFrames={[28]}
    >
      <EditorialNewspaper
        sourceName="INDIA BUSINESS AUDIT"
        dateLabel="FY26 FILING"
        headline="Delivery Platforms Keep Just 5.3% Net Profit Per ₹300 Order"
        highlightPhrase="5.3% Net Profit"
        excerpt="Chhota unit margin tabhi bada banta hai jab roz 25 Lakh+ orders ek hi network par repeat hote hain."
        stampText="THIN MARGIN"
        stampColor="#DC2626"
      />
    </SceneViewport>
  );
};
