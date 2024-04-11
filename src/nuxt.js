import { handler } from 'nuxt-benchmark/.output/server/index.mjs';

export async function buildNuxtHandler() {
  return handler;
}
