import { render } from 'svelte/server';
import { testData } from 'testdata';
import App from './App.svelte';

const template = (html) => `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body>
		${html}
	</body>
</html>`;

export function buildHandler() {
	return async function handler(_, res) {
		const entries = await testData();

		res.writeHead(200, {
			'content-type': 'text/html'
		});

		const rendered = render(App, { props: { entries } });
		res.end(template(rendered.html));
	}
}
