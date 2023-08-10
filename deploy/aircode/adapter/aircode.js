module.exports = function (api) {
  return async (params, context) => {
    let body = "";
    const req = {
      query: params,
    };
    const res = {
      setHeader: (key, value) => {
        return context.set(key, value);
      },
      send: (content) => {
        body = content;
      },
    };
    await api(req, res);
    return body;
  };
};
