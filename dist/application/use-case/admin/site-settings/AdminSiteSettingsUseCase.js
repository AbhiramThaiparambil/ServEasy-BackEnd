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
const tokens_1 = require("../../../../constants/tokens");
let AdminSiteSettingsUseCase = class AdminSiteSettingsUseCase {
    constructor(siteSettingRepository, cloudinaryService) {
        this.siteSettingRepository = siteSettingRepository;
        this.cloudinaryService = cloudinaryService;
        this.addHomeBanner = (bannerData) => __awaiter(this, void 0, void 0, function* () {
            if (!bannerData.image) {
                throw new Error("Image is required for home banner");
            }
            const imageUrl = yield this.cloudinaryService.uploadHomeBanner(bannerData.image);
            const bannerEntity = {
                image: bannerData.image,
                imageUrl: imageUrl,
                title: bannerData.title,
                subtitle: bannerData.subtitle,
                isActive: true,
            };
            const result = yield this.siteSettingRepository.addHomeBanner(bannerEntity);
            return result;
        });
        this.addFooterBanner = (bannerData) => __awaiter(this, void 0, void 0, function* () {
            if (!bannerData.image) {
                throw new Error("Image is required for footer banner");
            }
            const imageUrl = yield this.cloudinaryService.uploadFooterBanner(bannerData.image);
            const bannerEntity = {
                image: bannerData.image,
                imageUrl: imageUrl,
                title: bannerData.title,
                subtitle: bannerData.subtitle,
                isActive: true,
            };
            const result = yield this.siteSettingRepository.addFooterBanner(bannerEntity);
            return result;
        });
        this.addTheme = (theme) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const themeEntity = {
                name: theme.name,
                isActive: (_a = theme.isActive) !== null && _a !== void 0 ? _a : false
            };
            return this.siteSettingRepository.addTheme(themeEntity);
        });
        this.findAllHomeBanners = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.siteSettingRepository.findAllHomeBanners();
            return result;
        });
        this.findAllFooterBanners = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.siteSettingRepository.findAllFooterBanners();
            return result;
        });
        this.findAllThemes = () => __awaiter(this, void 0, void 0, function* () {
            return this.siteSettingRepository.findAllThemes();
        });
        this.findActiveHomeBanners = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.siteSettingRepository.findActiveHomeBanner();
            return result;
        });
        this.findActiveFooterBanners = () => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.siteSettingRepository.findActiveFooterBanner();
            return result;
        });
        this.updateHomeBanner = (bannerId, updateData) => __awaiter(this, void 0, void 0, function* () {
            const entityUpdate = Object.assign({}, updateData);
            const result = yield this.siteSettingRepository.updateHomeBanner(bannerId, entityUpdate);
            return result;
        });
        this.updateFooterBanner = (bannerId, updateData) => __awaiter(this, void 0, void 0, function* () {
            const entityUpdate = Object.assign({}, updateData);
            return (yield this.siteSettingRepository.updateFooterBanner(bannerId, entityUpdate));
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
            const result = yield this.siteSettingRepository.makeHomeBannerActive(bannerId);
            return result;
        });
        this.makeHomeBannerInactive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.siteSettingRepository.makeHomeBannerInactive(bannerId);
            return result;
        });
        this.makeFooterBannerActive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            const activeFooterBanner = yield this.siteSettingRepository.findActiveFooterBanner();
            if (activeFooterBanner) {
                yield this.siteSettingRepository.makeFooterBannerInactive(activeFooterBanner.id + "");
            }
            const result = yield this.siteSettingRepository.makeFooterBannerActive(bannerId);
            return result;
        });
        this.makeFooterBannerInactive = (bannerId) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.siteSettingRepository.makeFooterBannerInactive(bannerId);
            return result;
        });
    }
};
exports.AdminSiteSettingsUseCase = AdminSiteSettingsUseCase;
exports.AdminSiteSettingsUseCase = AdminSiteSettingsUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(tokens_1.REPOSITORY_TOKENS.SiteSettingRepository)),
    __param(1, (0, tsyringe_1.inject)(tokens_1.SERVICE_TOKENS.CloudinaryService)),
    __metadata("design:paramtypes", [Object, Object])
], AdminSiteSettingsUseCase);
