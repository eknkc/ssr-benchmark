import App from "./App";
import { Hono } from "hono";
import { renderToReadableStream } from "hono/jsx/streaming";
import { getRequestListener } from "@hono/node-server";

const app = new Hono();

app.get("/", async (c) => {
  return c.body(
    renderToReadableStream(
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <App />
        </body>
      </html>
    ),
    {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Transfer-Encoding": "chunked",
      },
    }
  );
});

export async function buildHandler() {
  return getRequestListener(app.fetch);
}
