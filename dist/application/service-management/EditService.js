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
exports.EditService = void 0;
const tsyringe_1 = require("tsyringe");
const ServiceRepositorie_1 = require("../../infrastructure/repositories/ServiceRepositorie");
const cloudinary_1 = require("../../services/cloudinary/cloudinary");
let EditService = class EditService {
    constructor(serviceRepository, cloudinaryService) {
        this.serviceRepository = serviceRepository;
        this.cloudinaryService = cloudinaryService;
    }
    execute(serviceId, serviceData, serviceNewImg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imgeUrl = "";
                if (serviceNewImg && !(serviceNewImg === null || serviceNewImg === void 0 ? void 0 : serviceNewImg.includes('https://res.cloudinary.com/'))) {
                    console.log('imge called');
                    imgeUrl = yield this.cloudinaryService.uploadServiceImg(serviceNewImg);
                    serviceData.serviceImage = imgeUrl;
                }
                else if (serviceNewImg) {
                    serviceData.serviceImage = serviceNewImg;
                }
                const updatedService = yield this.serviceRepository.updateService(serviceId, serviceData);
                return updatedService;
            }
            catch (error) {
                throw new Error(`Error updating service: ${error.message}`);
            }
        });
    }
};
exports.EditService = EditService;
exports.EditService = EditService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ServiceRepository")),
    __param(1, (0, tsyringe_1.inject)("CloudinaryService")),
    __metadata("design:paramtypes", [ServiceRepositorie_1.ServiceRepository,
        cloudinary_1.CloudinaryService])
], EditService);
