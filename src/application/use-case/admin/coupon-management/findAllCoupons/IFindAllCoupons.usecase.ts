import { ICoupon } from '../../../../../domain/entities/ICoupon';

export interface IFindAllCouponsUseCase {
  execute(): Promise<ICoupon[]>;
}
