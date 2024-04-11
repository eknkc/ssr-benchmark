# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | name        | ops/sec | average (ms)       | margin   | samples | body (kb) | duplication | relative to react |
| ------- | ----------- | ------- | ------------------ | -------- | ------- | --------- | ----------- | ----------------- |
| 0       | 'react'     | 770     | 1.2980486485074243 | '±0.17%' | 11556   | '97.28'   | 'x1.00'     | ''                |
| 1       | 'sveltekit' | 617     | 1.6202060651259027 | '±0.26%' | 9259    | '184.46'  | 'x2.00'     | '1.25 x slower'   |
| 2       | 'solid'     | 600     | 1.6662520333606508 | '±0.30%' | 9003    | '215.93'  | 'x2.00'     | '1.28 x slower'   |
| 3       | 'remix'     | 471     | 2.120777278578165  | '±0.32%' | 7073    | '189.10'  | 'x2.00'     | '1.63 x slower'   |
| 4       | 'vue'       | 297     | 3.36266085586971   | '±0.96%' | 4462    | '96.72'   | 'x1.00'     | '2.59 x slower'   |
| 5       | 'nuxt'      | 279     | 3.5809983866799273 | '±0.77%' | 4189    | '97.57'   | 'x1.00'     | '2.76 x slower'   |
| 6       | 'next'      | 54      | 18.312528462526274 | '±0.59%' | 820     | '284.64'  | 'x2.00'     | '14.26 x slower'  |

- **body** is the response body length in kb
- **duplication** is the data duplication factor. 2x means each rendered data item has been observed twice in the response. It is required for hydration to work.

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
