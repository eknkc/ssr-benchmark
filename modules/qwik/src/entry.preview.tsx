/*
 * WHAT IS THIS FILE?
 *
 * It's the bundle entry point for `npm run preview`.
 * That is, serving your app built in production mode.
 *
 * Feel free to modify this file, but don't remove it!
 *
 * Learn more about Vite's preview command:
 * - https://vitejs.dev/config/preview-options.html#preview-options
 *
 */
import { renderToStream } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { testData } from "testdata";
/**
 * The default export is the QwikCity adapter used by Vite preview.
 */
// some fixes for ssr-benchmark
export async function handler(req: any, res: any) {
  res.writeHead(200, {
    "content-type": "text/html",
  });

  const data = await testData();

  const app = await renderToStream(<Root data={data} />, {
    stream: {
      write: (chunk) => {
        res.write(chunk);
      },
    },
    manifest,
    // ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      // ...opts.containerAttributes,
    },
  });
  res.end("");
}

export default handler;
