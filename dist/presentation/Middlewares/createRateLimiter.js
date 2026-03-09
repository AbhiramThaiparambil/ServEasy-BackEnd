"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRateLimiter = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const createRateLimiter = (options) => {
    return (0, express_rate_limit_1.rateLimit)({
        windowMs: options.windowMs,
        limit: options.limit,
        message: options.message || "Too many requests",
        standardHeaders: false,
        legacyHeaders: false,
    });
};
exports.createRateLimiter = createRateLimiter;
