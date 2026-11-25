import fs from "node:fs";
import path from "node:path";

const epId = (process.argv[2] || "").toLowerCase();
if (!epId) {
  console.error("Usage: npm run sync-ep -- <epId>");
  process.exit(1);
}

const root = process.cwd();
const epAssetsDir = path.join(root, "assets", "episodes", epId);
const channelsDir = path.join(root, "channels");

let matchedMetaPath = null;
for (const folder of fs.readdirSync(channelsDir)) {
  const p = path.join(channelsDir, folder, "episode.meta.json");
  if (!fs.existsSync(p)) continue;
  const meta = JSON.parse(fs.readFileSync(p, "utf-8"));
  if (String(meta.episodeId).toLowerCase() === epId) {
    matchedMetaPath = p;
    break;
  }
}

if (!matchedMetaPath) {
  console.error(`❌ No channel found with episodeId=${epId}`);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(matchedMetaPath, "utf-8"));
const wavPath = path.join(epAssetsDir, "voice.wav");
const mp3Path = path.join(epAssetsDir, "voice.mp3");

if (fs.existsSync(wavPath)) {
  meta.hasVoice = true;
  meta.voiceFile = `episodes/${epId}/voice.wav`;
} else if (fs.existsSync(mp3Path)) {
  meta.hasVoice = true;
  meta.voiceFile = `episodes/${epId}/voice.mp3`;
} else {
  meta.hasVoice = false;
  meta.voiceFile = null;
}

fs.writeFileSync(matchedMetaPath, JSON.stringify(meta, null, 2) + "\n", "utf-8");
console.log(
  `✅ Synced ${epId} -> ${path.relative(root, matchedMetaPath)} (hasVoice=${meta.hasVoice}, voiceFile=${meta.voiceFile})`,
);
