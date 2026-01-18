import { injectable } from "tsyringe";
import { IAdRepository } from "../../domain/repositories/IAdRepository";
import { IAd } from "../../domain/entities/IAd";
import { AdModel } from "../models/AdModel";
import { IAdDTO } from "../../utils/types/dto/IAdDto";
import { Types } from "mongoose";
import { IAdminAd, IAdStatus } from "../../utils/types/dto/IAdAdminDto";
import {
  IGetRecommendedAdsRequestDTO,
  IRecommendedAdDTO,
} from "../../utils/types/dto/IRecommendAdsDTO";

@injectable()
export class AdRepository implements IAdRepository {
  async createAd(data: IAd): Promise<IAd | null> {
    try {
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
          as: "provider",
        },
      },

      {
        $unwind: {
          path: "$provider",
          preserveNullAndEmptyArrays: true,
        },
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
          updatedAt: 1,
        },
      },
    ]);

    return ads as IAdminAd[];
  }

  async getTotalAdCount(): Promise<number> {
    return AdModel.countDocuments();
  }

  async getTotalProviderAdCount(id: string): Promise<number> {
    const _id = new Types.ObjectId(id);

    return AdModel.find({ providerId: _id }).countDocuments();
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
      console.log(error);
      return false;
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

  async findRecommendedAds(
    params: IGetRecommendedAdsRequestDTO
  ): Promise<IRecommendedAdDTO[]> {
    const {
      count = 1,
      category,
      providerId,
      lat,
      lng,
      radius = 10000,
    } = params;

    const now = new Date();

    const match: any = {
      status: "active",
      startDate: { $lte: now },
      endDate: { $gte: now },
    };

    if (category) match.category = category;
    if (providerId) match.providerId = providerId;

    let coords: [number, number] | null = null;
    if (lat !== undefined && lng !== undefined) {
      coords = [lng, lat];
    }
    const ads = await AdModel.aggregate([
      ...(coords
        ? [
            {
              $geoNear: {
                near: coords,
                distanceField: "distance",
                maxDistance: radius * 1000,
                spherical: true,
              },
            },
          ]
        : []),

      { $match: match },

      { $sort: { boostScore: -1, createdAt: -1 } },

      { $sample: { size: count } },

      {
        $lookup: {
          from: "serviceproviders",
          localField: "providerId",
          foreignField: "_id",
          as: "provider",

          pipeline: [
            {
              $match: {
                subscriptions: {
                  $elemMatch: {
                    startDate: { $lte: new Date() },
                    endDate: { $gte: new Date() },
                    status: "active",
                  },
                },
              },
            },
          ],
        },
      },

      { $match: { provider: { $ne: [] } } },

      {
        $unwind: {
          path: "$provider",
          preserveNullAndEmptyArrays: false,
        },
      },

      {
        $project: {
          _id: { $toString: "$_id" },
          serviceId: { $toString: "$serviceId" },
          providerId: { $toString: "$providerId" },

          serviceProviderName: "$provider.name",
          profileImage: "$provider.profileImage",

          caption: 1,
          description: 1,
          image: 1,
        },
      },

      { $limit: count },
    ]);

    const adIds = ads.map((a) => a._id);

    if (adIds.length > 0) {
      await AdModel.updateMany({ _id: { $in: adIds } }, { $inc: { views: 1 } });
    }

    return ads as IRecommendedAdDTO[];
  }

  async expireExpiredAds(): Promise<number> {
    const now = new Date();

    const result = await AdModel.updateMany(
      {
        status: "active",
        endDate: { $lt: now },
      },
      {
        $set: { status: "expired" },
      }
    );

    return result.modifiedCount ?? 0;
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

  async incrementClicks(adId: string): Promise<number> {
    const updated = await AdModel.findByIdAndUpdate(
      adId,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    return updated?.clicks ?? 0;
  }
}
