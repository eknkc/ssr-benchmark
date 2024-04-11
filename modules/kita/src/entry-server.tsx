import { renderToStream } from '@kitajs/html/suspense.js';
import { IncomingMessage, ServerResponse } from 'http';
import App from './App.js';

export function handler(_: IncomingMessage, res: ServerResponse) {
  const stream = renderToStream(App);
  res.setHeader('content-type', 'text/html');
  stream.pipe(res);
}
