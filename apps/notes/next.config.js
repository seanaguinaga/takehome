const withNx = require("@nrwl/next/plugins/with-nx");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = withNx({
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    iconSizes: [],
    domains: ["lh3.googleusercontent.com"],
    path: "/_next/image",
    loader: "default",
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(
              __dirname,
              "../../node_modules/ionicons/dist/ionicons/svg"
            ),
            to: path.join(__dirname, "public/svg"),
          },
        ],
      })
    );
    return config;
  },
  target: "serverless",
  projectRoot: __dirname,
  reactStrictMode: true,
  experimental: {
    reactMode: "concurrent",
  },
});
