import { createRscAppStream } from "@mfng/core/server/rsc";
import { createHtmlStream } from "@mfng/core/server/ssr";
import { IncomingMessage, ServerResponse } from "http";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";
import { Page } from "./page";

export async function buildHandler() {
  return async function handler(_: IncomingMessage, res: ServerResponse) {
    const rscAppStream = createRscAppStream(<Page />, {
      reactClientManifest: {},
    });

    const htmlStream = await createHtmlStream(rscAppStream, {
      reactSsrManifest: {},
    });

    res.setHeader("content-type", "text/html; charset=utf-8");
    Readable.fromWeb(htmlStream as ReadableStream<Uint8Array>).pipe(res);
  };
}
