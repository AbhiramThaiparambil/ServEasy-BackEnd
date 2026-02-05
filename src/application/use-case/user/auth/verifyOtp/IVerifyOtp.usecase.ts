import { VerifyOtpRequestDTO } from "../../../../dtos/user/auth/verifyOtp/VerifyOtpDTO";

export interface IVerifyOtpUseCase {
  execute(
    data: VerifyOtpRequestDTO
  ): Promise<
    | {
        success: string;
        accessToken: string;
        refreshToken: string;
      }
    | {
        errorMessage: string;
      }
  >;
}
