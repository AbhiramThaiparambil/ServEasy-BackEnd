import cloudinary from "cloudinary";
import { injectable } from "tsyringe";
import {config} from 'dotenv'
import { v4 as uuidv4 } from "uuid";
config()
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

@injectable()
export class CloudinaryService {
  private async uploadImage(img_url: string, folder: string): Promise<string> {
    try {
        const uniqueFilename =`${folder}${uuidv4()}`
      const res = await cloudinary.v2.uploader.upload(img_url, {
        folder: folder,
        public_id:uniqueFilename 
      });
      return res.secure_url; 
    } catch (error) {
      console.error("Cloudinary upload error");
      console.log(error);
      
      throw new Error("Failed to upload image to Cloudinary");
    }
  }

  async uploadDocuments(img_url: string): Promise<string> {
    return this.uploadImage(img_url, "/servEasy-serviceProvidersDocuments");
  }

  async uploadUserProfile(img_url: string): Promise<string> {
    return this.uploadImage(img_url, "/servEasy-userProfiles");
  }

  async uploadServiceProviderProfile(img_url: string): Promise<string> {
    return this.uploadImage(img_url, "/servEasy-serviceProviderProfiles");
  }

  async uploadServiceImg(img_url: string): Promise<string> {
       
    return this.uploadImage(img_url, "/servEasy-services");
  }
}
