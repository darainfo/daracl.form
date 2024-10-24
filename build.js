const esbuild = require("esbuild");

const { sassPlugin } = require("esbuild-sass-plugin");

// webpack 에서 external 처리 한 모듈 빌드시 추가
const common = require("./webpack.common.js");
let externalItems = [];
for (let externalKey in common.externals) {
  externalItems.push(externalKey);
}

const baseConfig = {
  entryPoints: ["src/index.js"],
  outdir: "dist",
  bundle: true,
  sourcemap: true,
  plugins: [sassPlugin()],
  external: externalItems,
};

Promise.all([
  // 한번은 cjs
  esbuild.build({
    ...baseConfig,
    format: "cjs",
    outExtension: {
      ".js": ".cjs",
    },
  }),

  // 한번은 esm
  esbuild.build({
    ...baseConfig,
    format: "esm",
  }),
]).catch(() => {
  console.log("Build failed");
  process.exit(1);
});
