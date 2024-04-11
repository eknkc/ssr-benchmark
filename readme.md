# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | name        | ops/sec | average (ms)       | margin   | samples | relative to react |
| ------- | ----------- | ------- | ------------------ | -------- | ------- | ----------------- |
| 0       | 'react'     | 808     | 1.2364279433728804 | '±0.27%' | 8088    |                   |
| 1       | 'sveltekit' | 669     | 1.493410358369333  | '±0.24%' | 6697    | '1.21 x slower'   |
| 2       | 'solid'     | 618     | 1.6168928551333819 | '±0.41%' | 6185    | '1.31 x slower'   |
| 3       | 'remix'     | 520     | 1.9216447728669677 | '±0.34%' | 5204    | '1.55 x slower'   |
| 4       | 'vue'       | 343     | 2.9093550538103106 | '±0.89%' | 3438    | '2.36 x slower'   |
| 5       | 'nuxt'      | 313     | 3.1873771370298103 | '±0.92%' | 3138    | '2.58 x slower'   |
| 6       | 'mfng'      | 73      | 13.605557669387757 | '±0.48%' | 735     | '11.07 x slower'  |
| 7       | 'next'      | 57      | 17.370618059027745 | '±0.80%' | 576     | '14.18 x slower'  |

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
