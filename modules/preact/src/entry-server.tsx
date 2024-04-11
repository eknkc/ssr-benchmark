import { renderToStringAsync } from 'preact-render-to-string';
import { Readable } from 'node:stream';
import { App } from "./App";

import { IncomingMessage, ServerResponse } from "http";

export async function buildHandler() {
  return async function handler(_: IncomingMessage, res: ServerResponse) {
    const html = await renderToStringAsync(await App());

    res.setHeader("content-type", "text/html");
    Readable.from(html).pipe(res);
  };
}
