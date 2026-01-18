export interface IAdminGetAdsUseCase {
  execute(skip: number, limit: number): Promise<any>;
}
