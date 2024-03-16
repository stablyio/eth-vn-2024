const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /^node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "../tsconfig.json",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" }, // to inject the result into the DOM as a style block
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3001,
  },
};
