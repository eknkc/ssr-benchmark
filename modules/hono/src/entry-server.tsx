import App from './App'
import { Hono } from 'hono'
import { getRequestListener } from '@hono/node-server'

const app = new Hono()
app.get('*', (c) => {
  return c.html(<App />)
})

export async function buildHandler() {
  return getRequestListener(app.fetch)
}
