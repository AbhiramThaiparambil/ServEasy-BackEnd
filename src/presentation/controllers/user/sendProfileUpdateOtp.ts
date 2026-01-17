// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { ProfileUpdateOtp } from "../../../application/use-case/User/profileUpdateOtp";
// import { HttpStatus } from "../../../constants/HttpStatus";

// export const profileUpdateOtp = async (req: Request, res: Response) => {
//   try {
//     const { userId, key, otp } = req.body;

//     const profileUpdateOtp = container.resolve(ProfileUpdateOtp);
//     const result = await profileUpdateOtp.execute(userId, key, otp);
    
//     if (result.success) {
//       res.status(HttpStatus.OK).json({ message: result.success });
//     } else if (result.errorMessage) {
//       res.status(HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
//     } else {
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: "Internal server error" });
//     }
//   } catch (error) {
//     console.error("Error in profileUpdateOtp:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: "Internal server error" });
//   }
// };
