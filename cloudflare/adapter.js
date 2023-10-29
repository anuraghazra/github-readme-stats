export class RequestAdapter {
  params = {};

  /**
   * @param {Request} request Cloudflare Workers request
   */
  constructor(request) {
    this.request = request;

    const url = new URL(request.url);
    const queryString = url.search.slice(1).split("&");

    queryString.forEach((item) => {
      const kv = item.split("=");
      if (kv[0]) {
        this.params[kv[0]] = kv[1] || true;
      }
    });
  }

  /**
   * @returns {string} request method
   * @readonly
   */
  get query() {
    return this.params;
  }
}

export class ResponseAdapter {
  headers = {};
  body = "";

  /**
   * @param {string} key header key
   * @param {string} value header value
   * @returns {void}
   */
  setHeader(key, value) {
    this.headers[key] = value;
  }

  /**
   * @param {string} body response body
   * @returns {void}
   */
  send(body) {
    this.body = body;
  }

  /**
   * @returns {Response} Cloudflare Workers response
   */
  toResponse() {
    return new Response(this.body, {
      headers: this.headers,
    });
  }
}
