export  interface IIncreaseAdClicksUseCase {


   execute(adId: string): Promise<number> 
  }