import type { IncomingMessage, ServerResponse } from "http";
import { testData } from "testdata";

type EntryData = Awaited<ReturnType<typeof testData>>[0]

function renderEntry(entry: EntryData) {
  return `
    <tr>
      <td>${entry.id}</td>
      <td>${entry.name}</td>
    </tr>
  `
}

function renderTable(entries: EntryData[]) {
  let tableHtml = ""
  for(let i = 0; i < entries.length; i++) {
    tableHtml += renderEntry(entries[i])
  }

  return `
    <table>
      <tbody>
        ${tableHtml}
      </tbody>
    </table>
  `
}

function renderLayout(html: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vanilla</title>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `
}

export async function renderHtml() {
  const data = await testData()
  const tableHtmlString = renderTable(data)
  const html = renderLayout(tableHtmlString)
  return { html }
}

export async function buildHandler(){
  return async function handler(_: IncomingMessage, res: ServerResponse) {
    const { html } = await renderHtml()
    res.setHeader("Content-Type", "text/html")
    res.end(html)
  }
}
