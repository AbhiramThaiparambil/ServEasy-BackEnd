"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickLimiter = void 0;
const createRateLimiter_1 = require("./createRateLimiter");
exports.clickLimiter = (0, createRateLimiter_1.createRateLimiter)({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    message: "Too many requests",
});
