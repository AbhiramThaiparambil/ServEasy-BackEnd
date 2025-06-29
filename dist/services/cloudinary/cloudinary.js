"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const tsyringe_1 = require("tsyringe");
const dotenv_1 = require("dotenv");
const uuid_1 = require("uuid");
(0, dotenv_1.config)();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
let CloudinaryService = class CloudinaryService {
    uploadImage(img_url, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uniqueFilename = `${folder}${(0, uuid_1.v4)()}`;
                const res = yield cloudinary_1.default.v2.uploader.upload(img_url, {
                    folder: folder,
                    public_id: uniqueFilename
                });
                return res.secure_url;
            }
            catch (error) {
                console.error("Cloudinary upload error");
                console.log(error);
                throw new Error("Failed to upload image to Cloudinary");
            }
        });
    }
    uploadDocuments(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-serviceProvidersDocuments");
        });
    }
    uploadUserProfile(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-userProfiles");
        });
    }
    uploadServiceProviderProfile(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-serviceProviderProfiles");
        });
    }
    uploadServiceImg(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-services");
        });
    }
    uploadBillsImg(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-ServiceBills");
        });
    }
    uploadHomeBanner(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-homeBanners");
        });
    }
    uploadFooterBanner(img_url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.uploadImage(img_url, "/servEasy-footerBanners");
        });
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, tsyringe_1.injectable)()
], CloudinaryService);
