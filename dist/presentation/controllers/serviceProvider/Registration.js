"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationServiceProvider = void 0;
const tsyringe_1 = require("tsyringe");
const RegisterServiceProvider_1 = require("../../../application/use-case/serviceProvider/auth/RegisterServiceProvider");
const UpdateUserWithServiceProvider_1 = require("../../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider");
const HttpStatus_1 = require("../../../constants/HttpStatus");
const RegistrationServiceProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, bankDetails } = req.body;
        console.log(bankDetails);
        const { serviceProviderName, serviceProviderEmail, serviceProviderPhone, businessType, category, subcategory, experience, location, serviceMode, services, skills, profileImage, documentImg, socialMedia, description, documentImg2 } = data;
        console.log(documentImg2);
        const serviceProviderData = {
            serviceProviderName,
            serviceProviderEmail,
            serviceProviderPhone,
            experience: parseInt(experience, 10),
            location,
            services,
            skills,
            serviceMode,
            profileImage: "",
            document: [],
            businessType,
            category,
            subcategory,
            socialMedia: "",
            description: description || "",
            userId: res.locals.user.userId,
            bankDetails: bankDetails
        };
        data.bankDetails = req.body.bankDetails;
        // if (!serviceProviderName || !serviceProviderEmail || !serviceProviderPhone) {
        //        res.status(HttpStatus.BAD_REQUEST).json({ message: "Name, email, and phone are required." });
        //        return
        //     }
        const registerService = tsyringe_1.container.resolve(RegisterServiceProvider_1.RegisterServiceProviderUseCase);
        const serviceProvider = yield registerService.execute(serviceProviderData, profileImage, documentImg, documentImg2);
        console.log(serviceProvider);
        const updateUser = yield tsyringe_1.container.resolve(UpdateUserWithServiceProvider_1.UpdateUserWithServiceProviderUseCase);
        const user = res.locals.user;
        if (user.userId && serviceProvider._id) {
            yield updateUser.execute(user.userId, serviceProvider._id.toString());
        }
        res.status(HttpStatus_1.HttpStatus.CREATED).json({ message: "Service provider registered successfully.", serviceProvider });
        return;
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while registering the service provider." });
        return;
    }
});
exports.RegistrationServiceProvider = RegistrationServiceProvider;
