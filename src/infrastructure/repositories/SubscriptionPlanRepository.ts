import { injectable } from "tsyringe";
import { ISubscriptionPlan } from "../../domain/entities/ISubscriptionPlan";
import { SubscriptionPlanModel } from "../models/SubscriptionPlanModel";
import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";
import { Types } from "mongoose";

@injectable()
export class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
  
  async createSubscriptionPlan(plan: ISubscriptionPlan): Promise<ISubscriptionPlan|null> {
 try {
     const newPlan = new SubscriptionPlanModel(plan);
    return (await newPlan.save()).toObject(); 
 } catch (error) {
   console.log(error)
  return  null

 }
  }

  async findSubscriptionPlanById(id: string): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findById(new Types.ObjectId(id));

}

  async findAllSubscriptionPlans(): Promise<ISubscriptionPlan[]> {
    return await SubscriptionPlanModel.find();
  }

  async updateSubscriptionPlanById(id: string, data: Partial<ISubscriptionPlan>): Promise<ISubscriptionPlan | null> {
     try {
          return await SubscriptionPlanModel.findByIdAndUpdate(id, data, { new: true });

     } catch (error) {
      console.log(error)
      return null
     }
  }

  async deleteSubscriptionPlanById(id: string): Promise<boolean> {
    const result = await SubscriptionPlanModel.findByIdAndDelete(id);
    return !!result;
  }



  
}
