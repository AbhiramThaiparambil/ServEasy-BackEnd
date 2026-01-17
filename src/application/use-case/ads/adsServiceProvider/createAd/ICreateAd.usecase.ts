import { IAd } from "../../../../../domain/entities/IAd";

export interface ICreateAdUseCase {
  execute(data: IAd): Promise<IAd | null>;
}
