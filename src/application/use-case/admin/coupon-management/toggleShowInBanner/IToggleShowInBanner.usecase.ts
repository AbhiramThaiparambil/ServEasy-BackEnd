export interface IToggleShowInBannerUseCase {
  execute(id: string, show: boolean): Promise<void>;
}
