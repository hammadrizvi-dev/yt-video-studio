import React, { useCallback } from "react";
import { Sequence, interpolate, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import {
  AUDIO_MIX,
  SFX_DEFAULT_DURATIONS,
  SFX_FILES,
  SFX_VOLUMES,
  SfxKind,
} from "@config/audioMap";

export interface SfxCue {
  frame: number;
  type: SfxKind;
  file?: string;
  volume?: number;
  durationInFrames?: number;
  label?: string;
}

export interface BgmSegment {
  from: number;
  durationInFrames?: number;
  file: string;
  baseVolume?: number;
  fadeInFrames?: number;
  fadeOutFrames?: number;
}

export interface ChapterBoostRange {
  from: number;
  to: number;
}

export interface AudioEngineProps {
  hasVoice: boolean;
  voiceFile?: string | null;
  bgmSegments?: BgmSegment[];
  chapterRanges?: ChapterBoostRange[];
  sfxCues?: SfxCue[];
}

const BgmAudioTrack: React.FC<{
  segment: BgmSegment;
  totalDuration: number;
  chapterRanges: ChapterBoostRange[];
}> = ({ segment, totalDuration, chapterRanges }) => {
  const segLen = segment.durationInFrames ?? Math.max(1, totalDuration - segment.from);
  const fadeInFrames = segment.fadeInFrames ?? 15;
  const fadeOutFrames = segment.fadeOutFrames ?? 24;
  const baseVol = segment.baseVolume ?? AUDIO_MIX.BGM_NORMAL;

  const computeVol = useCallback(
    (localFrame: number): number => {
      const globalFrame = segment.from + localFrame;
      let target = baseVol;

      for (const r of chapterRanges) {
        if (globalFrame >= r.from && globalFrame <= r.to) {
          const rampUp = interpolate(
            globalFrame,
            [r.from, r.from + 12],
            [baseVol, AUDIO_MIX.BGM_CHAPTER],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const rampDown = interpolate(
            globalFrame,
            [r.to - 12, r.to],
            [AUDIO_MIX.BGM_CHAPTER, baseVol],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          target = Math.max(target, Math.min(rampUp, rampDown));
        }
      }

      const fadeIn =
        fadeInFrames > 0
          ? interpolate(localFrame, [0, fadeInFrames], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 1;
      const outStart = Math.max(0, segLen - fadeOutFrames);
      const fadeOut =
        fadeOutFrames > 0
          ? interpolate(localFrame, [outStart, segLen], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 1;

      return target * fadeIn * fadeOut;
    },
    [baseVol, chapterRanges, fadeInFrames, fadeOutFrames, segLen, segment.from],
  );

  const track = <Audio src={staticFile(segment.file)} loop volume={computeVol} />;
  if (segment.from === 0) {
    return <Sequence durationInFrames={segLen}>{track}</Sequence>;
  }
  return (
    <Sequence from={segment.from} durationInFrames={segLen}>
      {track}
    </Sequence>
  );
};

export const AudioEngine: React.FC<AudioEngineProps> = ({
  hasVoice,
  voiceFile,
  bgmSegments = [],
  chapterRanges = [],
  sfxCues = [],
}) => {
  const { durationInFrames } = useVideoConfig();

  const shouldPlayVoice =
    Boolean(hasVoice) &&
    typeof voiceFile === "string" &&
    voiceFile.trim().length > 0;

  return (
    <>
      {shouldPlayVoice && voiceFile && (
        <Audio src={staticFile(voiceFile)} volume={AUDIO_MIX.VOICE} />
      )}

      {bgmSegments.map((seg, i) => (
        <BgmAudioTrack
          key={`${seg.file}-${i}`}
          segment={seg}
          totalDuration={durationInFrames}
          chapterRanges={chapterRanges}
        />
      ))}

      {sfxCues.map((cue, idx) => {
        const startFrame = Math.max(0, Math.round(cue.frame));
        if (startFrame >= durationInFrames) return null;

        const maxLen = durationInFrames - startFrame;
        const cueDuration = Math.min(
          cue.durationInFrames ?? SFX_DEFAULT_DURATIONS[cue.type],
          maxLen,
        );
        if (cueDuration <= 0) return null;

        const file = cue.file || SFX_FILES[cue.type];
        const vol = cue.volume ?? SFX_VOLUMES[cue.type];

        const node = <Audio src={staticFile(file)} volume={vol} />;
        if (startFrame === 0) {
          return (
            <Sequence key={`${cue.type}-${idx}`} durationInFrames={cueDuration}>
              {node}
            </Sequence>
          );
        }
        return (
          <Sequence
            key={`${cue.type}-${idx}`}
            from={startFrame}
            durationInFrames={cueDuration}
          >
            {node}
          </Sequence>
        );
      })}
    </>
  );
};
