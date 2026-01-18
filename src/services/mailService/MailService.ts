import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";
import { config } from "dotenv";
import path from "path";
import { readFileSync } from "fs";
import { IEmailService } from "./IEmailService";
config();

@injectable()
export class EmailService implements IEmailService {
  private transporter!: Transporter;

  constructor() {
    console.log(process.env.EMAIL_SERVICE_HOST as string);

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST as string,
      port: Number(process.env.EMAIL_SERVICE_PORT),
      secure: process.env.EMAIL_SERVICE_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVICE_EMAIL as string,
        pass: process.env.EMAIL_SERVICE_PASSWORD,
      },
    });
  }
  async sendProviderRejectedEmail(
    toEmail: string,
    providerName?: string,
    reason?: string
  ): Promise<void> {
    const message = `Hello ${
      providerName ?? "User"
    }, unfortunately your provider request was rejected. Reason: ${
      reason ?? "Not specified."
    }`;

    await this.transporter.sendMail({
      from: process.env.EMAIL_SERVICE_EMAIL,
      to: toEmail,
      subject: "Account Rejected",
      text: message,
    });
  }

  async sendOtpEmail(toEmail: string, otp: string): Promise<void> {
    const templatePath = path.join(__dirname, "templates", "otp.html");
    let htmlContent = readFileSync(templatePath, "utf8");
    htmlContent = htmlContent.replace(/{{otp}}/g, otp);

    const mail = {
      from: process.env.EMAIL_SERVICE_EMAIL as string,
      to: toEmail,
      subject: `Your OTP is ${otp}`,
      html: htmlContent,
    };
    console.log("OTP : " + otp);

    await this.transporter.sendMail(mail);
  }
}
