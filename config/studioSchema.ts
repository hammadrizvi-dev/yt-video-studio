import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const StudioEpisodeSchema = z.object({
  hasVoiceOverride: z.boolean().default(false),
  voiceFileOverride: z.string().nullable().default(null),
  showCaptions: z.boolean().default(false),
  debugSafeZone: z.boolean().default(false),
  progressColor: zColor().optional(),
});

export type StudioEpisodeProps = z.infer<typeof StudioEpisodeSchema>;
