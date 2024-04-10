import { renderToNodeStream } from "vue/server-renderer";
import { createApp } from "./main";
import { IncomingMessage, ServerResponse } from "node:http";

export async function buildHandler() {
  return async function handler(_: IncomingMessage, res: ServerResponse) {
    const { app } = createApp();
    const ctx = {};

    const stream = renderToNodeStream(app, ctx);
    res.setHeader("content-type", "text/html");
    stream.pipe(res);
  };
}
