
import {Request,Response} from 'express'
import { container } from 'tsyringe'
import { ResetPassword} from "../../../../../application/use-case/User/auth/forgotPassword/resetPassword";

export const resetPassword = async (req:Request,res:Response)=>{
try {
    const {password,email,phone}=req.body
    console.log(password,email,phone);
    
     if(!password ){
        res.status(400).json({Message:'email password is required'})
        return
     }else if(!email&& !phone){
        res.status(400).json({Message:'email or phone is required'})
        return
     }

     const resetPassword = container.resolve(ResetPassword)
     if(email){
        const result= await resetPassword.resetPasswordEmail(password,email)
        
        res.status(200).json({Message:result})

     }else if(phone){
       const result= await resetPassword.resetPasswordPhone(password,phone)
         
         res.status(200).json({Message:result})
         
     }

} catch (error) {
    console.error("Error in resetPassword:", error);
     res.status(500).json({ Message: "Something went wrong. Please try again later." });
     return
    }
}