
import {Request,Response} from 'express'
import { container } from 'tsyringe'
import { ResetPassword} from "../../../../../application/use-case/User/auth/forgotPassword/resetPassword";
import { HttpStatus } from '../../../../../constants/HttpStatus';

export const resetPassword = async (req:Request,res:Response)=>{
try {
    const {password,email,phone}=req.body
    
     if(!password ){
        res.status(HttpStatus.BAD_REQUEST).json({Message:'email password is required'})
        return
     }else if(!email&& !phone){
        res.status(HttpStatus.BAD_REQUEST).json({Message:'email or phone is required'})
        return
     }

     const resetPassword = container.resolve(ResetPassword)
     if(email){
        const result= await resetPassword.resetPasswordEmail(password,email)
        
        res.status(HttpStatus.OK).json({Message:result})

     }else if(phone){
       const result= await resetPassword.resetPasswordPhone(password,phone)
         
         res.status(HttpStatus.OK).json({Message:result})
         
     }

} catch (error) {
    console.error("Error in resetPassword:", error);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ Message: "Something went wrong. Please try again later." });
     return
    }
}