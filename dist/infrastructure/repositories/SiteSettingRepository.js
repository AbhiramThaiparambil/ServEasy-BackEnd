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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSettingRepository = void 0;
const tsyringe_1 = require("tsyringe");
const siteSettingsModel_1 = require("../models/siteSettingsModel");
let SiteSettingRepository = class SiteSettingRepository {
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = yield siteSettingsModel_1.SiteSettingsModel.findOne();
            if (!settings) {
                settings = new siteSettingsModel_1.SiteSettingsModel({ homeBanners: [], footerBanners: [], themes: [] });
                yield settings.save();
            }
            return settings;
        });
    }
    findAllHomeBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getSettings()).homeBanners;
        });
    }
    findAllFooterBanners() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getSettings()).footerBanners;
        });
    }
    findAllThemes() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getSettings()).themes.map(t => t.name);
        });
    }
    findActiveHomeBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            const homeBanner = (yield this.getSettings()).homeBanners.filter(b => b.isActive);
            return homeBanner[0];
        });
    }
    findActiveFooterBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            const footerBanner = (yield this.getSettings()).footerBanners.filter(b => b.isActive);
            return footerBanner[0];
        });
    }
    updateHomeBanner(bannerId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const banner = settings.homeBanners.find(b => b.id === bannerId);
            if (!banner)
                throw new Error("Home banner not found");
            Object.assign(banner, updateData);
            yield settings.save();
            return banner;
        });
    }
    updateFooterBanner(bannerId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const banner = settings.footerBanners.find(b => b.id === bannerId);
            if (!banner)
                throw new Error("Footer banner not found");
            Object.assign(banner, updateData);
            yield settings.save();
            return banner;
        });
    }
    updateTheme(themeName, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const theme = settings.themes.find(t => t.name === themeName);
            if (!theme)
                throw new Error("Theme not found");
            theme.isActive = isActive;
            yield settings.save();
            return theme.name;
        });
    }
    deleteHomeBanner(bannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            settings.homeBanners = settings.homeBanners.filter(b => b.id !== bannerId);
            yield settings.save();
        });
    }
    deleteFooterBanner(bannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            settings.footerBanners = settings.footerBanners.filter(b => b.id !== bannerId);
            yield settings.save();
        });
    }
    deleteTheme(themeName) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            settings.themes = settings.themes.filter(t => t.name !== themeName);
            yield settings.save();
        });
    }
    addHomeBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            settings.homeBanners.push(banner);
            yield settings.save();
            return banner;
        });
    }
    addTheme(theme) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            settings.themes.push(theme);
            yield settings.save();
            return theme.name;
        });
    }
    makeHomeBannerActive(bannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const banner = settings.homeBanners.find(b => b.id === bannerId);
            if (!banner)
                throw new Error("Home banner not found");
            banner.isActive = true;
            yield settings.save();
            return banner;
        });
    }
    makeHomeBannerInactive(bannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const banner = settings.homeBanners.find(b => b.id === bannerId);
            if (!banner)
                throw new Error("Home banner not found");
            banner.isActive = false;
            yield settings.save();
            return banner;
        });
    }
    makeFooterBannerActive(bannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const banner = settings.footerBanners.find(b => b.id === bannerId);
            if (!banner)
                throw new Error("Footer banner not found");
            banner.isActive = true;
            yield settings.save();
            return banner;
        });
    }
    makeFooterBannerInactive(bannerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            const banner = settings.footerBanners.find(b => b.id === bannerId);
            if (!banner)
                throw new Error("Footer banner not found");
            banner.isActive = false;
            yield settings.save();
            return banner;
        });
    }
    addFooterBanner(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield this.getSettings();
            settings.footerBanners.push(banner);
            yield settings.save();
            return banner;
        });
    }
};
exports.SiteSettingRepository = SiteSettingRepository;
exports.SiteSettingRepository = SiteSettingRepository = __decorate([
    (0, tsyringe_1.injectable)()
], SiteSettingRepository);
