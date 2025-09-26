import { Types } from 'mongoose';
import { IServiceProvider, IServiceProviderRegistration } from '../entities/IServiceProvider';
import { ISubscription } from '../entities/ISubscription';
import {
  IFindSubscriptionsResult,
  ISubscriptionWithPlan,
} from '../../utils/types/dto/ISubscriptionWithPlan';
export interface IServiceProviderRepository {
  create(ServiceProvider: IServiceProviderRegistration): Promise<IServiceProvider>;
  findByEmail(email: string): Promise<IServiceProvider | null>;
  // findByPhone(phone:string):Promise<IServiceProvider |null>

  findById(id: string | Types.ObjectId): Promise<IServiceProvider | null>;
  update(id: string, data: Partial<IServiceProvider>): Promise<IServiceProvider | null>;

  findServiceProviderSkipLimit(
    skip: number,
    limit: number,
    search: string
  ): Promise<IServiceProvider[]>;
  findByUserID(userId: string): Promise<IServiceProvider | null>;
  unblockService(ServiceProviderId: string): Promise<boolean>;
  findServiceProvidersCount(): Promise<number>;
  blockService(ProviderId: string): Promise<boolean>;
  addSubscription(
    providerId: string,
    subscription: ISubscription
  ): Promise<IServiceProvider | null>;

  findSubscriptions(providerId: string): Promise<IFindSubscriptionsResult | null>;
  findSubscriptionIsActiveOrNot(providerId: string): Promise<{ isActive: boolean }>;
  expireSubscriptions(): Promise<number>;

  findLatestActiveSubscription(providerId: string): Promise<ISubscription | null>;
}
