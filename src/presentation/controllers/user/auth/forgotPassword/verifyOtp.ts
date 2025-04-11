import { Request, Response } from "express";
import { ForgotVerifyOtp } from "../../../../../application/use-case/User/auth/forgotPassword/forgotVerifyOtp";
import { container } from "tsyringe";
import { HttpStatus } from "../../../../../constants/HttpStatus";

export const forgotVerifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, key } = req.body;

    if (!otp || !key) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: "OTP and key are required." });
      return;
    }

    const verifyOtp = container.resolve(ForgotVerifyOtp);
    const result = await verifyOtp.execute(otp, key);

    if (result === true) {
      res.status(HttpStatus.OK).json({ Message: "OTP verified successfully." });
      return;
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({ Message: "OTP expired or invalid." });
      return;
    }
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ Message: "Something went wrong. Please try again later." });
  }
  return;
};
