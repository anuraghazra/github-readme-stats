const retryer = async (fetcher, variables, retries = 0) => {
  if (retries > 7) {
    throw new Error("Maximum retries exceeded");
  }
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    let response = await fetcher(
      variables,
      process.env[`PAT_${retries + 1}`],
      retries
    );

    // prettier-ignore
    const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

    // if rate limit is hit increase the RETRIES and recursively call the retryer
    // with username, and current RETRIES
    if (isRateExceeded) {
      console.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }

    // finally return the response
    return response;
  } catch (err) {
    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    const isBadCredential = err.response.data && err.response.data.message === "Bad credentials";

    if (isBadCredential) {
      console.log(`PAT_${retries + 1} Failed`);
      retries++;
      // directly return from the function
      return retryer(fetcher, variables, retries);
    }
  }
};

module.exports = retryer;
