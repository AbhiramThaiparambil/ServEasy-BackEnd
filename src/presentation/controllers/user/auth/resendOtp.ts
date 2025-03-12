import { Request, Response } from "express";
import { ResendOtp } from "../../../../application/use-case/User/auth/ResendOtp";
import { container } from "tsyringe";
export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  const resendOtp = await container.resolve(ResendOtp);

  if (req.body.email) {
    const result = await resendOtp.sendEmailOtp(req.body.email);
    console.log(result);
    res.status(200).json({ message: result });
    return;
  } else if (req.body.phone) {
    const result = await resendOtp.sendSmsOtp(req.body.phone);
    res.status(200).json({ message: result });
    return;
  } else {
    res.status(400).json({ errorMessage: "email or phone is required" });
  }

  try {
  } catch (error) {
    console.log(error);
  }
};
