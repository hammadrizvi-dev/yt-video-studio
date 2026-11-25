# TOOLKIT & SKILL CATALOG (`D:\yt-video-studio`)

Saare Remotion packages, GitHub motion-graphics toolkits, aur AI coding skills cleanly separated folders mein installed hain so kuch bhi aapke core engine/channels code ko ganda na kare:

## 1. Remotion 4.0.547 + 3D & Motion Packages (`package.json`)
- **Core Video & Timeline:** `remotion@4.0.547`, `@remotion/cli`, `@remotion/player`, `@remotion/transitions`, `@remotion/media`, `@remotion/captions`, `@remotion/zod-types` (`zod` live sidebar controls)
- **Paths, Noise, Fonts & Motion:** `@remotion/paths`, `@remotion/noise`, `@remotion/shapes`, `@remotion/google-fonts`, `@remotion/fonts` (loads local TTFs from `assets/fonts/`), `@remotion/animation-utils`, `@remotion/motion-blur`, `@remotion/lottie`, `@remotion/gif`, `@remotion/animated-emoji`, `gsap`, `remotion-bits`
- **Full 3D / Shader Stack (Opt-In via [Stage3D.tsx](file:///D:/yt-video-studio/components/visuals/Stage3D.tsx)):** `@remotion/three`, `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`
- **Python Audio Beat Sync:** `librosa` via [tools/analyze-beats.py](file:///D:/yt-video-studio/tools/analyze-beats.py) (`npm run analyze-beats -- assets/bgm/finance-case.mp3`)

## 2. Installed GitHub Toolkits (`D:\yt-video-studio\toolkits\`)
| Folder | Source Repo | Purpose |
| :--- | :--- | :--- |
| `toolkits/video-shotcraft/` | `Vincentwei1021/video-shotcraft` | 124 Remotion shot recipe cards, aesthetic rules, beat sync, sound design & Motion Workbench |
| `toolkits/lemo-opuscar/` | `lemomo-ai/lemo-opuscar` | 99 visual film styles, `DIRECTOR.md`, `TECHNIQUE.md` & code-rendered film kits |
| `toolkits/pixelfx/` | `patch-gg/pixelfx` | 244 programmable pixel & shader FX recipes |
| `toolkits/animation-base/` | `JohnHeibel/ClaudeAnimationBase` | Hand-painted p5.js + `p5.brush` character animation & 31 acted emotions |
| `toolkits/opus-prompts/` | `joeseesun/opus-video-prompts` | 54 copy-ready code-rendered video prompt cases |
| `toolkits/hyperframes/` | `heygen-com/hyperframes` | HTML/GSAP video authoring themes, design specs & Remotion migration reference |
| `toolkits/diagram-design/` | `cathrynlavery/diagram-design` | 52 editorial HTML+SVG diagram templates & contrast validators |

## 3. Wired Agent Skills (`D:\yt-video-studio\.agents\skills\`)
- **Official Remotion Suite (14 skills from `remotion-dev/skills`):** `remotion-best-practices`, `remotion-elements`, `remotion-captions`, `remotion-create`, `remotion-docs`, `remotion-interactivity`, `remotion-license`, `remotion-maps`, `remotion-markup`, `remotion-multimedia`, `remotion-render`, `remotion-saas`, `remotion-studio`, `remotion-upgrade`
- **Video & Motion Craft:** `video-shotcraft`, `lemo-opuscar`, `pixelfx`, `diagram-design`, `hyperframes`, `reverse-any-video`, `remotion-to-hyperframes`, `style-sampling`, `slideshow`
- **UI, Storytelling & Engineering Quality:** `motionsites-web-builder` (`Motionsites-AI/claude-skill`), `humanizer` (`blader/humanizer`), `addyosmani-skills` (`addyosmani/agent-skills`)
