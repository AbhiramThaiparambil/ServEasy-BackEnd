import nodemailer, { Transporter } from "nodemailer";
import {injectable} from 'tsyringe'
import {config} from 'dotenv'
config()


@injectable()
export class EmailOtpService {
  private transporter!: Transporter;

  constructor() {
    console.log(process.env.EMAIL_SERVICE_HOST as string);
    
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST as string,
      port: Number(process.env.EMAIL_SERVICE_PORT),
      secure: process.env.EMAIL_SERVICE_SECURE=== "true", // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVICE_EMAIL as string,
        pass: process.env.EMAIL_SERVICE_PASSWORD,
      },
    });
  }

  async sendEmail(toEmail: string, Otp: string): Promise<void> {
    console.log(toEmail +"to email is this ");
    
    const mail = {
      from: process.env.EMAIL_SERVICE_EMAIL as string,
      to: toEmail,
      subject: `your otp is ${Otp}`,
    };
    console.log(`your otp is ${Otp}`);
    
    await this.transporter.sendMail(mail);
  }
}
