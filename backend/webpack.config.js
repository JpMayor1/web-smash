import webpack from "webpack";
import path from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";

// Helper function to get __dirname equivalent in ES modules
const __dirname = path.resolve(); // This sets __dirname to the current working directory

export default {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "build"), // Use path.join for correct path construction
    filename: "index.js",
  },
  target: "node",

  resolve: {
    fallback: {
      fsevents: false,
    },
  },
  ignoreWarnings: [
    {
      module: /mongodb\/lib\/deps\.js/,
      message: /Can't resolve/,
    },
    {
      module: /ws\/lib\//,
      message: /Can't resolve/,
    },
  ],
  plugins: [
    new webpack.ContextReplacementPlugin(
      /express[/\\]lib/,
      path.join(__dirname, "node_modules") // Use path.join here as well
    ),
    new webpack.ContextReplacementPlugin(
      /nunjucks[/\\]src/,
      path.join(__dirname, "node_modules") // Use path.join here as well
    ),
    new CopyWebpackPlugin({
      patterns: [{ from: "public", to: "public" }],
    }),
  ],
};
