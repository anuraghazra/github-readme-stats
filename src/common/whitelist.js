const whitelist = process.env.WHITELIST
  ? process.env.WHITELIST.split(",")
  : undefined;

export { whitelist };
export default whitelist;
