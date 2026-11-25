import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";

export type TransitionMode = "cut" | "whip" | "push" | "wipe";

const WhipPanComponent: React.FC<
  TransitionPresentationComponentProps<{ direction: "left" | "right" }>
> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const eased = Easing.inOut(Easing.cubic)(presentationProgress);
  const sign = passedProps.direction === "left" ? -1 : 1;
  const offset =
    presentationDirection === "exiting"
      ? `${sign * eased * 100}%`
      : `${-sign * (1 - eased) * 100}%`;
  const velocityPeak = Math.sin(eased * Math.PI);
  const scaleX = 1 + velocityPeak * 0.06;
  const scaleY = 1 - velocityPeak * 0.03;

  return (
    <AbsoluteFill
      style={{
        transform: `translate3d(${offset}, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`,
        willChange: "transform",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export function whipPan(direction: "left" | "right" = "left"): TransitionPresentation<{
  direction: "left" | "right";
}> {
  return {
    component: WhipPanComponent,
    props: { direction },
  };
}

const PushThroughComponent: React.FC<
  TransitionPresentationComponentProps<Record<string, never>>
> = ({ children, presentationDirection, presentationProgress }) => {
  const eased = Easing.inOut(Easing.cubic)(presentationProgress);

  if (presentationDirection === "exiting") {
    const scale = 1 + eased * 0.28;
    const opacity = 1 - eased;
    return (
      <AbsoluteFill
        style={{
          transform: `scale(${scale.toFixed(4)})`,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  const scale = 0.88 + eased * 0.12;
  const opacity = eased;
  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale.toFixed(4)})`,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

export function pushThrough(): TransitionPresentation<Record<string, never>> {
  return {
    component: PushThroughComponent,
    props: {},
  };
}

const WipeRevealComponent: React.FC<
  TransitionPresentationComponentProps<{ direction: "left" | "right"; accentColor: string }>
> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const eased = Easing.inOut(Easing.cubic)(presentationProgress);
  const pct = (eased * 100).toFixed(2);

  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill
        style={{
          opacity: 1 - eased * 0.25,
          transform: `scale(${(1 - eased * 0.03).toFixed(4)})`,
          willChange: "transform, opacity",
        }}
      >
        {children}
      </AbsoluteFill>
    );
  }

  const clipPath =
    passedProps.direction === "left"
      ? `inset(0 0 0 ${(100 - eased * 100).toFixed(2)}%)`
      : `inset(0 ${(100 - eased * 100).toFixed(2)}% 0 0)`;

  const edgeLeft =
    passedProps.direction === "left" ? `${100 - eased * 100}%` : `${pct}%`;

  return (
    <AbsoluteFill style={{ clipPath, willChange: "clip-path" }}>
      {children}
      {eased > 0.02 && eased < 0.98 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: edgeLeft,
            width: 5,
            backgroundColor: passedProps.accentColor,
            boxShadow: `0 0 24px ${passedProps.accentColor}`,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export function wipeReveal(
  direction: "left" | "right" = "left",
  accentColor = "#EAB308",
): TransitionPresentation<{ direction: "left" | "right"; accentColor: string }> {
  return {
    component: WipeRevealComponent,
    props: { direction, accentColor },
  };
}
