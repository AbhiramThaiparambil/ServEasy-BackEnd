export interface IGetPaymentInfoUseCaseServiceProvider {
  execute(
    serviceProviderId: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<any>;
}
