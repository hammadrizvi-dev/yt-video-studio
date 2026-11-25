import React from "react";
import { SceneViewport } from "@engine/index";
import { FlowTree, GlassCard, PunchHeadline } from "@components/index";

export const Scene05CashFlow: React.FC = () => {
  return (
    <SceneViewport theme="finance-dark" backdropMode="horizon" camera="drift-in">
      <GlassCard accentColor="#F59E0B" width="100%" padding="38px 46px">
        <div style={{ marginBottom: 22 }}>
          <PunchHeadline
            text="₹300 KA COMPLETE MONEY FLOW"
            highlightWords={["MONEY", "FLOW"]}
            highlightColor="#FBBF24"
            fontSize={62}
            align="left"
          />
        </div>

        <FlowTree
          sourceLabel="ORDER BILL"
          sourceValue="₹300"
          primaryColor="#F59E0B"
          targets={[
            { label: "Restaurant", value: "₹186", pct: 62, color: "#F59E0B" },
            { label: "Rider Payout", value: "₹48", pct: 16, color: "#38BDF8" },
            { label: "GST & Ops", value: "₹50", pct: 17, color: "#FB7185" },
            { label: "App Profit", value: "₹16", pct: 5, color: "#10B981" },
          ]}
        />
      </GlassCard>
    </SceneViewport>
  );
};
