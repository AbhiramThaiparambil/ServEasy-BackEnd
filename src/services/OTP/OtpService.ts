import { injectable, singleton } from "tsyringe";

@singleton()
@injectable()
export class Otpservice {
  private otpStore: Map<string, { otp: string; expiresAt: number }> = new Map();

  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  saveOtp(email: string, otp: string) {
    const expiresAt = Date.now() + 5 * 60 * 1000;
    this.otpStore.set(email, { otp, expiresAt });
  }
  verifyOtp(email: string, otp: string): boolean {
    console.log(this.otpStore);

    const data = this.otpStore.get(email);
    // if (!data || data.expiresAt < Date.now()) {
    if (data) {
      return data?.otp === otp;
    }
    return false;
  }
  removeOtp(email: string) {
    this.otpStore.delete(email);
  }
}
