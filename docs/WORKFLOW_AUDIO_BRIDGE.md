# WORKFLOW: `D:\Audio` ↔ `D:\yt-video-studio` Audio Bridge

## Pillar Split
- **`D:\Audio`** — Script splitting (`phase1_split_script.py`), `-14 LUFS` 48kHz PCM WAV mastering (`phase2_master.py`), `faster-whisper` alignment (`phase3_transcribe.py`), and direct export (`run_pipeline.py --send-to-ep <epId>`).
- **`D:\yt-video-studio`** — All Remotion `16:9` (`channels/finance-16x9`, `channels/tech-16x9`) and `9:16` (`channels/shorts-9x16`) compositions.

## Audio Export Contract
Running `python D:\Audio\scripts\run_pipeline.py --preset finance|tech --tighten-pauses --send-to-ep <epId>` delivers:
- `D:\yt-video-studio\assets\episodes\<epId>\voice.wav`
- `D:\yt-video-studio\assets\episodes\<epId>\transcript.json`
- `D:\yt-video-studio\assets\episodes\<epId>\mood.md`
- `D:\yt-video-studio\assets\episodes\<epId>\script.md`

Then inside `D:\yt-video-studio`:
1. `npm run sync-ep -- <epId>` updates `channels/<channel>/episode.meta.json` (`hasVoice: true`, `voiceFile: "episodes/<epId>/voice.wav"`, proportional scene frame timings, and SFX cues).
2. `npm run check` audits all channels, assets, 3s pacing rules, and audio readiness.
3. `npm run dev` opens Remotion Studio at `http://localhost:3000`.
