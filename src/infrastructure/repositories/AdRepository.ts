import { injectable } from 'tsyringe';
import { IAdRepository } from '../../domain/repositories/IAdRepository';
import { IAd } from '../../domain/entities/IAd';
import { AdModel } from '../models/AdModel';


@injectable()
export class AdRepository implements IAdRepository {

async createAd(data: IAd): Promise<IAd> {
  const ad = await AdModel.create(data);
  return ad.toObject() as IAd;
}

//   async getAdsByProvider(providerId: string): Promise<IAd[]|[] > {
    
//     return await  AdModel.find({ providerId }).sort({ createdAt: -1 }).learn()
 
// }




  async updateAd(id: string, data: Partial<IAd>): Promise<IAd | null> {
    return await AdModel.findByIdAndUpdate(id, data, { new: true });
  }

  async getAdById(id: string): Promise<IAd | null> {
    return await AdModel.findById(id);
  }



  async blockAd(id: string): Promise<boolean> {
    const result = await AdModel.updateOne(
      { _id: id },
      { status: 'blocked' }
    );
    return result.modifiedCount > 0;
  }

  async unblockAd(id: string): Promise<boolean> {
    const result = await AdModel.updateOne(
      { _id: id },
      { status: 'approved' }
    );
    return result.modifiedCount > 0;
  }

  async expireAd(id: string): Promise<boolean> {
    const result = await AdModel.updateOne(
      { _id: id },
      { status: 'expired' }
    );
    return result.modifiedCount > 0;
  }
}
