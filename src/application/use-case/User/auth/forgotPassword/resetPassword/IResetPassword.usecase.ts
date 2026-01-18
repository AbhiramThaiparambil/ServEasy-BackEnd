export interface IResetPasswordUseCase {
  resetPasswordEmail(
    newPassword: string,
    email: string
  ): Promise<string | void>;

  resetPasswordPhone(
    newPassword: string,
    phone: string
  ): Promise<string | void>;
}
