import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";

const plusJakarta = loadPlusJakartaSans("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetBrainsMono = loadJetBrainsMono("normal", {
  weights: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

export const FONTS = {
  sans: `${plusJakarta.fontFamily}, "Plus Jakarta Sans", system-ui, sans-serif`,
  mono: `${jetBrainsMono.fontFamily}, "JetBrains Mono", ui-monospace, monospace`,
} as const;
