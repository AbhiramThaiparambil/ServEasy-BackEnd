export interface ISmsOtpService {
  SendOtp(to: string, otp: string): Promise<void>;
}
