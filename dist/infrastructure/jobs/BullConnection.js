"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const url_1 = require("url");
const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
}
const parsed = new url_1.URL(redisUrl);
exports.redisConnection = {
    host: parsed.hostname,
    port: Number(parsed.port),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    tls: parsed.protocol === 'rediss:' ? {} : undefined,
    maxRetriesPerRequest: null,
};
