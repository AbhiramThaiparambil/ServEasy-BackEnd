"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ReapplyServiceProviderUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const CloudinaryService_1 = require("../../../../services/cloudinary/CloudinaryService");
const tokens_1 = require("../../../../constants/tokens");
let ReapplyServiceProviderUseCase = class ReapplyServiceProviderUseCase {
    constructor(serviceProviderRepository, cloudinaryService) {
        this.serviceProviderRepository = serviceProviderRepository;
        this.cloudinaryService = cloudinaryService;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { serviceProviderData, profileImageRow, documentRow, document2Row } = data;
            const existingProvider = yield this.serviceProviderRepository.findByUserID(serviceProviderData.userId);
            if (!existingProvider || !existingProvider._id) {
                throw new Error("Service provider not found");
            }
            let profileImage = existingProvider.profileImage;
            if (!profileImage) {
                throw new Error("Profile image is required");
            }
            if (profileImageRow &&
                !profileImageRow.startsWith("https://res.cloudinary.com")) {
                profileImage = yield this.cloudinaryService.uploadServiceProviderProfile(profileImageRow);
            }
            const documents = [];
            if (documentRow && !documentRow.startsWith("https://res.cloudinary.com")) {
                documents.push(yield this.cloudinaryService.uploadDocuments(documentRow));
            }
            else if ((_a = existingProvider.document) === null || _a === void 0 ? void 0 : _a[0]) {
                documents.push(existingProvider.document[0]);
            }
            if (document2Row &&
                !document2Row.startsWith("https://res.cloudinary.com")) {
                documents.push(yield this.cloudinaryService.uploadDocuments(document2Row));
            }
            else if ((_b = existingProvider.document) === null || _b === void 0 ? void 0 : _b[1]) {
                documents.push(existingProvider.document[1]);
            }
            const mappedSkills = serviceProviderData.skills.map((skillName) => ({
                name: skillName,
                level: "beginner",
            }));
            const updatePayload = {
                serviceProviderName: serviceProviderData.serviceProviderName,
                serviceProviderEmail: serviceProviderData.serviceProviderEmail,
                serviceProviderPhone: serviceProviderData.serviceProviderPhone,
                experience: serviceProviderData.experience,
                location: serviceProviderData.location,
                services: serviceProviderData.services,
                skills: mappedSkills,
                serviceMode: serviceProviderData.serviceMode,
                businessType: serviceProviderData.businessType,
                category: serviceProviderData.category,
                subcategory: serviceProviderData.subcategory,
                socialMedia: serviceProviderData.socialMedia,
                description: serviceProviderData.description,
                profileImage,
                document: documents,
                isVerified: "pending",
            };
            return yield this.serviceProviderRepository.updateRegistration(existingProvider._id, updatePayload);
        });
    }
};
exports.ReapplyServiceProviderUseCase = ReapplyServiceProviderUseCase;
exports.ReapplyServiceProviderUseCase = ReapplyServiceProviderUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IServiceProviderRepository")),
    __param(1, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.CloudinaryService)),
    __metadata("design:paramtypes", [Object, CloudinaryService_1.CloudinaryService])
], ReapplyServiceProviderUseCase);
