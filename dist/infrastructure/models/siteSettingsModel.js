"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSettingsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const siteSettingsSchema = new mongoose_1.default.Schema({
    homeBanners: [
        {
            imageUrl: { type: String, required: true },
            title: { type: String, required: true },
            subtitle: { type: String, required: true },
            isActive: { type: Boolean, default: true }
        }
    ],
    themes: [
        {
            name: { type: String, required: true },
        }
    ],
    footerBanners: [
        {
            imageUrl: { type: String, required: true },
            title: { type: String, required: true },
            subtitle: { type: String, required: true },
            isActive: { type: Boolean, default: false }
        }
    ]
});
exports.SiteSettingsModel = mongoose_1.default.model("SiteSettings", siteSettingsSchema);
