import { Request, Response } from "express";
import { ResendOtp } from "../../../../application/use-case/User/auth/ResendOtp";
import { container } from "tsyringe";
import { HttpStatus } from "../../../../constants/HttpStatus";
export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  const resendOtp = await container.resolve(ResendOtp);

  if (req.body.email) {
    const result = await resendOtp.sendEmailOtp(req.body.email);
    console.log(result);
    res.status(HttpStatus.OK).json({ message: result });
    return;
  } else if (req.body.phone) {
    const result = await resendOtp.sendSmsOtp(req.body.phone);
    res.status(HttpStatus.OK).json({ message: result });
    return;
  } else {
    res.status(HttpStatus.BAD_REQUEST).json({ errorMessage: "email or phone is required" });
  }

  try {
  } catch (error) {
    console.log(error);
  }
};
