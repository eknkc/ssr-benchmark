import ReactDOMServer from "react-dom/server";
import App from "./App";

import { IncomingMessage, ServerResponse } from "http";

export async function buildHandler() {
  return async function handler(_: IncomingMessage, res: ServerResponse) {
    const stream = ReactDOMServer.renderToPipeableStream(<App />);
    res.setHeader("content-type", "text/html");
    stream.pipe(res);
  };
}
