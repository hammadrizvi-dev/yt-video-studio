import React from "react";
import { SceneViewport } from "@engine/index";
import { EditorialLedger } from "@components/index";

export const Scene09Outro: React.FC = () => {
  return (
    <SceneViewport
      theme="finance-paper"
      backdropMode="paper"
      camera="swing-right"
      impactFrames={[34]}
    >
      <EditorialLedger
        docType="UNIT x SCALE FINAL AUDIT"
        docTitle="Annual Profit Engine"
        docCode="REF // FY26-KAMAI"
        circleRowIndex={3}
        stampText="VERIFIED"
        stampColor="#059669"
        rows={[
          { label: "Daily Order Volume", value: "25,00,000" },
          { label: "Net Margin Per Order", value: "₹16.00" },
          { label: "Daily Net Profit", value: "₹4.0 Crore" },
          { label: "Annual Compounding Profit", value: "₹1,460 Cr", highlight: true },
        ]}
      />
    </SceneViewport>
  );
};
