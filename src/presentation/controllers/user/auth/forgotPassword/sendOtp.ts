import { Request, Response } from "express";
import { SendOtp } from "../../../../../application/use-case/User/auth/forgotPassword/sendOtp";
import { container } from "tsyringe";
import { HttpStatus } from "../../../../../constants/HttpStatus";


export const sendOtp=async (req:Request,res:Response)=>{
   try{
        const{email,phone}=req.body;
        console.log(email);
        
        if(!email && !phone){
           res.status(HttpStatus.BAD_REQUEST).json({Message: "Email or phone number is required"})
           return
        }
        const sendOtp=container.resolve(SendOtp)
         if(email){
            const message = await  sendOtp.sendEmailOtp(email)
            if(message.successMessage){
                res.status(HttpStatus.OK).json({Message:message})
            }
            if(message.errorMessage){
                res.status(HttpStatus.BAD_REQUEST).json({Message:message.errorMessage})

            }
            
         }

         if(phone){
           const message = await sendOtp.sendSmsOtp(phone)
           if(message.successMessage){
            res.status(HttpStatus.OK).json({Message:message})
        }
        if(message.errorMessage){
            res.status(HttpStatus.BAD_REQUEST).json({Message:message.errorMessage})

        }
         }
   }catch(e){

       console.log(e);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong. Please try again later." });
        return
       
   }
}