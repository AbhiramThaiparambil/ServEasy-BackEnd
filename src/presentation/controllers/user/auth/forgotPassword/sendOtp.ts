import { Request, Response } from "express";
import { SendOtp } from "../../../../../application/use-case/User/auth/forgotPassword/sendOtp";
import { container } from "tsyringe";


export const sendOtp=async (req:Request,res:Response)=>{
   try{
        const{email,phone}=req.body;
        console.log(email);
        
        if(!email && !phone){
           res.status(400).json({Message: "Email or phone number is required"})
           return
        }
        const sendOtp=container.resolve(SendOtp)
         if(email){
            const message = await  sendOtp.sendEmailOtp(email)
            if(message.successMessage){
                res.status(200).json({Message:message})
            }
            if(message.errorMessage){
                res.status(400).json({Message:message.errorMessage})

            }
            
         }

         if(phone){
           const message = await sendOtp.sendSmsOtp(phone)
           if(message.successMessage){
            res.status(200).json({Message:message})
        }
        if(message.errorMessage){
            res.status(400).json({Message:message.errorMessage})

        }
         }
   }catch(e){

       console.log(e);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
        return
       
   }
}