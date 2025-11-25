import { injectable, inject } from 'tsyringe';
import { IGetAllSubscriptionPlansUseCase } from './IGetAllSubscriptionPlansUseCase';
import { ISubscriptionPlanRepository } from '../../../../domain/repositories/ISubscriptionPlanRepository';
import { ISubscriptionPlan } from '../../../../domain/entities/ISubscriptionPlan';
import { REPOSITORY_TOKENS } from '../../../../utils/constants/tokens';


@injectable()
export class GetAllSubscriptionPlansUseCase
  implements IGetAllSubscriptionPlansUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<ISubscriptionPlan[]> {
    const plans = await this.subscriptionPlanRepository.findAllSubscriptionPlans()

    return plans;
  }
}
