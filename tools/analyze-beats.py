#!/usr/bin/env python3
"""
Extract BPM, exact beat frames, and musical onset drops from any BGM/audio file
using librosa so Remotion scene transitions & impact shakes snap to the beat.

Usage:
  python tools/analyze-beats.py assets/bgm/finance-case.mp3 --fps 30
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import librosa


def main() -> int:
    parser = argparse.ArgumentParser(description="Analyze audio beats for Remotion sync")
    parser.add_argument("audio", help="Path to mp3/wav inside assets/")
    parser.add_argument("--fps", type=int, default=30, help="Video FPS (default: 30)")
    parser.add_argument("--max-seconds", type=float, default=45.0, help="Max duration to analyze")
    parser.add_argument("--out", default="", help="Optional output JSON path")
    args = parser.parse_args()

    audio_path = Path(args.audio)
    if not audio_path.exists():
        print(f"File not found: {audio_path}")
        return 1

    y, sr = librosa.load(str(audio_path), duration=args.max_seconds)
    tempo, beat_frames_idx = librosa.beat.beat_track(y=y, sr=sr)
    beat_times = librosa.frames_to_time(beat_frames_idx, sr=sr)

    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onset_idx = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, wait=12)
    onset_times = librosa.frames_to_time(onset_idx, sr=sr)

    bpm = float(tempo[0] if hasattr(tempo, "__len__") else tempo)
    payload = {
        "file": str(audio_path).replace("\\", "/"),
        "fps": args.fps,
        "bpm": round(bpm, 2),
        "beatFrames": [int(round(t * args.fps)) for t in beat_times],
        "onsetImpactFrames": [int(round(t * args.fps)) for t in onset_times],
    }

    if args.out:
        out_path = Path(args.out)
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
        print(f"Wrote beat markers -> {out_path} ({bpm:.1f} BPM, {len(payload['beatFrames'])} beats)")
    else:
        print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
