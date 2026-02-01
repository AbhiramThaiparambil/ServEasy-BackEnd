export interface IGetPaymentInfoUseCase {
  execute(startDate?: Date | null, endDate?: Date | null): Promise<any>;
}
