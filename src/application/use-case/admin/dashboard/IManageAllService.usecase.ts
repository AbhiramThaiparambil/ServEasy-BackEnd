export interface IManageAllServiceUseCase {
  makeInactiveAllService(serviceProviderId: string): Promise<void>;
  makeActiveAllService(serviceProviderId: string): Promise<void>;
}
