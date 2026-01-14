import { inject, injectable, singleton } from "tsyringe";
import { RedisService } from "../redis/RedisService";
@singleton()
@injectable()
export class Otpservice {
  private otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();
  constructor(@inject(RedisService) private redisService: RedisService) {}

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async saveOtp(email: string, otp: string) {
    await this.redisService.set(email, otp, 65);
  }
  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const isValid = await this.redisService.get(email);
    if (!isValid) return false;

    return isValid === otp ? true : false;
  }
  async removeOtp(key: string) {
    this.redisService.delete(key);
  }
}
