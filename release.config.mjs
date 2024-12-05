export default {
   branches: ["main"],
   plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      [
         "@semantic-release/changelog",
         {
            changelogFile: "CHANGELOG.md",
         },
      ],
      [
         "@semantic-release/changelog",
         {
            changelogFile: "./dist/CHANGELOG.md",
         },
      ],
      [
         "semantic-release-replace-plugin",
         {
            replacements: [
               {
                  files: ["./dist/package.json"],
                  from: "dist/index",
                  to: "index",
                  results: [
                     {
                        file: "./dist/package.json",
                        hasChanged: true,
                        numMatches: 3,
                        numReplacements: 3,
                     },
                  ],
                  countMatches: true,
               },
            ],
         },
      ],
      [
         "semantic-release-replace-plugin",
         {
            replacements: [
               {
                  files: ["jsr.json"],
                  from: '"version": ".*"',
                  to: '"version": "${nextRelease.version}"',
                  results: [
                     {
                        file: "jsr.json",
                        hasChanged: true,
                        numMatches: 1,
                        numReplacements: 1,
                     },
                  ],
                  countMatches: true,
               },
            ],
         },
      ],
      [
         "@semantic-release/npm",
         {
            pkgRoot: "dist",
         },
      ],
      [
         "@semantic-release/npm",
         {
            npmPublish: false,
         },
      ],
      [
         "@semantic-release/git",
         {
            assets: ["CHANGELOG.md", "package.json", "jsr.json", "dist/**/*", "coverage/**/*"],
         },
      ],
      [
         "@semantic-release/github",
         {
            assets: [
               {
                  path: "dist/index.js",
                  label: "JavaScript Distribution (CommonJS)",
               },
               {
                  path: "dist/index.mjs",
                  label: "JavaScript Distribution (ESM)",
               },
               {
                  path: "dist/index.d.ts",
                  label: "JavaScript Distribution (Types)",
               },
            ],
         },
      ],
      "@sebbo2002/semantic-release-jsr",
   ],
};
