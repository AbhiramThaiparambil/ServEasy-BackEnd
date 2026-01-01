export interface IDeleteSlotUseCase {
  execute(id: string): Promise<boolean>;
}
