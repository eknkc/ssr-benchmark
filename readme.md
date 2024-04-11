# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | name         | ops/sec | average (ms) | samples | body (kb) | duplication | relative to react |
| ------- | ------------ | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'react'      | 760     | '1.316'      | 7602    | '97.28'   | 'x1.00'     | ''                |
| 1       | 'sveltekit'  | 600     | '1.664'      | 6010    | '184.46'  | 'x2.00'     | '1.27 x slower'   |
| 2       | 'solid'      | 595     | '1.680'      | 5952    | '215.93'  | 'x2.00'     | '1.28 x slower'   |
| 3       | 'remix'      | 467     | '2.138'      | 4677    | '189.10'  | 'x2.00'     | '1.63 x slower'   |
| 4       | 'vue'        | 308     | '3.245'      | 3082    | '96.72'   | 'x1.00'     | '2.47 x slower'   |
| 5       | 'nuxt'       | 282     | '3.537'      | 2827    | '97.57'   | 'x1.00'     | '2.70 x slower'   |
| 6       | 'next-pages' | 116     | '8.580'      | 1166    | '187.67'  | 'x2.00'     | '6.55 x slower'   |
| 7       | 'mfng'       | 68      | '14.633'     | 684     | '317.31'  | 'x2.50'     | '11.18 x slower'  |
| 8       | 'next'       | 54      | '18.324'     | 546     | '284.64'  | 'x2.00'     | '14.07 x slower'  |

- **body** is the response body length in kb
- **duplication** is the data duplication factor. 2x means each rendered data item has been observed twice in the response. It is required for hydration to work.

- Table has been updated thanks to [kiliman](https://github.com/kiliman). Remix now uses [defer](https://remix.run/docs/en/main/utils/defer) yielding much better results.
- **mfng** is a minimal RSC implementation. Important to see its results compared to Next as they both reflect the RSC rendering performance.

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
