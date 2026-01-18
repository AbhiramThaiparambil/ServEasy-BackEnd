import { createRateLimiter } from "./createRateLimiter";

export const clickLimiter = createRateLimiter({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  message: "Too many requests",
});
