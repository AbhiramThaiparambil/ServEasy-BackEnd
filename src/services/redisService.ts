import { injectable } from "tsyringe";
import Redis from "ioredis";
import { config } from "dotenv";
import { User } from "../domain/entities/IUser";

config();

@injectable()
export class RedisService {
  private client!: Redis;
  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      throw new Error(
        '"REDIS_URL is not defined in the environment variables"'
      );
    }
    this.client = new Redis(redisUrl);

    this.client.on("error", (err) => {
      console.error(err);
    });
  }

  async set(key: string, otp: string, expiry: number): Promise<void> {
    const res = await this.client.set(key, otp, "EX", expiry);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async setLock(key: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.client.set(key, "locked", "EX", ttlSeconds, "NX");
    return result === "OK";
  }

  async releaseLock(key: string): Promise<void> {
    await this.client.del(key);
  }

  async isLocked(key: string): Promise<boolean> {
    const result = await this.client.get(key);
    return !!result;
  }

  async saveUser(userKey: string, user: User): Promise<void> {
    const ttlSeconds = 60 * 2;
    const userData = JSON.stringify(user);
    await this.client.set(userKey, userData, "EX", ttlSeconds);
  }

  async getUser(userKey: string): Promise<User | null> {
    const data = await this.client.get(userKey);
    if (!data) return null;
    return JSON.parse(data) as User;
  }
}
