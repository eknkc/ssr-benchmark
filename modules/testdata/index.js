const data = Array(1000)
  .fill(0)
  .map((_, i) => ({
    id: crypto.randomUUID(),
    name: crypto.randomUUID(),
  }));

export function testData() {
  return new Promise((res) => setImmediate(() => res(data)));
}
