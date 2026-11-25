import path from "node:path";
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setPublicDir("assets");
Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

Config.overrideBundlerConfig((currentConfiguration) => {
  const withTailwind = enableTailwind(currentConfiguration);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...withTailwind.resolve?.alias,
        "@config": path.resolve(process.cwd(), "config"),
        "@engine": path.resolve(process.cwd(), "engine"),
        "@components": path.resolve(process.cwd(), "components"),
        "@channels": path.resolve(process.cwd(), "channels"),
      },
    },
  };
});
