export function logResultsTable(bench) {
  const table = bench.tasks.map((task) => ({
    name: task.name,
    "ops/sec": task.result.error
      ? "NaN"
      : parseInt(task.result.hz.toString(), 10).toString(),
    "average (ms)": task.result.error ? "NaN" : task.result.mean.toFixed(3),
    samples: task.result.error ? "NaN" : task.result.samples.length,
    "body (kb)": task.result.error
      ? "NaN"
      : (task.result.bodyLength / 1024).toFixed(2),
    duplication: task.result.error
      ? "NaN"
      : `x${task.result.duplicationFactor.toFixed(2)}`,
  }));

  const results = table
    .map((x) => ({ ...x, "ops/sec": parseFloat(x["ops/sec"]) }))
    .toSorted((a, b) => b["ops/sec"] - a["ops/sec"]);

  const maxOps = Math.max(...results.map((x) => x["ops/sec"]));

  console.table(
    results.map((x, i) => ({
      ...x,
      [`relative to ${results[0]["name"]}`]:
        i === 0
          ? ""
          : `${(maxOps / parseInt(x["ops/sec"])).toFixed(2)} x slower`,
    }))
  );
}

export function getDuplicationFactor(body) {
  let samples = {};
  let matches = body.matchAll(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi
  );

  for (let match of matches) {
    samples[match[0]] = (samples[match[0]] ?? 0) + 1;
  }

  let values = Object.values(samples);
  return Array.from(values).reduce((a, b) => a + b, 0) / values.length;
}
