import { injectable } from "tsyringe";
import { ISubscriptionPlan } from "../../domain/entities/ISubscriptionPlan";
import { SubscriptionPlanModel } from "../models/SubscriptionPlanModel";
import { ISubscriptionPlanRepository } from "../../domain/repositories/ISubscriptionPlanRepository";

@injectable()
export class SubscriptionPlanRepository implements ISubscriptionPlanRepository {
  
  async createSubscriptionPlan(plan: ISubscriptionPlan): Promise<ISubscriptionPlan> {
    const newPlan = new SubscriptionPlanModel(plan);
    return (await newPlan.save()).toObject(); 
  }

  async findSubscriptionPlanById(id: string): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findById(id);
  }

  async findAllSubscriptionPlans(): Promise<ISubscriptionPlan[]> {
    return await SubscriptionPlanModel.find();
  }

  async updateSubscriptionPlanById(id: string, data: Partial<ISubscriptionPlan>): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteSubscriptionPlanById(id: string): Promise<boolean> {
    const result = await SubscriptionPlanModel.findByIdAndDelete(id);
    return !!result;
  }
}
