import { IAd } from "../../../../domain/entities/IAd";

export interface IEditAdUseCase {
  execute(adId: string, data: Partial<IAd>): Promise<IAd | null>;
}
