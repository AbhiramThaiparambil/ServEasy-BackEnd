import "reflect-metadata";
import { MongoUserRepository } from "./infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "./domain/repositories/userRepository";
import { container } from "tsyringe";
import { EmailOtpService } from "./services/OTP/mailOtp";
import { Otpservice } from "./services/OTP/OtpService";
import { RegisterUser } from "./application/use-case/RegisterUser";
import { VerifyOtp } from "./application/use-case/verifyOtp";

import { RedisService } from "./services/OTP/redisService";
import { SmsOtpService } from "./services/OTP/phoneOtp";
import { ResendOtp } from "./application/use-case/ResendOtp";
import { TokenService } from "./services/auth/TokenService";
container.register<UserRepository>("UserRepository", {
  useClass: MongoUserRepository,
});
container.registerSingleton("EmailOtpService", EmailOtpService);
container.registerSingleton("OtpService", Otpservice);
container.register(ResendOtp, { useClass: ResendOtp });
container.register(RegisterUser, { useClass: RegisterUser });
container.register<TokenService>("TokenService", { useClass: TokenService });

container.register(VerifyOtp, { useClass: VerifyOtp });
container.register("SmsOtpService", SmsOtpService);
container.register("RedisService",RedisService)
console.log("All dependencies registered successfully.");
