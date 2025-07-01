import { QueueOptions } from 'bullmq';
import { URL } from 'url';

const redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
  throw new Error("REDIS_URL is not defined");
}

const parsed = new URL(redisUrl);

export const redisConnection: QueueOptions['connection'] = {
  host: parsed.hostname,
  port: Number(parsed.port),
  username: parsed.username || undefined,
  password: parsed.password || undefined,
  tls: parsed.protocol === 'rediss:' ? {} : undefined, 
  maxRetriesPerRequest: null, 
};
