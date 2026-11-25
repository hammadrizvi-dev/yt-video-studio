import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";

export type TransitionMode = "cut" | "whip" | "push";

const WhipPanComponent: React.FC<
  TransitionPresentationComponentProps<{ direction: "left" | "right" }>
> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const eased = Easing.inOut(Easing.cubic)(presentationProgress);
  const sign = passedProps.direction === "left" ? -1 : 1;
  const offset =
    presentationDirection === "exiting"
      ? `${sign * eased * 100}%`
      : `${-sign * (1 - eased) * 100}%`;
  const scale = 1 - Math.sin(eased * Math.PI) * 0.05;

  return (
    <AbsoluteFill
      style={{
        transform: `translate3d(${offset}, 0, 0) scale(${scale})`,
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
          transform: `scale(${scale})`,
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
        transform: `scale(${scale})`,
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
