import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const channelsDir = path.join(root, "channels");
const assetsDir = path.join(root, "assets");
const componentsDir = path.join(root, "components");
const engineDir = path.join(root, "engine");

const REQUIRED_SFX = [
  "slam.mp3",
  "whoosh-deep.mp3",
  "whoosh-soft.mp3",
  "riser_short.mp3",
  "pop.wav",
  "coin_clink.mp3",
  "marker-draw.mp3",
  "newspaper-open.mp3",
  "paper-slide.mp3",
  "typewriter-keys.mp3",
  "soft-hit.mp3",
  "sub-hit.mp3",
];

const REQUIRED_BGM = [
  "finance-case.mp3",
  "finance-warm.mp3",
  "tech-explainer.mp3",
  "tech-lofi.mp3",
];

const REQUIRED_TEXTURES = [
  "film-grain.png",
  "user-editorial-dark.jpg",
  "user-dotted-dark.jpg",
  "user-paper-warm.jpg",
];

const REQUIRED_ILLUSTRATIONS = [
  "food-delivery-hero.jpg",
  "indian-delivery-rider.jpg",
  "restaurant-kitchen.jpg",
  "solo-dev-desk.jpg",
  "ai-server-cluster.jpg",
];

const BROADCAST_COMPONENTS = [
  "comparison/SplitVersusBoard.tsx",
  "comparison/VerdictScorecard.tsx",
  "charts/StockTickerChart.tsx",
  "case-study/TimelineRail.tsx",
  "case-study/DocumentSpotlight.tsx",
  "typography/ChapterTitleCard.tsx",
];

let errors = 0;

function checkAsset(relPath) {
  const full = path.join(assetsDir, relPath);
  if (fs.existsSync(full)) {
    const kb = (fs.statSync(full).size / 1024).toFixed(1);
    console.log(`  ✅ assets/${relPath} (${kb} KB)`);
    return true;
  }
  errors++;
  console.log(`  ❌ Missing assets/${relPath}`);
  return false;
}

console.log("\n🎬 YT Video Studio v3.0 — 9/10 Broadcast Audit");
console.log("────────────────────────────────────────────────────────");

console.log("\n🔊 Core Assets (BGM, SFX, Textures, Illustrations):");
for (const b of REQUIRED_BGM) checkAsset(`bgm/${b}`);
for (const s of REQUIRED_SFX) checkAsset(`sfx/${s}`);
for (const t of REQUIRED_TEXTURES) checkAsset(`textures/${t}`);
for (const img of REQUIRED_ILLUSTRATIONS) checkAsset(`illustrations/${img}`);

console.log("\n🧩 9/10 Broadcast Components & Engine Polish:");
let broadcastReady = 0;
for (const comp of BROADCAST_COMPONENTS) {
  const ok = fs.existsSync(path.join(componentsDir, comp));
  console.log(`  ${ok ? "✅" : "❌"} components/${comp}`);
  if (ok) broadcastReady++;
  else errors++;
}
const hasFilmOverlay = fs.existsSync(path.join(engineDir, "FilmOverlay.tsx"));
console.log(`  ${hasFilmOverlay ? "✅" : "❌"} engine/FilmOverlay.tsx (35mm Grain + Vignette)`);
if (!hasFilmOverlay) errors++;

console.log("\n🧰 Installed Toolkits & Skills:");
const toolkitsDir = path.join(root, "toolkits");
const skillsDir = path.join(root, ".agents", "skills");
const toolkitCount = fs.existsSync(toolkitsDir)
  ? fs.readdirSync(toolkitsDir).filter((d) => fs.statSync(path.join(toolkitsDir, d)).isDirectory()).length
  : 0;
const skillCount = fs.existsSync(skillsDir)
  ? fs.readdirSync(skillsDir).filter((d) => fs.statSync(path.join(skillsDir, d)).isDirectory()).length
  : 0;
console.log(`  ✅ toolkits/: ${toolkitCount} modular repo packs`);
console.log(`  ✅ .agents/skills/: ${skillCount} agent skills wired`);

console.log("\n📺 Channels Audit:");
let channelCount = 0;
let allFastPaced = true;

for (const folder of fs.readdirSync(channelsDir).sort()) {
  const chDir = path.join(channelsDir, folder);
  if (!fs.existsSync(chDir) || !fs.statSync(chDir).isDirectory()) continue;
  const metaPath = path.join(chDir, "episode.meta.json");
  if (!fs.existsSync(metaPath)) {
    errors++;
    console.log(`  ❌ Missing ${folder}/episode.meta.json`);
    continue;
  }

  channelCount++;
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  const epId = meta.episodeId;
  const epAssetsDir = path.join(assetsDir, "episodes", epId);
  const fps = meta.fps || 30;
  const scenes = Array.isArray(meta.scenes) ? meta.scenes : [];

  const totalFrames = scenes.reduce((s, x) => s + (x.durationInFrames || 0), 0);
  const sec = totalFrames / fps;
  const avgBeat = scenes.length ? sec / scenes.length : 0;
  const slowBeats = scenes.filter((s) => (s.durationInFrames || 0) >= fps * 5);

  const hasScript = fs.existsSync(path.join(epAssetsDir, "script.md"));
  const hasTranscript = fs.existsSync(path.join(epAssetsDir, "transcript.json"));
  const hasMood = fs.existsSync(path.join(epAssetsDir, "mood.md"));
  const hasVoice =
    fs.existsSync(path.join(epAssetsDir, "voice.wav")) ||
    fs.existsSync(path.join(epAssetsDir, "voice.mp3"));

  if (!hasScript || !hasTranscript || !hasMood) errors++;
  if (slowBeats.length > 0) {
    errors++;
    allFastPaced = false;
  }

  console.log(
    `  • ${folder} [${meta.compositionId} | ${meta.width}x${meta.height}] -> ${scenes.length} beats (${sec.toFixed(1)}s, avg ${avgBeat.toFixed(2)}s/beat) | Voice: ${hasVoice ? "READY" : "DEMO (skipped cleanly)"} | Slow>=5s: ${slowBeats.length}`,
  );
}

// Compute Studio Quality Score (out of 10)
let score = 5.0;
if (hasFilmOverlay) score += 1.0;
score += (broadcastReady / BROADCAST_COMPONENTS.length) * 2.5;
if (allFastPaced && channelCount >= 4) score += 1.0;
if (errors === 0) score += 0.5;
score = Math.min(10, score);

console.log("────────────────────────────────────────────────────────");
console.log(`⭐ Studio Quality Score: ${score.toFixed(1)} / 10.0`);
if (errors > 0) {
  console.error(`❌ Studio audit failed with ${errors} issue(s).`);
  process.exit(1);
}
console.log("✅ Studio audit passed cleanly! Run: npm run dev\n");
