import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// 1. Initialize the Upstash Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// 2. Create and export the rate limiter instance
const rateLimit = new Ratelimit({
  redis: redis,
  // slidingWindow strictly enforces 10 requests within any moving 20-second window
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true, // Optional: Enables dashboard metrics in Upstash
  prefix: "@upstash/ratelimit", // Optional: Customizes Redis key prefix
});

export default rateLimit;