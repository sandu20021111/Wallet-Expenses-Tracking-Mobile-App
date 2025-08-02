import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import "dotenv/config";

// Create ratelimit instance
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60s"),
  analytics: true,
});

// Express middleware
const ratelimiterMiddleware = async (req, res, next) => {
  try {
    const ip = req.ip || "anonymous";

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({ error: "Too many requests" });
    }

    next(); // ✅ allow request to continue
  } catch (err) {
    console.error("Rate limiting error:", err);
    res.status(500).json({ error: "Internal rate limit error" });
  }
};

export default ratelimiterMiddleware;
