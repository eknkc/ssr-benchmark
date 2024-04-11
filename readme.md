# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | name        | ops/sec | average (ms)       | margin   | samples | relative to react |
| ------- | ----------- | ------- | ------------------ | -------- | ------- | ----------------- |
| 0       | 'react'     | 770     | 1.297837667238734  | '±0.25%' | 7706    |                   |
| 1       | 'sveltekit' | 612     | 1.6316538886157232 | '±0.30%' | 6129    | '1.26 x slower'   |
| 2       | 'solid'     | 589     | 1.6975613133730456 | '±0.40%' | 5891    | '1.31 x slower'   |
| 3       | 'remix'     | 467     | 2.137902762121296  | '±0.41%' | 4678    | '1.65 x slower'   |
| 4       | 'vue'       | 297     | 3.365587217730757  | '±1.17%' | 2972    | '2.59 x slower'   |
| 5       | 'nuxt'      | 290     | 3.445951336749581  | '±0.95%' | 2902    | '2.66 x slower'   |
| 6       | 'next'      | 54      | 18.410872874233654 | '±0.83%' | 544     | '14.26 x slower'  |

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
