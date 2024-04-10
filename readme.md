# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | Task Name | ops/sec | Average Time (ns)  | Margin   | Samples | relative to react |
| ------- | --------- | ------- | ------------------ | -------- | ------- | ----------------- |
| 0       | 'react'   | 769     | 1299941.9410284825 | '±0.26%' | 7693    |                   |
| 1       | 'solid'   | 569     | 1755197.9212101486 | '±0.37%' | 5698    | '1.35 x slower'   |
| 2       | 'remix'   | 453     | 2205641.5302142412 | '±0.43%' | 4534    | '1.70 x slower'   |
| 3       | 'vue'     | 310     | 3224929.1229540207 | '±1.10%' | 3101    | '2.48 x slower'   |
| 4       | 'next'    | 53      | 18768490.901360147 | '±0.74%' | 533     | '14.51 x slower'  |

- Table has been updated thanks to [kiliman](https://github.com/kiliman). Remix now uses [defer](https://remix.run/docs/en/main/utils/defer) yielding much better results.

## Test Environment

- Only SSR. We do not even build the client bundles for most of the modules.
- Next.JS route cache is disabled using `const dynamic = 'force-dynamic'`. (Otherwise we would be benchmarking a static http server because there is no dynamic code like accessing cookies.)
- Instead of going through the http server, the benchmark code creates mock http requests and responses. This ensures that we do not pay for tcp overhead.
- Tests ran on Node.JS `v20.6.1` on my Macbook Pro M1 Pro
- Each framework renders a table of 1000 rows, each containing two uuid columns.
- The table data is emulated as async and requires Suspense on react, solid and vue. On Next it is loaded in an async RSC component. On Remix it is loaded in a route `loader` function.
- Streaming rendering used on solid, react and vue.

## Running

```sh
$ npm install
$ npm run build
$ npm start
```
