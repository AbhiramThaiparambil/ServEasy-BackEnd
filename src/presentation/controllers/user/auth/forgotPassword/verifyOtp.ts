import { Request, Response } from "express";
import { ForgotVerifyOtp } from "../../../../../application/use-case/User/auth/forgotPassword/forgotVerifyOtp";
import { container } from "tsyringe";

export const forgotVerifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, key } = req.body;

    if (!otp || !key) {
      res.status(400).json({ message: "OTP and key are required." });
      return;
    }

    const verifyOtp = container.resolve(ForgotVerifyOtp);
    const result = await verifyOtp.execute(otp, key);

    if (result === true) {
      res.status(200).json({ Message: "OTP verified successfully." });
      return;
    } else {
      res.status(401).json({ Message: "OTP expired or invalid." });
      return;
    }
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    res
      .status(500)
      .json({ Message: "Something went wrong. Please try again later." });
  }
  return;
};
