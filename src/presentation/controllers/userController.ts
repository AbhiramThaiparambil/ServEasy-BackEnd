import { Request, Response } from "express";
import { RegisterUser } from "../../application/use-case/RegisterUser";
import { container } from "tsyringe";

export const sendOtp = async (req: Request, res: Response) => {
  try {
    console.log('---------------------------otp ');
    
    // const { email } = req.body;
     if(req?.body?.email){
    const registerUser = container.resolve(RegisterUser);
    await registerUser.sendEmailOtp(req?.body?.email);
    res.status(200).json({ message: "Otp sent to email" });
}else if(req?.body?.mobileMumber){
   const registerUser=container.resolve(RegisterUser)
   registerUser.sendSmsOtp(req?.body?.mobileMumber)   
   res.status(200).json({ message: "Otp sent to Sms" });

}

  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: error });
  }
};



export const register = async (req: Request, res: Response) => {
  try {
   
    console.log('---------------------------sign ');

        const registerUser = container.resolve(RegisterUser);

    const { userName, email, phone, password } = req.body;

     const data:{
        userName:string;
        password:string;
        phone?:string;
        email?:string
     }={
        userName,
        password
     }

     if(phone){
        data.phone=phone
     }else{
        data.email=email
     }

    const result = await registerUser.execute(data);

     
    
    if (result.user) {
        res.status(201).json({ message: 'Your account has been successfully created'});

    } else if (result.errorMessage) {

      res.status(400).json({ message: result.errorMessage });
    }
  } catch (error) {
    console.log(error);
    
    res.status(400).json({ message: error });
  }
};

