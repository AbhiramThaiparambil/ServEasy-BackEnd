import { IAddress } from "../../../../../domain/entities/IAddress";

export interface IGetAddress {
  execute(userId: string): Promise<IAddress[] | null>;
}
