import { IUser } from "../../../../../domain/entities/IUser";

export interface ISignUpUseCase {
  execute(data: {
    userName: string;
    email?: string;
    phone?: string;
    password: string;
  }): Promise<{ user: IUser } | { errorMessage: string }>;
}
