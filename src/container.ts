import "reflect-metadata";
import { MongoUserRepository } from "./infrastructure/repositories/UserRepositoriey";
import { ServiceProviderRepository } from "./infrastructure/repositories/ServiceProviderRepository";
import { IServiceProviderRepository } from "./domain/repositories/IserviceProviderRepository";
import { UserRepository } from "./domain/repositories/IuserRepository";
import { container } from "tsyringe";
import { EmailOtpService } from "./services/OTP/mailOtp";
import { Otpservice } from "./services/OTP/OtpService";
import { RegisterUser } from "./application/use-case/User/auth/RegisterUser";
import { VerifyOtp } from "./application/use-case/User/auth/VerifyOtp";
import { RedisService } from "./services/OTP/redisService";
import { SmsOtpService } from "./services/OTP/phoneOtp";
import { ResendOtp } from "./application/use-case/User/auth/ResendOtp";
import { TokenService } from "./services/auth/TokenService";
import { CloudinaryService } from "./services/cloudinary/cloudinary";
import { RegisterServiceProviderUseCase } from "./application/use-case/serviceProvider/auth/RegisterServiceProvider";
import { LocationService } from "./services/location/location";
container.register<UserRepository>("UserRepository", {
  useClass: MongoUserRepository,
});
container.register<IServiceProviderRepository>("IServiceProviderRepository", {
  useClass: ServiceProviderRepository,
});
container.register(RegisterServiceProviderUseCase, {
  useClass: RegisterServiceProviderUseCase,
});

container.registerSingleton("EmailOtpService", EmailOtpService);
container.registerSingleton("OtpService", Otpservice);
container.register(ResendOtp, { useClass: ResendOtp });
container.register(RegisterUser, { useClass: RegisterUser });
container.register<TokenService>("TokenService", { useClass: TokenService });
container.registerSingleton("CloudinaryService", CloudinaryService);
container.register(VerifyOtp, { useClass: VerifyOtp });
container.register("SmsOtpService", SmsOtpService);
container.register("RedisService", RedisService);
container.register("LocationService", { useClass: LocationService });

console.log("All dependencies registered successfully.");
