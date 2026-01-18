export interface IOtpService {
  generateOtp(): string;

  saveOtp(email: string, otp: string): Promise<void>;

  verifyOtp(email: string, otp: string): Promise<boolean>;

  removeOtp(key: string): Promise<void>;
}
