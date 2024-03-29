// webpack.config.js
const webpack = require("webpack");
const path = require("path");
module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /node_modules\/antd\/lib\/style\/index\.less/,
      path.resolve(__dirname, "src/style/app.less")
    ),
  ],
  rules: [
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader",
        },
        {
          loader: "css-loader", // translates CSS into CommonJS
        },
        {
          loader: "less-loader", // compiles Less to CSS
          options: {
            lessOptions: {
              // If you are using less-loader@5 please spread the lessOptions to options directly
              modifyVars: {
                // "primary-color": "#1DA57A",
                // "link-color": "#1DA57A",
                // "border-radius-base": "2px",
              },
              javascriptEnabled: true,
            },
          },
        },
      ],
    },
  ],
};
