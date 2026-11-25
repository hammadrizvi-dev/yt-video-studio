# D:\yt-video-studio — Workspace Rules (`GEMINI.md`)

1. **Strict Separation of Folders:** Keep `config/`, `assets/`, `engine/`, `components/`, `channels/`, `toolkits/`, `.agents/skills/`, `tools/`, `docs/`, and `src/` strictly separated by role. Never dump compositions or episode files into `src/` or duplicate audio folders inside `assets/`.
2. **Safe Area Law:** Every scene MUST wrap content inside `<SafeCanvas>` (`engine/SafeCanvas.tsx`) so nothing ever clips into YouTube 16:9 seekbars or 9:16 Shorts captions/right-action zones.
3. **Toolkits & Skills:** See [docs/TOOLKIT_CATALOG.md](file:///D:/yt-video-studio/docs/TOOLKIT_CATALOG.md) for the installed Remotion 4.0.547 + R3F 3D packages, `video-shotcraft`, `lemo-opuscar`, `pixelfx`, `animation-base`, `diagram-design`, `hyperframes`, `opus-prompts`, `motionsites-web-builder`, `humanizer`, and 14 official Remotion skills inside `.agents/skills/`.
4. **No Fake Voiceover:** Keep `hasVoice: false`, `voiceFile: null` until real `voice.wav` is imported from `D:\Audio` via `--send-to-ep`.
5. **No Auto-Render:** Never run `npx remotion render` or `npx remotion still` unless explicitly requested by the user.
6. **Always Verify:** Run `npm run lint`, `npm run build`, and `npm run check` after changes.
