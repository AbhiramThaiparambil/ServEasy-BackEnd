
import mongoose from "mongoose";
import {ISiteSettings} from "../../domain/entities/ISiteSettings";

const siteSettingsSchema: mongoose.Schema = new mongoose.Schema<ISiteSettings>({
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
})


export const SiteSettingsModel = mongoose.model<ISiteSettings>("SiteSettings", siteSettingsSchema);