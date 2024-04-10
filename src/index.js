import { Bench } from "tinybench";
import { IncomingMessage, ServerResponse } from "./http.js";
import { buildRemixHandler } from "./remix.js";
import { buildNextHandler } from "./next.js";
import http from "node:http";

export async function run(handler) {
  const request = new IncomingMessage();
  const response = new ServerResponse(request);

  handler(request, response);

  await response.await;
  return response.times;
}

const bench = new Bench({ time: 10_000 });

const handlers = [
  {
    name: "solid",
    handler: await import("solid-benchmark").then((x) => x.buildHandler()),
  },
  {
    name: "react",
    handler: await import("react-benchmark").then((x) => x.buildHandler()),
  },
  {
    name: "vue",
    handler: await import("vue-benchmark").then((x) => x.buildHandler()),
  },
  { name: "remix", handler: await buildRemixHandler() },
  { name: "next", handler: await buildNextHandler() },
];

for (let handler of handlers) {
  bench.add(handler.name, async () => {
    await run(handler.handler);
  });
}

await bench.warmup();
await bench.run();

const results = bench
  .table()
  .map((x) => ({ ...x, "ops/sec": parseInt(x["ops/sec"]) }))
  .toSorted((a, b) => b["ops/sec"] - a["ops/sec"]);

const maxOps = Math.max(...results.map((x) => x["ops/sec"]));
console.table(
  results.map((x, i) => ({
    ...x,
    [`relative to ${results[0]["Task Name"]}`]:
      i === 0 ? "" : `${(maxOps / parseInt(x["ops/sec"])).toFixed(2)} x slower`,
  }))
);
console.log();

console.log("Check out the actual render results:");

for (let handler of handlers) {
  console.log(handler.name, `http://localhost:8080/${handler.name}`);
}

http
  .createServer(async function (req, res) {
    const handler = handlers.find((x) => "/" + x.name == req.url);

    if (handler) {
      req.url = "/";
      handler.handler(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(8080);
