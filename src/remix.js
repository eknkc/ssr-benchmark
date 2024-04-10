import * as remix from "remix-benchmark";
import { createRequestHandler } from "@mcansh/remix-raw-http";

export async function buildRemixHandler() {
  return createRequestHandler({
    build: remix,
    mode: remix.mode,
  });
}
