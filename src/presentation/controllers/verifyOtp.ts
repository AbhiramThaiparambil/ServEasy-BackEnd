import { Request, Response } from "express";
import { VerifyOtp } from "../../application/use-case/VerifyOtp";
import { container } from "tsyringe";
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { otp, sender } = req.body;
    const verifyOtpUseCase = container.resolve(VerifyOtp);
    const result = await verifyOtpUseCase.execute(sender, otp);
    console.log(result);
    if (result.success) {
      res.status(200).json({ message: result.success });
    } else if (result.errorMessage) {
      res.status(400).json({ errorMessage: result.errorMessage });
    }
  } catch (error) {
    console.log(error);
  }
};

