import { Request, Response } from "express";
import { VerifyOtp } from "../../application/use-case/verifyOtp";
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

// export const sendOtp = async (req: Request, res: Response) => {
//   try {
//     console.log('---------------------------otp ');

//     // const { email } = req.body;
//      if(req?.body?.email){
//     const registerUser = container.resolve(RegisterUser);
//     await registerUser.sendEmailOtp(req?.body?.email);
//     res.status(201).json({ message: "Otp sent to email",data:{regInfo:req?.body?.email} });
// }else if(req?.body?.phone){
//    const registerUser=container.resolve(RegisterUser)
//    registerUser.sendSmsOtp(req?.body?.phone)
//    res.status(201).json({ message: "Otp sent to email",data:{regInfo:req?.body?.phone} });

// }

//   } catch (error) {
//     console.log(error);

//     res.status(400).json({ message: error });
//   }
// };
