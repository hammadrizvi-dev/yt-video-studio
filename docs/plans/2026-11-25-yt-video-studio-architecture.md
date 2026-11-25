# D:\yt-video-studio — Architecture & Separation Spec

**Date:** 2026-11-25  
**Goal:** A clean, lag-free, mobile-first YouTube video production engine where every concern owns its own top-level folder — zero tangled monoliths, zero orphaned demo files, and strict YouTube safe-area bounds.

---

## 1. Strict Folder-Per-Job Layout

| Folder | Single Responsibility | Must NOT Contain |
| :--- | :--- | :--- |
| `docs/` | Design system, audio bridge spec, architectural plans | Code or asset binaries |
| `config/` | Themes, typography (`@remotion/google-fonts`), safe-zone math (`16:9` & `9:16`), unified audio lookup | UI JSX or React components |
| `assets/` | Remotion `publicDir` (`bgm/`, `sfx/`, `illustrations/`, `textures/`, `brands/`, `lottie/`, `fonts/`, `episodes/<id>/`) | Duplicate SFX/audio trees or code |
| `engine/` | Core runtime: `SafeCanvas`, `SceneViewport`, `CameraRig`, `Backdrop`, `AudioEngine`, `Transitions`, `CaptionEngine` | Channel scripts or hardcoded episode text |
| `components/` | Pure reusable UI blocks split into `typography/`, `surfaces/`, `charts/`, `visuals/` | Episode timing or audio tracks |
| `channels/` | Independent shows (`finance-16x9/`, `tech-16x9/`, `shorts-9x16/`) each with `scenes/`, `episode.meta.json`, `storyboard.md`, and Composition | Shared engine code |
| `tools/` | CLI automation (`new-episode.mjs`, `sync-episode.mjs`, `check-studio.mjs`) | Remotion JSX scenes |
| `src/` | Thin entry point (`index.ts`, `styles.css`, `Root.tsx`) registering `LongForm-16x9` and `Shorts-9x16` | Scenes or business logic |

---

## 2. Fixes for Prior Studio Failures

1. **Bottom Overflow in `9:16` Shorts Fixed mathematically:**
   - Old `remotion-bits` `<Scene3D>` centered its origin at `50%` (`y = 960`), letting `1180px` panels spill past `y = 1460` (bottom Shorts captions/title danger zone).
   - New `<SafeCanvas>` explicitly enforces top/bottom/left/right margins (`9:16`: top `240px`, right `120px`, bottom `460px`, left `72px` -> safe box `888 x 1220` centered at `y = 850`; `16:9`: top `64px`, right `80px`, bottom `88px`, left `80px` -> safe box `1760 x 928`).
2. **Smooth 30fps Live Studio Preview:**
   - Removed WebGL `<ThreeCanvas>`, removed 6-sample `<CameraMotionBlur>`, removed simultaneous multi-Step `Scene3D` mounting (which kept all 5 heavy scenes mounted at once), and removed DOM-measuring `@remotion/rough-notation` inside transformed cards.
   - Replaced with `<TransitionSeries>` (only active + transitioning scene mounted) + `<SceneViewport>` GPU 3D perspective camera entry + deterministic `@remotion/paths` SVG hand-drawn callouts (`MarkerCallout`).
3. **Aspect-Ratio-Aware Particles (`CoinShower`):**
   - Replaces hardcoded pixel `x: 960, area: 1300` with responsive `[0..1]` percentage emitter mapped to `useVideoConfig()` width & height so `9:16` Shorts never push particles off-screen.
4. **No Fake Voiceover:**
   - All demo compositions run cleanly with `hasVoice: false`, `voiceFile: null` until the creator drops real `voice.wav` via `D:\Audio\scripts\run_pipeline.py --send-to-ep <id>`.
