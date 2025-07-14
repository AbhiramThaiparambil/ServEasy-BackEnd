export interface IMakeCouponInactiveUseCase {
  execute(id: string,action:boolean): Promise<void>;
}
