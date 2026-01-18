export interface IEmailService {
  sendProviderRejectedEmail(
    toEmail: string,
    providerName?: string,
    reason?: string
  ): Promise<void>;

  sendOtpEmail(toEmail: string, otp: string): Promise<void>;
}
