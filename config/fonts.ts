import { loadFont as loadPlusJakartaSans } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadJetBrainsMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInstrumentSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadKalam } from "@remotion/google-fonts/Kalam";
import { loadFont as loadLocalFont } from "@remotion/fonts";
import { staticFile } from "remotion";

void loadLocalFont({
  family: "PatrickHand",
  url: staticFile("fonts/PatrickHand-Regular.ttf"),
  format: "truetype",
});

const plusJakarta = loadPlusJakartaSans("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetBrainsMono = loadJetBrainsMono("normal", {
  weights: ["400", "500", "700", "800"],
  subsets: ["latin"],
});

const anton = loadAnton("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const instrumentSerif = loadInstrumentSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const kalam = loadKalam("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

/**
 * 5-Role Documentary Typography Stack:
 * - sans: Clean UI, labels, body copy (Plus Jakarta Sans)
 * - mono: Financial figures, stock tickers, dates, timestamps (JetBrains Mono)
 * - display: High-impact hook headlines & chapter titles (Anton)
 * - serif: Editorial luxury quotes, newspaper headlines, Vox/WSJ tone (Instrument Serif)
 * - hand: Whiteboard annotations, Think School / Johnny Harris callouts (Kalam)
 */
export const FONTS = {
  sans: `${plusJakarta.fontFamily}, "Plus Jakarta Sans", system-ui, sans-serif`,
  mono: `${jetBrainsMono.fontFamily}, "JetBrains Mono", ui-monospace, monospace`,
  display: `${anton.fontFamily}, "Anton", Impact, sans-serif`,
  serif: `${instrumentSerif.fontFamily}, "Instrument Serif", Georgia, serif`,
  hand: `${kalam.fontFamily}, "Kalam", "PatrickHand", cursive`,
  notes: `"PatrickHand", "Kalam", cursive`,
} as const;
