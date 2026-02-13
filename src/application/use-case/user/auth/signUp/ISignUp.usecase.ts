import { IUser } from "../../../../../domain/entities/IUser";
import { SignUpRequestDTO } from "../../../../dtos/user/auth/signUp/SignUpDTO";

export interface ISignUpUseCase {
  execute(data: SignUpRequestDTO): Promise<{ user: IUser } | { errorMessage: string }>;
}
