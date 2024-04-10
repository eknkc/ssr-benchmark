import next from "next";

export async function buildNextHandler() {
  const app = next({ dev: false, hostname: "localhost", port: 3000, dir: "./modules/next" });
  await app.prepare();
  return app.getRequestHandler();
}
