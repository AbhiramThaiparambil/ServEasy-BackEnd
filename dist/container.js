"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UserRepositoriey_1 = require("./infrastructure/repositories/UserRepositoriey");
const ServiceProviderRepository_1 = require("./infrastructure/repositories/ServiceProviderRepository");
const tsyringe_1 = require("tsyringe");
const mailOtp_1 = require("./services/OTP/mailOtp");
const OtpService_1 = require("./services/OTP/OtpService");
const RegisterUser_1 = require("./application/use-case/User/auth/RegisterUser");
const RedisService_1 = require("./services/RedisService");
const phoneOtp_1 = require("./services/OTP/phoneOtp");
const ResendOtp_1 = require("./application/use-case/User/auth/ResendOtp");
const TokenService_1 = require("./services/auth/TokenService");
const cloudinary_1 = require("./services/cloudinary/cloudinary");
const RegisterServiceProvider_1 = require("./application/use-case/serviceProvider/auth/RegisterServiceProvider");
const location_1 = require("./services/location/location");
const ServiceRepositorie_1 = require("./infrastructure/repositories/ServiceRepositorie");
const categoryRepository_1 = require("./infrastructure/repositories/categoryRepository");
const ServiceBookingRepository_1 = require("./infrastructure/repositories/ServiceBookingRepository");
const razorpayService_1 = require("./services/razorpayService");
const socketService_1 = require("./services/socket/socketService");
const ChatRepository_1 = require("./infrastructure/repositories/ChatRepository");
const ReviewRepository_1 = require("./infrastructure/repositories/ReviewRepository");
const VerifyOtp_1 = require("./application/use-case/User/auth/VerifyOtp");
const NotificationRepository_1 = require("./infrastructure/repositories/NotificationRepository");
const SiteSettingRepository_1 = require("./infrastructure/repositories/SiteSettingRepository");
const SlotRepository_1 = require("./infrastructure/repositories/SlotRepository");
tsyringe_1.container.register("UserRepository", {
    useClass: UserRepositoriey_1.MongoUserRepository,
});
tsyringe_1.container.register("IServiceProviderRepository", {
    useClass: ServiceProviderRepository_1.ServiceProviderRepository,
});
tsyringe_1.container.register(RegisterServiceProvider_1.RegisterServiceProviderUseCase, {
    useClass: RegisterServiceProvider_1.RegisterServiceProviderUseCase,
});
tsyringe_1.container.register("ICategoryRepository", {
    useClass: categoryRepository_1.CategoryRepository,
});
tsyringe_1.container.register("ISlotRepository", {
    useClass: SlotRepository_1.SlotRepository,
});
tsyringe_1.container.registerSingleton("EmailOtpService", mailOtp_1.EmailOtpService);
tsyringe_1.container.registerSingleton("OtpService", OtpService_1.Otpservice);
tsyringe_1.container.register(ResendOtp_1.ResendOtp, { useClass: ResendOtp_1.ResendOtp });
tsyringe_1.container.register(RegisterUser_1.RegisterUser, { useClass: RegisterUser_1.RegisterUser });
tsyringe_1.container.register("TokenService", { useClass: TokenService_1.TokenService });
tsyringe_1.container.registerSingleton("CloudinaryService", cloudinary_1.CloudinaryService);
tsyringe_1.container.registerSingleton("SocketService", socketService_1.SocketService);
tsyringe_1.container.register(VerifyOtp_1.VerifyOtp, { useClass: VerifyOtp_1.VerifyOtp });
tsyringe_1.container.register("SmsOtpService", phoneOtp_1.SmsOtpService);
tsyringe_1.container.register("RedisService", RedisService_1.RedisService);
tsyringe_1.container.register("LocationService", { useClass: location_1.LocationService });
tsyringe_1.container.register("ServiceRepository", ServiceRepositorie_1.ServiceRepository);
tsyringe_1.container.register("ServiceBookingRepository", ServiceBookingRepository_1.ServiceBookingRepository);
tsyringe_1.container.register("RazorpayService", razorpayService_1.RazorpayService);
tsyringe_1.container.register("ReviewRepository", { useClass: ReviewRepository_1.ReviewRepository });
tsyringe_1.container.register("NotificationRepository", { useClass: NotificationRepository_1.NotificationRepository });
tsyringe_1.container.registerSingleton("ChatRepository", ChatRepository_1.ChatRepository);
tsyringe_1.container.register("SiteSettingRepository", SiteSettingRepository_1.SiteSettingRepository);
console.log("All dependencies registered successfully.");
