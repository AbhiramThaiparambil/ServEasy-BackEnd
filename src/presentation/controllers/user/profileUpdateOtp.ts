import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUpdateOtp } from "../../../application/use-case/User/profileUpdateOtp";

export const profileUpdateOtp = async (req: Request, res: Response) => {
  try {
    const { userId, key, otp } = req.body;

    const profileUpdateOtp = container.resolve(ProfileUpdateOtp);
    const result = await profileUpdateOtp.execute(userId, key, otp);
    console.log(result);
    
    if (result.success) {
      res.status(200).json({ message: result.success });
    } else if (result.errorMessage) {
      res.status(400).json({ errorMessage: result.errorMessage });
    } else {
      res.status(500).json({ errorMessage: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in profileUpdateOtp:", error);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
};
