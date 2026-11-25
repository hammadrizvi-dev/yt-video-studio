# DESIGN SYSTEM — Mobile-First YouTube Documentary & Tech Engine

## 1. Visual Craft Benchmarks
- **Finance Documentary (`@KamaiKitni` + `@HinExp` + `@MagnatesMedia`):** High-contrast tabular numbers (`₹300`, `₹16`), physical paper proof (`EditorialPaper`), live ink circles (`MarkerCallout`), Sankey cash splits (`FlowTree`), and India city corridor maps (`IndiaMapStage`). Alternating obsidian dark acts and warm paper proof acts via crisp `cut` transitions.
- **Tech / AI Explainer (`@TubeSenseiofficial` + `@Nafay3D` + `@DecodingYT`):** Perspective 3D cyber grid floors (`Backdrop` `horizon` mode), frosted obsidian `GlassCard` surfaces, glowing neon cyan/emerald gauges (`RadialGauge`), animated IDE/terminal code playback (`CodeWindow`), and rapid `WhipPan` / `PushThrough` camera cuts.

## 2. Strict Mobile-Readability Floors
| Canvas | Safe Area (Top / Right / Bottom / Left) | Min Label Size | Body / Card Text | Section Headline | Hero Figure |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **16:9 (`1920x1080`)** | `64 / 80 / 88 / 80` (`1760 x 928`) | `26px` | `32px–38px` | `64px–82px` | `136px–190px` |
| **9:16 (`1080x1920`)** | `240 / 120 / 460 / 72` (`888 x 1220`) | `28px` | `34px–42px` | `54px–70px` | `124px–168px` |

## 3. Pacing & Retention Rules
1. **3-Second Visual Rule:** Average scene beat is `2.5s–3.5s` (`75–105f` at `30fps`); no scene exceeds `145f` (`4.8s`) without a distinct internal visual shift.
2. **Dark ↔ Light Transition Rule:** Never fade across opposite luminance themes — always switch with a crisp `cut` (`0f`).
3. **Subtitles Off By Default:** `showCaptions: false` unless explicitly enabled with `captions` array.
