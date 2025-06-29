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
exports.AddNewService = void 0;
const ServiceRepositorie_1 = require("../../infrastructure/repositories/ServiceRepositorie");
const cloudinary_1 = require("../../services/cloudinary/cloudinary");
const tsyringe_1 = require("tsyringe");
let AddNewService = class AddNewService {
    constructor(serviceRepository, cloudinaryService) {
        this.serviceRepository = serviceRepository;
        this.cloudinaryService = cloudinaryService;
    }
    execute(service) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const img_url = yield this.cloudinaryService.uploadServiceImg(service.serviceImage);
                service.serviceImage = img_url;
                const createdService = yield this.serviceRepository.create(service);
                const allServices = yield this.serviceRepository.findAllServiceProviderId(createdService.serviceProviderId);
                console.log(allServices);
                return allServices;
            }
            catch (error) {
                console.error("Error adding new service:", error);
                throw new Error("Failed to add new service");
            }
        });
    }
};
exports.AddNewService = AddNewService;
exports.AddNewService = AddNewService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ServiceRepository")),
    __param(1, (0, tsyringe_1.inject)("CloudinaryService")),
    __metadata("design:paramtypes", [ServiceRepositorie_1.ServiceRepository,
        cloudinary_1.CloudinaryService])
], AddNewService);
