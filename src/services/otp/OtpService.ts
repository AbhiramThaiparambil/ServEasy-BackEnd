import { inject, injectable, singleton } from "tsyringe";
import { IRedisService } from "../redis/IRedisService";
import { SERVICE_TOKENS } from "../../constants/tokens";
import { IOtpService } from "./IOtpService";
@singleton()
@injectable()
export class Otpservice implements IOtpService {
  constructor(
    @inject(SERVICE_TOKENS.RedisService) private redisService: IRedisService
  ) {}

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
