import ratelimiter from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimite.limit("my-rate-limit");

    if (!success) {
      return res
        .status(429)
        .json({ error: "Too many requests, please try again later." });
    }

    next();

    next();
  } catch (error) {
    console.log("Rate limiter error:", error);
    next(error);
  }
};
export default ratelimiter;
