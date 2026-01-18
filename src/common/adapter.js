// @ts-check

/**
 * Parses the query string from a URL into an object.
 *
 * @param {string} url The URL to parse.
 * @returns {Record<string, string | string[]>} The parsed query object.
 */
const parseQuery = (url) => {
  const { searchParams } = new URL(url);
  /** @type {Record<string, string | string[]>} */
  const query = {};
  for (const [key, value] of searchParams) {
    if (query[key]) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
};

/**
 * Adapter to run Vercel/Express-style handlers in Cloudflare Workers.
 *
 * @param {Request} request Cloudflare/Standard Request object.
 * @param {Function} handler The Vercel function (req, res) => Promise<void>.
 * @returns {Promise<Response>} The final Response object.
 */
const workerAdapter = async (request, handler) => {
  const headers = new Headers();
  let body = null;
  let status = 200;

  // Mock Request object
  const req = {
    query: parseQuery(request.url),
    method: request.method,
    headers: Object.fromEntries(request.headers),
    url: request.url,
  };

  // Mock Response object
  const res = {
    /**
     * @param {string} key The header key.
     * @param {string} value The header value.
     * @returns {object} The response object.
     */
    setHeader: (key, value) => {
      headers.set(key, value);
      return res;
    },
    /**
     * @param {number} code The status code.
     * @returns {object} The response object.
     */
    status: (code) => {
      status = code;
      return res;
    },
    /**
     * @param {string|Buffer} data The response body.
     * @returns {object} The response object.
     */
    send: (data) => {
      body = data;
      // In strict Express, .send() ends the response.
      // Here we just store it to return later.
      return res;
    },
    // Helper to allow `return res.send(...)` pattern
    /**
     * @param {object} data The JSON data.
     * @returns {object} The response object.
     */
    json: (data) => {
      headers.set("Content-Type", "application/json");
      body = JSON.stringify(data);
      return res;
    },
  };

  try {
    await handler(req, res);
  } catch (err) {
    console.error(err);
    if (!body) {
      status = 500;
      body = "Internal Server Error";
    }
  }

  return new Response(body, {
    status,
    headers,
  });
};

export { workerAdapter };
