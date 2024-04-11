import { Readable, Writable } from "node:stream";

export class IncomingMessage extends Readable {
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;

  readable = false;

  constructor() {
    super();
  }

  get rawHeaders() {
    return [""];
  }

  get rawTrailers() {
    return [];
  }

  setTimeout(_msecs, _callback) {
    return this;
  }

  get headersDistinct() {
    return {};
  }

  get trailersDistinct() {
    return {};
  }
}

const decoder = new TextDecoder();

export class ServerResponse extends Writable {
  _res;

  body;
  length = 0;
  times = { start: performance.now(), end: 0, headers: 0 };
  await = new Promise((res) => (this._res = res));

  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;

  req;

  _headers = {};

  constructor(req, collect = false) {
    super({
      write: (chunk, _, callback) => {
        if (!this.headersSent) {
          this.writeHead();
        }

        this.length += chunk.length;

        if (collect) {
          this.body = (this.body || "") + decoder.decode(chunk);
        }

        callback();
      },
      destroy: () => {
        this.times.end = performance.now();
        this.finished = true;
        this._res?.(null);
      },
    });

    this.req = req;
  }

  writeHead(status) {
    this.times.headers = performance.now();

    if (status) {
      this.statusCode = status;
    }

    this.headersSent = true;

    return this;
  }

  setTimeout() {
    return this;
  }

  appendHeader(name, value) {
    return this.setHeader(name, value);
  }

  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }

  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }

  getHeaders() {
    return this._headers;
  }

  getHeaderNames() {
    return Object.keys(this._headers);
  }

  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }

  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }

  addTrailers() {}
  flushHeaders() {}
  assignSocket() {}
  detachSocket() {}
  writeContinue() {}
  writeProcessing() {}
  _implicitHeader() {}

  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}
