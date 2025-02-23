import "reflect-metadata";
import { MongoUserRepository } from "./infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "./domain/repositories/userRepository";
import { container } from "tsyringe";
import { EmailOtpService } from "./services/OTP/mailOtp";
import { Otpservice } from "./services/OTP/OtpService";
import { RegisterUser } from "./application/use-case/RegisterUser";
import { SmsOtpService } from "./services/OTP/phoneOtp";


container.register<UserRepository>("UserRepository", { useClass: MongoUserRepository });
container.registerSingleton("EmailOtpService", EmailOtpService);
container.registerSingleton("OtpService", Otpservice);
container.register(RegisterUser, { useClass: RegisterUser });
container.register("SmsOtpService",SmsOtpService)
console.log("All dependencies registered successfully.");



