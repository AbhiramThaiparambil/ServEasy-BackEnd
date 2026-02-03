export interface IGetServicesUseCase {
  execute(id: string): Promise<any>;
}
