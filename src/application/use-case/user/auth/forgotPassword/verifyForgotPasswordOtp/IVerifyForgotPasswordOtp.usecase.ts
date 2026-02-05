import { VerifyOtpRequestDTO } from "../../../../../dtos/user/auth/verifyOtp/VerifyOtpDTO";

export interface IVerifyForgotPasswordOtpUseCase {
  execute(data: VerifyOtpRequestDTO): Promise<boolean>;
}
