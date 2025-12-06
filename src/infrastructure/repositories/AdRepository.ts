import { injectable } from "tsyringe";
import { IAdRepository } from "../../domain/repositories/IAdRepository";
import { IAd } from "../../domain/entities/IAd";
import { AdModel } from "../models/AdModel";
import { IAdDTO } from "../../utils/types/dto/IAdDto";
import { Types } from "mongoose";
import { IAdminAd, IAdStatus } from "../../utils/types/dto/IAdAdminDto";

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


  async getAllAds(skip: number, limit: number): Promise<IAdminAd[]> {
    const ads = await AdModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },

      {
        $lookup: {
          from: "serviceproviders",    
          localField: "providerId",
          foreignField: "_id",
          as: "provider"
        }
      },

      {
        $unwind: {
          path: "$provider",
          preserveNullAndEmptyArrays: true
        }
      },

      {
        $project: {
          _id: 1,
          serviceId: 1,
          providerId: 1,

          serviceProviderName: "$provider.serviceProviderName",
          profileImage: "$provider.profileImage",

          caption: 1,
          description: 1,
          image: 1,

          targetLocation: 1,
          radiusKm: 1,

          startDate: 1,
          endDate: 1,

          views: 1,
          clicks: 1,
          status: 1,

          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    return ads as IAdminAd[];
  }

async getTotalAdCount(): Promise<number> {
  return AdModel.countDocuments();
}

async getTotalProviderAdCount(id:string): Promise<number> {
  const _id= new Types.ObjectId(id)
 
  return AdModel.find({providerId:_id}).countDocuments()
}


async changeAdStatus(id: string, status: IAdStatus): Promise<boolean> {
 try {
   const adId = new Types.ObjectId(id);

  const result = await AdModel.updateOne(
    { _id: adId },
    { $set: { status } }
  );

  return result.modifiedCount > 0;
 } catch (error) {
   console.log(error)
  return false
 }
}




async getAdsByProvider(
  providerId: string,
  skip: number = 0,
  limit: number = 10
): Promise<IAdDTO[]> {
  try {
    const id = new Types.ObjectId(providerId);

    return await AdModel.find({ providerId: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
