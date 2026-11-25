import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const epId = (args[0] || "").toLowerCase();
if (!epId) {
  console.error("Usage: npm run new-ep -- <epId> [--channel finance|tech|shorts]");
  process.exit(1);
}

let channel = epId.startsWith("sh") ? "shorts" : "finance";
for (let i = 1; i < args.length; i++) {
  if (args[i] === "--channel" && args[i + 1]) {
    channel = args[++i].toLowerCase();
  }
}

const root = process.cwd();
const epAssetsDir = path.join(root, "assets", "episodes", epId);
const folderName = `${epId}-${channel}-${channel === "shorts" ? "9x16" : "16x9"}`;
const chDir = path.join(root, "channels", folderName);

fs.mkdirSync(epAssetsDir, { recursive: true });
fs.mkdirSync(path.join(chDir, "scenes"), { recursive: true });

const writeIfMissing = (p, content) => {
  if (!fs.existsSync(p)) fs.writeFileSync(p, content, "utf-8");
};

writeIfMissing(path.join(epAssetsDir, "script.md"), `# ${epId.toUpperCase()} (${channel})\n`);
writeIfMissing(path.join(epAssetsDir, "mood.md"), `# Mood (${epId.toUpperCase()})\n`);
writeIfMissing(path.join(epAssetsDir, "transcript.json"), "[]\n");

const isShort = channel === "shorts";
writeIfMissing(
  path.join(chDir, "episode.meta.json"),
  JSON.stringify(
    {
      episodeId: epId,
      channel,
      compositionId: `${epId.toUpperCase()}${channel}`,
      title: `Episode ${epId.toUpperCase()}`,
      fps: 30,
      width: isShort ? 1080 : 1920,
      height: isShort ? 1920 : 1080,
      hasVoice: false,
      voiceFile: null,
      transitionFrames: isShort ? 8 : 9,
      scenes: [
        { id: "s01-hook", durationInFrames: 90, cutMode: "whip", isLight: false },
      ],
    },
    null,
    2,
  ) + "\n",
);

console.log(`✅ Scaffolded channel ${path.relative(root, chDir)} and assets/episodes/${epId}`);
