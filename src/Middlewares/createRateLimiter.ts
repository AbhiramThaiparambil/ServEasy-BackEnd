import { rateLimit } from "express-rate-limit";

export const createRateLimiter = (options: {
  windowMs: number;
  limit: number;
  message?: string;
}) => {
  return rateLimit({
    windowMs: options.windowMs,
    limit: options.limit,
    message: options.message || "Too many requests",
    standardHeaders: false,
    legacyHeaders: false,
  });
};
