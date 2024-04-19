import init from 'uhtml/ssr';
import { testData } from "testdata";

const { document, render, html } = init();
document.documentElement.setAttribute('lang', 'en');

const tr = ({ id, name }) => html`<tr><td>${id}</td><td>${name}</td></tr>`;

export const handler = async (_, res) => {
  const data = await testData();
  render(document.body, html`<table>${data.map(tr)}</table>`);
  res.end(document.toString());
};
