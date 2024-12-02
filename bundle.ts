import * as esbuild from "https://deno.land/x/esbuild@v0.24.0/mod.js";
import { denoPlugins } from "@luca/esbuild-deno-loader";

esbuild.build({
   plugins: [...denoPlugins()],
   entryPoints: ["mod.ts"],
   outdir: "dist",
   bundle: true,
   platform: "browser",
   format: "esm",
   target: "esnext",
   minify: true,
   sourcemap: true,
}).then(() => {Deno.exit()});
