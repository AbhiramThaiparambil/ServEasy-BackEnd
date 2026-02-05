import { ResetPasswordRequestDTO } from "../../../../../dtos/user/auth/forgotPassword/ResetPasswordDTO";

export interface IResetPasswordUseCase {
  resetPasswordEmail(
    data: ResetPasswordRequestDTO
  ): Promise<string | void>;

  resetPasswordPhone(
    data: ResetPasswordRequestDTO
  ): Promise<string | void>;
}
