# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | name         | ops/sec | average (ms) | samples | body (kb) | duplication | relative to react |
| ------- | ------------ | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'react'      | 780     | '1.281'      | 7804    | '97.28'   | 'x1.00'     | ''                |
| 1       | 'sveltekit'  | 611     | '1.634'      | 6119    | '184.46'  | 'x2.00'     | '1.28 x slower'   |
| 2       | 'solid'      | 587     | '1.702'      | 5875    | '215.93'  | 'x2.00'     | '1.33 x slower'   |
| 3       | 'remix'      | 464     | '2.151'      | 4650    | '189.10'  | 'x2.00'     | '1.68 x slower'   |
| 4       | 'vue'        | 309     | '3.227'      | 3099    | '96.72'   | 'x1.00'     | '2.52 x slower'   |
| 5       | 'nuxt'       | 282     | '3.539'      | 2826    | '97.57'   | 'x1.00'     | '2.77 x slower'   |
| 6       | 'next-pages' | 115     | '8.682'      | 1152    | '187.67'  | 'x2.00'     | '6.78 x slower'   |
| 7       | 'astro'      | 108     | '9.232'      | 1084    | '99.91'   | 'x1.00'     | '7.22 x slower'   |
| 8       | 'mfng'       | 68      | '14.529'     | 689     | '317.31'  | 'x2.50'     | '11.47 x slower'  |
| 9       | 'next'       | 54      | '18.432'     | 543     | '284.64'  | 'x2.00'     | '14.44 x slower'  |

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
