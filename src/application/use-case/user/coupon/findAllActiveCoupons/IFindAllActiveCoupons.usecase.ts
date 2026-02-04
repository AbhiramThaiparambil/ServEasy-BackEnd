import { ICoupon } from '../../../../../domain/entities/ICoupon';

export interface IFindAllActiveCouponsUseCase {
  execute(): Promise<ICoupon[]>;
}
