import { ICoupon } from '../../domain/entities/ICoupon';
import { CouponModel } from '../models/couponModel';
import { injectable } from 'tsyringe';
import { Types } from 'mongoose';
import { ICouponRepository } from '../../domain/repositories/IcouponRepository';

@injectable()
export class CouponRepository implements ICouponRepository {
  async findAllCoupons(): Promise<ICoupon[]> {
    return await CouponModel.find().exec();
  }

  async createCoupon(coupon: ICoupon): Promise<ICoupon> {
    const newCoupon = new CouponModel(coupon);
    return await newCoupon.save();
  }

  async makeCouponInactive(id: string): Promise<void> {
    await CouponModel.updateOne({ _id: new Types.ObjectId(id) }, { isActive: false }).exec();
  }

  async toggleShowInBanner(id: string, show: boolean): Promise<void> {
    await CouponModel.updateOne({ _id: new Types.ObjectId(id) }, { showInBanner: show }).exec();
  }

  async findAllActiveCoupons(): Promise<ICoupon[]> {
    return await CouponModel.find({
      isActive: true,
      validFrom: { $lte: new Date() },
      validTo: { $gte: new Date() },
    }).exec();
  }

  async updateCouponShowInBanner(id: string, action: boolean): Promise<boolean> {
    const result = await CouponModel.updateOne({ _id: id }, { $set: { showInBanner: action } });
    return result.modifiedCount > 0;
  }

  async updateCouponStatus(id: string, action: boolean): Promise<boolean> {
    const result = await CouponModel.updateOne({ _id: id }, { $set: { isActive: action } });
    return result.modifiedCount > 0;
  }

  async findFeaturedCoupons(): Promise<ICoupon[] | []> {
    return await CouponModel.find({
      isActive: true,
      showInBanner: true,
      validFrom: { $lte: new Date() },
      validTo: { $gte: new Date() },
    }).lean();
  }

  async findByCode(code: string): Promise<ICoupon | null> {
    return await CouponModel.findOne({ code });
  }

  async hasUserUsedCoupon(code: string, userId: string): Promise<boolean> {
    const objectId = new Types.ObjectId(userId);
    const record = await CouponModel.findOne({ code, usedBy: objectId });
    return !!record;
  }

  async checkIsExceedMaxUseLimit(_id: string): Promise<boolean> {
    const record = await CouponModel.findById(_id);
    if (!record) return true;
    if (!record.usageLimit) return false;
    return record.usedBy.length >= record.usageLimit;
  }

  async markUsedByUser(code: string, userId: string): Promise<void> {
    await CouponModel.updateOne(
      { code },
      { $addToSet: { usedBy: new Types.ObjectId(userId) } } 
    );
  }
}
