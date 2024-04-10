# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | name        | ops/sec | average (ms)       | margin   | samples | relative to react |
| ------- | ----------- | ------- | ------------------ | -------- | ------- | ----------------- |
| 0       | 'react'     | 772     | 1.2943212499250736 | '±0.29%' | 7727    |                   |
| 1       | 'sveltekit' | 609     | 1.640519383463647  | '±0.30%' | 6096    | '1.27 x slower'   |
| 2       | 'solid'     | 573     | 1.7426678530948465 | '±0.42%' | 5739    | '1.35 x slower'   |
| 3       | 'remix'     | 463     | 2.1593855976646634 | '±0.38%' | 4632    | '1.67 x slower'   |
| 4       | 'vue'       | 312     | 3.1983727098159376 | '±1.07%' | 3127    | '2.47 x slower'   |
| 5       | 'next'      | 53      | 18.85410655846928  | '±0.85%' | 531     | '14.57 x slower'  |

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
