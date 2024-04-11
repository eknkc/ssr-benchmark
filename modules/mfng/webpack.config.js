import path from "path";
import {
  WebpackRscServerPlugin,
  createWebpackRscServerLoader,
  createWebpackRscSsrLoader,
  webpackRscLayerName,
} from "@mfng/webpack-rsc";

const outputDirname = path.join(process.cwd(), "dist");

/**
 * @type {import('@mfng/webpack-rsc').ClientReferencesMap}
 */
const clientReferencesMap = new Map();
const serverReferencesMap = new Map();

/**
 * @type {import('webpack').RuleSetUseItem}
 */
const serverSwcLoader = {
  loader: "swc-loader",
  options: {
    env: {
      targets: { node: 20 },
    },
    jsc: { transform: { react: { runtime: "automatic" } } },
  },
};

/**
 * @type {import('webpack').Configuration}
 */
export default {
  name: "server",
  entry: "./src/entry-server.tsx",
  target: "node",
  output: {
    filename: "index.js",
    path: outputDirname,
    libraryTarget: "module",
    chunkFormat: "module",
  },
  resolve: {
    extensions: [".tsx", "..."],
  },
  module: {
    rules: [
      {
        resource: [/\/server\/rsc\//, /\/page\.tsx$/],
        layer: webpackRscLayerName,
      },
      {
        issuerLayer: webpackRscLayerName,
        resolve: { conditionNames: ["react-server", "..."] },
      },
      {
        oneOf: [
          {
            issuerLayer: webpackRscLayerName,
            test: /\.tsx?$/,
            use: [
              createWebpackRscServerLoader({
                clientReferencesMap,
                serverReferencesMap,
              }),
              serverSwcLoader,
            ],
          },
          {
            test: /\.tsx?$/,
            use: [
              createWebpackRscSsrLoader({ serverReferencesMap }),
              serverSwcLoader,
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackRscServerPlugin({ clientReferencesMap, serverReferencesMap }),
  ],
  experiments: { outputModule: true, layers: true },
};
