# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little more complex than just printing `hello world`.

## Frameworks

| (index) | name         | ops/sec | average (ms) | samples | body (kb) | duplication | relative to react |
| ------- | ------------ | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'react'      | 766     | '1.305'      | 7663    | '97.28'   | 'x1.00'     | ''                |
| 1       | 'sveltekit'  | 589     | '1.696'      | 5898    | '184.46'  | 'x2.00'     | '1.30 x slower'   |
| 2       | 'remix'      | 449     | '2.224'      | 4497    | '189.10'  | 'x2.00'     | '1.71 x slower'   |
| 3       | 'nuxt'       | 381     | '2.622'      | 3814    | '201.12'  | 'x2.00'     | '2.01 x slower'   |
| 4       | 'qwik-city'  | 278     | '3.584'      | 2790    | '139.21'  | 'x1.00'     | '2.76 x slower'   |
| 5       | 'next-pages' | 104     | '9.590'      | 1043    | '187.67'  | 'x2.00'     | '7.37 x slower'   |
| 6       | 'astro'      | 99      | '10.077'     | 993     | '99.91'   | 'x1.00'     | '7.74 x slower'   |
| 7       | 'mfng'       | 69      | '14.372'     | 696     | '317.31'  | 'x2.50'     | '11.10 x slower'  |
| 8       | 'next'       | 53      | '18.673'     | 536     | '284.64'  | 'x2.00'     | '14.45 x slower'  |

- **react** is here only as a baseline renderer to compare framework performance with.
- ⚠️ **duplication** is the data duplication factor. 2x means each rendered data item has been observed twice in the response. It is required for hydration to work. For those it is 1x, the hydration data is missing.

## Renderers

| (index) | name    | ops/sec | average (ms) | samples | body (kb) | duplication | relative to marko |
| ------- | ------- | ------- | ------------ | ------- | --------- | ----------- | ----------------- |
| 0       | 'marko' | 6675    | '0.150'      | 66759   | '96.74'   | 'x1.00'     | ''                |
| 1       | 'kita'  | 3074    | '0.325'      | 30742   | '97.34'   | 'x1.00'     | '2.17 x slower'   |
| 2       | 'hono'  | 945     | '1.058'      | 9452    | '97.15'   | 'x1.00'     | '7.06 x slower'   |
| 3       | 'vue'   | 897     | '1.114'      | 8977    | '96.72'   | 'x1.00'     | '7.44 x slower'   |
| 4       | 'react' | 764     | '1.308'      | 7649    | '97.28'   | 'x1.00'     | '8.74 x slower'   |
| 5       | 'qwik'  | 622     | '1.605'      | 6230    | '137.88'  | 'x1.00'     | '10.73 x slower'  |
| 6       | 'solid' | 613     | '1.630'      | 6137    | '215.93'  | 'x2.00'     | '10.89 x slower'  |

- **solid** is here but it also carries hydration data for client side hydration, it is more comparable to frameworks in that way.
- **body** is the response body length in kb

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
