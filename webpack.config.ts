import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default () => {
  return {
    entry: "./test-app/index.tsx",
    mode: "development",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.[jt]sx?$/,
          loader: "esbuild-loader",
          options: {
            target: "es2015",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    devServer: {
      port: 9000,
      open: true,
      historyApiFallback: true,
      hot: true,
      proxy: {
        "/sarex-backend": {
          target: "https://stage.sarex.io",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: { "^/sarex-backend": "" },
          headers: {
            Connection: "keep-alive",
            referer: "https://stage.sarex.io",
          },
        },
        "/sarex-gateway": {
          target: "https://stage-api.sarex.io/gateway",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          pathRewrite: { "^/sarex-gateway": "" },
          headers: {
            Connection: "keep-alive",
            referer: "https://stage-api.sarex.io/gateway",
          },
        },
      },
    },
  };
};
