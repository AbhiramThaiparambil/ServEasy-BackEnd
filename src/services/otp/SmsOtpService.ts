import twilio from "twilio";
import { injectable } from "tsyringe";
import { ISmsOtpService } from "./ISmsOtpService";
@injectable()
export class SmsOtpService implements ISmsOtpService {
  private client!: twilio.Twilio;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID as string,
      process.env.TWILIO_AUTH_TOKEN as string
    );
  }

  async SendOtp(to: string, otp: string): Promise<void> {
    console.log("sms service called");

    try {
      const message = `Your ServeEase OTP is ${otp}`;
      await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER as string,
        to: `+91${to}`,
      });
      console.log(`smsOtp is send ${to}-- ${otp}`);
    } catch (error) {
      console.log(error);
    }
  }
}
