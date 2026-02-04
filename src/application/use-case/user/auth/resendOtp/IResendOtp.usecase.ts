export interface IResendOtp {
  sendEmailOtp(email: string): Promise<string>;
  sendSmsOtp(phone: string): Promise<string>;
}
