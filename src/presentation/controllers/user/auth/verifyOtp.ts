// import { Request, Response } from "express";
// import { VerifyOtp } from "../../../../application/use-case/User/auth/VerifyOtp"
// import { container } from "tsyringe";
// import { HttpStatus } from "../../../../constants/HttpStatus";
// export const verifyOtp = async (req: Request, res: Response) => {
//   try {
//     const { otp, sender } = req.body;
//     const verifyOtpUseCase = container.resolve(VerifyOtp);
//     const result = await verifyOtpUseCase.execute(sender, otp);
//     console.log(result);
//     if (result.success) {
//       res.status(HttpStatus.OK).json({ message: result.success });
//     } else if (result.errorMessage) {
//       res.status(HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
