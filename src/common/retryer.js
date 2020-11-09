const { logger, CustomError } = require("../common/utils");

const retryer = async (fetcher, variables, retries = 0) => {
  if (retries > 7) {
    throw new CustomError("Maximum retries exceeded", CustomError.MAX_RETRY);
  }
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(
      variables,
      process.env[`PAT_${retries + 1}`],
      retries,
    );

    // prettier-ignore
    const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

    // if rate limit is hit increase the RETRIES and recursively call the retryer
    // with username, and current RETRIES
    if (isRateExceeded) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }

    if (response.data.errors) {
      // We can't paginate on an erroneous response.
      return response;
    }

    if ("cursor" in variables) {
      // If we're trying to paginate, we might need to make more requests.
      // the "cursor_path" variable tells us which fields are paginated and
      // and how to access the cursor items.
      let data = response.data.data;
      for (const path of variables["cursor_path"])
        data = data[path];

      if (data.pageInfo.endCursor !== null) {
        // Make another request starting where the previous request left off.
        variables["cursor"] = data.pageInfo.endCursor;
        const additional_response = await retryer(fetcher, variables)
        if (additional_response.data.errors) {
          // If a subsequent request fails, the whole thing should fail.
          return additional_response;
        }

        let additional_data = additional_response.data.data;
        for (const path of variables["cursor_path"])
          additional_data = additional_data[path];

        // Append the additional data to our existing data.
        data.nodes = data.nodes.concat(additional_data.nodes);
      }
    }

    // finally return the response
    return response;
  } catch (err) {
    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential = err.response.data && err.response.data.message === "Bad credentials";

    if (isBadCredential) {
      logger.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }
  }
};

module.exports = retryer;
