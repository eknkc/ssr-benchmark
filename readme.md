# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Frameworks

| (index) | name         | ops/sec | average (ms) | samples | body (kb) | duplication | relative to react |
| ------- | ------------ | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'react'      | 779     | '1.283'      | 7793    | '97.28'   | 'x1.00'     | ''                |
| 1       | 'sveltekit'  | 607     | '1.647'      | 6073    | '184.46'  | 'x2.00'     | '1.28 x slower'   |
| 2       | 'remix'      | 462     | '2.163'      | 4624    | '189.10'  | 'x2.00'     | '1.69 x slower'   |
| 3       | 'nuxt'       | 198     | '5.040'      | 1985    | '201.05'  | 'x2.00'     | '3.93 x slower'   |
| 4       | 'next-pages' | 114     | '8.766'      | 1141    | '187.67'  | 'x2.00'     | '6.83 x slower'   |
| 5       | 'astro'      | 105     | '9.447'      | 1059    | '99.91'   | 'x1.00'     | '7.42 x slower'   |
| 6       | 'mfng'       | 68      | '14.609'     | 685     | '317.31'  | 'x2.50'     | '11.46 x slower'  |
| 7       | 'next'       | 53      | '18.578'     | 539     | '284.64'  | 'x2.00'     | '14.70 x slower'  |

- **react** is here only as a baseline renderer to compare framework performance with.

## Renderers

| (index) | name    | ops/sec | average (ms) | samples | body (kb) | duplication | relative to marko |
| ------- | ------- | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'marko' | 6678    | '0.150'      | 66784   | '96.74'   | 'x1.00'     | ''                |
| 1       | 'kita'  | 3151    | '0.317'      | 31518   | '97.34'   | 'x1.00'     | '2.12 x slower'   |
| 2       | 'hono'  | 948     | '1.054'      | 9486    | '97.15'   | 'x1.00'     | '7.04 x slower'   |
| 3       | 'react' | 775     | '1.289'      | 7760    | '97.28'   | 'x1.00'     | '8.62 x slower'   |
| 4       | 'solid' | 616     | '1.622'      | 6167    | '215.93'  | 'x2.00'     | '10.84 x slower'  |
| 5       | 'vue'   | 289     | '3.458'      | 2892    | '96.72'   | 'x1.00'     | '23.11 x slower'  |

- **solid** is here but it also carries hydration data for client side hydration, it is more comparable to frameworks in that way.

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
