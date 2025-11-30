import { injectable } from "tsyringe";
import { IAdRepository } from "../../domain/repositories/IAdRepository";
import { IAd } from "../../domain/entities/IAd";
import { AdModel } from "../models/AdModel";
import { IAdDTO } from "../../utils/types/dto/IAdDto";
import { Types } from "mongoose";

@injectable()
export class AdRepository implements IAdRepository {
  async createAd(data: IAd): Promise<IAd | null> {
    try {
      console.log("===========================");

      console.log(data);
      console.log("===========================");
      const ad = await AdModel.create(data);
      return ad.toObject() as IAd;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getAdsByProvider(providerId: string): Promise<IAdDTO[] | []> {
    try {
      const id= new Types.ObjectId(providerId)
      console.log(await AdModel.find({providerId: id }).sort({ createdAt: -1 }))
      return await AdModel.find({providerId: id }).sort({ createdAt: -1 });
       

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAd(id: string, data: Partial<IAd>): Promise<IAd | null> {
    return await AdModel.findByIdAndUpdate(id, data, { new: true });
  }

  async getAdById(id: string): Promise<IAd | null> {
    return await AdModel.findById(id);
  }

  async blockAd(id: string): Promise<boolean> {
    const result = await AdModel.updateOne({ _id: id }, { status: "blocked" });
    return result.modifiedCount > 0;
  }

  async unblockAd(id: string): Promise<boolean> {
    const result = await AdModel.updateOne({ _id: id }, { status: "approved" });
    return result.modifiedCount > 0;
  }

  async expireAd(id: string): Promise<boolean> {
    const result = await AdModel.updateOne({ _id: id }, { status: "expired" });
    return result.modifiedCount > 0;
  }
}
