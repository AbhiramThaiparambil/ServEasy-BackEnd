import { inject, injectable } from 'tsyringe';
import { ICouponRepository } from '../../../../domain/repositories/IcouponRepository';
import { IMakeCouponInactiveUseCase } from './IMakeCouponInactiveUseCase';

@injectable()
export class MakeCouponInactiveUseCase implements IMakeCouponInactiveUseCase {
  constructor(@inject('ICouponRepository') private couponRepo: ICouponRepository) {}

  async execute(id: string, action: boolean): Promise<void> {
        console.log('__________________________====_______________===_________');

    const res = await this.couponRepo.updateCouponStatus(id, action);
    console.log('__________________________====_______________===_________');

    console.log(res);
    return;
  }
}
