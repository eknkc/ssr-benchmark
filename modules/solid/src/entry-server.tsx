import { renderToStream } from "solid-js/web";
import App from "./App";
import { IncomingMessage, ServerResponse } from "http";

export async function buildHandler() {
  return async function handler(_: IncomingMessage, res: ServerResponse) {
    const stream = renderToStream(() => <App />);
    res.setHeader("content-type", "text/html");
    stream.pipe(res);
  };
}
