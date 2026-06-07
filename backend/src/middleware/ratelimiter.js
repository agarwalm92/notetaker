import rateLimiter from "../config/upstash.js";

export const rateLimiter = async (req, res, next) => { 
//   const identifier = 
//     req.headers["x-forwarded-for"]?.split(",")[0] || 
//     req.socket.remoteAddress || 
//     "anonymous";

  try {
    // 2. Evaluate the request limit against Upstash Redis
    const { success, limit, reset, remaining } = await rateLimiter.limit("my-ratelimit-key");

    // 3. Set standard HTTP Rate-Limit headers
    // res.setHeader("X-RateLimit-Limit", limit.toString());
    // res.setHeader("X-RateLimit-Remaining", remaining.toString());
    // res.setHeader("X-RateLimit-Reset", reset.toString());

    // 4. If the rate limit has been exceeded, block the request
    if (!success) {
      return res.status(429).json({
        error: "Too Many Requests",
        message: "You have exceeded the allowed 10 requests per 20 seconds limit. Please try again later.",
        retryAfterSeconds: Math.max(0, Math.ceil((reset - Date.now()) / 1000))
      });
    }
    // 5. If successful, pass control to the next route handler
    next();

  } catch (error) {
    console.error("Rate Limiter Middleware Error:", error);
    
    // Fail-Open Strategy: If Upstash/Redis goes down, we log the error but 
    // let the user request pass through so the app doesn't break for everyone.
    next(error);
  }
};

export default rateLimiter;