# SSR Framework Benchmark

This is an experiment in response to https://twitter.com/thdxr/status/1777782835249553517 where it is stated that Next.JS is a lot slower on server side rendering compared to Vanilla React.

This is not a comprehensive or scientific test. Just wanted to compare each in a setup a little complex than just printing `hello world`.

## Results

| (index) | Task Name | ops/sec | Average Time (ns) | Margin   | Samples |
| ------- | --------- | ------- | ----------------- | -------- | ------- |
| 0       | 'solid'   | '547'   | 1825861           | '±0.31%' | 10954   |
| 1       | 'react'   | '227'   | 4392914           | '±0.27%' | 4553    |
| 2       | 'remix'   | '163'   | 6133631           | '±0.58%' | 3261    |
| 3       | 'vue'     | '116'   | 8617705           | '±0.80%' | 2321    |
| 4       | 'next'    | '54'    | 18511079          | '±0.58%' | 1081    |

- It looks like Next.JS is around 5 times slower than vanilla react ssr. My previous [results](https://twitter.com/eknkc/status/1777807651235069964) only had a single `<span>hello world</span>` so I guess Next.JS has a large initialization coefficient. When the layout / data goes complex it starts catching up.
- Solid does a great job. It is not just a lot faster, it also embeds the hydration data into the html so it should be compared to remix / next instead of vanilla react or vue.

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
$ node src/index.js
```
