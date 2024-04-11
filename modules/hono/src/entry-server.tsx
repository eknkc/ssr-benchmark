import App from './App'
import { Hono } from 'hono'
import { getRequestListener } from '@hono/node-server'

const app = new Hono()

app.get('/', async (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <App />
      </body>
    </html>
  )
})

export async function buildHandler() {
  return getRequestListener(app.fetch)
}
