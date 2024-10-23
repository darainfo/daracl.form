const path = require("path");

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const packageJson = require("./package.json");
const topBanner = `/*!
* vender module dependency check
*/`;
process.env.TOP_BANNER = topBanner;

const exportName = "daracl.vender.min";

module.exports = {
  mode: "production",
  entry: {
    vender: "./src/indexVender.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: exportName + ".js",
    library: {
      name: ["Daracl"],
      type: "var",
    },
    libraryTarget: "umd",
  },

  optimization: {
    providedExports: true,
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$|\.tsx$/u,
        exclude: /node_modules/u,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js$|\.jsx$/u,
        exclude: /node_modules/u,
        include: path.resolve(__dirname, "src"),
        use: ["babel-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        //exclude: /node_modules/u,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"), // Prefer `dart-sass`
            },
          },
        ],
        //use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: topBanner,
      raw: true,
    }),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(packageJson.version), // 패키지 버전을 전역 변수로 설정합니다.
    }),

    new MiniCssExtractPlugin({
      filename: exportName + ".css",
    }),
  ],
};
