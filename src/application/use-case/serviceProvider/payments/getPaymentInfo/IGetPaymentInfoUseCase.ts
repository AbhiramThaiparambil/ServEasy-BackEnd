export interface IGetPaymentInfoUseCase {
  execute(
    serviceProviderId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<any>;
}
