export interface IExpireAdsUseCase {
  execute(): Promise<number>; 
}
