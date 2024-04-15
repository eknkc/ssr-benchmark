import type { IncomingMessage, ServerResponse } from "node:http";
import template from "./template.marko";

export async function buildHandler() {
  return function handler(_: IncomingMessage, res: ServerResponse) {
    res.setHeader("content-type", "text/html");
    template.render({}, res);
  };
}
