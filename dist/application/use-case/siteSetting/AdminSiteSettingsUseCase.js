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
exports.AdminSiteSettingsUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const cloudinary_1 = require("../../../services/cloudinary/cloudinary");
let AdminSiteSettingsUseCase = class AdminSiteSettingsUseCase {
    constructor(siteSettingRepository, cloudinaryService) {
        this.siteSettingRepository = siteSettingRepository;
        this.cloudinaryService = cloudinaryService;
        this.addHomeBanner = (bannerData) => __awaiter(this, void 0, void 0, function* () {
            if (!bannerData.image) {
                throw new Error("Image is required for home banner");
            }
            bannerData.imageUrl = yield this.cloudinaryService.uploadHomeBanner(bannerData.image);
            console.log(bannerData);
            return this.siteSettingRepository.addHomeBanner(bannerData);
        });
        this.addFooterBanner = (bannerData) => __awaiter(this, void 0, void 0, function* () {
            console.log(bannerData);
            if (!bannerData.image) {
                throw new Error("Image is required for footer banner");
            }
            bannerData.imageUrl = yield this.cloudinaryService.uploadFooterBanner(bannerData.image);
            console.log(bannerData);
            return this.siteSettingRepository.addFooterBanner(bannerData);
        });
        this.addTheme = (theme) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.addTheme(theme);
        });
        this.findAllHomeBanners = () => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.findAllHomeBanners();
        });
        this.findAllFooterBanners = () => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.findAllFooterBanners();
        });
        this.findAllThemes = () => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.findAllThemes();
        });
        this.findActiveHomeBanners = () => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.findActiveHomeBanner();
        });
        this.findActiveFooterBanners = () => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.findActiveFooterBanner();
        });
        this.updateHomeBanner = (bannerId, updateData) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.updateHomeBanner(bannerId, updateData);
        });
        this.updateFooterBanner = (bannerId, updateData) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.updateFooterBanner(bannerId, updateData);
        });
        this.updateTheme = (themeName, isActive) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.updateTheme(themeName, isActive);
        });
        this.deleteHomeBanner = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.deleteHomeBanner(bannerId);
        });
        this.deleteFooterBanner = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.deleteFooterBanner(bannerId);
        });
        this.deleteTheme = (themeName) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.deleteTheme(themeName);
        });
        this.makeHomeBannerActive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            const activeHomeBanner = yield this.siteSettingRepository.findActiveHomeBanner();
            if (activeHomeBanner) {
                yield this.siteSettingRepository.makeHomeBannerInactive((activeHomeBanner === null || activeHomeBanner === void 0 ? void 0 : activeHomeBanner.id) + "");
            }
            return this.siteSettingRepository.makeHomeBannerActive(bannerId);
        });
        this.makeHomeBannerInactive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.makeHomeBannerInactive(bannerId);
        });
        this.makeFooterBannerActive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            const activeFooterBanner = yield this.siteSettingRepository.findActiveFooterBanner();
            if (activeFooterBanner) {
                yield this.siteSettingRepository.makeFooterBannerInactive(activeFooterBanner.id + "");
            }
            return this.siteSettingRepository.makeFooterBannerActive(bannerId);
        });
        this.makeFooterBannerInactive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.makeFooterBannerInactive(bannerId);
        });
    }
};
exports.AdminSiteSettingsUseCase = AdminSiteSettingsUseCase;
exports.AdminSiteSettingsUseCase = AdminSiteSettingsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("SiteSettingRepository")),
    __param(1, (0, tsyringe_1.inject)("CloudinaryService")),
    __metadata("design:paramtypes", [Object, cloudinary_1.CloudinaryService])
], AdminSiteSettingsUseCase);
