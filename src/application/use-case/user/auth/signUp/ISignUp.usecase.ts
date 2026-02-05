import { IUser } from "../../../../../domain/entities/IUser";
import { SignUpRequestDTO } from "../../../../../application/dtos/user/auth/UserAuthDTO";

export interface ISignUpUseCase {
  execute(data: SignUpRequestDTO): Promise<{ user: IUser } | { errorMessage: string }>;
}
