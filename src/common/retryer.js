const { logger, CustomError } = require("../common/utils");

const retryer = async (fetcher, variables, retries = 0, count_forks) => {
	if (retries > 7) {
		throw new CustomError("Maximum retries exceeded", CustomError.MAX_RETRY);
	}
	try {
		// try to fetch with the first token since RETRIES is 0 index i'm adding +1
		let response = await fetcher(
			variables,
			process.env[`PAT_${retries + 1}`],
			retries,
			count_forks
		);

		// prettier-ignore
		const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

		// if rate limit is hit increase the RETRIES and recursively call the retryer
		// with username, and current RETRIES
		if (isRateExceeded) {
			logger.log(`PAT_${retries + 1} Failed`);
			retries++;
			// directly return from the function
			return retryer(fetcher, variables, retries, count_forks);
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
			return retryer(fetcher, variables, retries, count_forks);
		}
	}
};

module.exports = retryer;
