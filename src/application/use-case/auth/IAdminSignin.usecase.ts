import { IAuthResponse } from "../../../domain/entities/IAuthResponse";

export interface IAdminSignin {
  signByEmail(email: string, password: string): Promise<IAuthResponse | null>;
  signByPhone(phone: string, password: string): Promise<IAuthResponse | null>;
}
