// router.post("/refresh-token", refreshAccessToken);


import {Request,Response} from 'express'

import { TokenService } from '../../../services/auth/TokenService'
import {container} from 'tsyringe'
import { MongoUserRepository } from '../../../infrastructure/repositories/UserRepositoriey'


export const refreshAccessToken = async (req:Request ,res:Response)=>{
    console.log(' access token expired new refresh Token is called');
     
  const {refreshToken}=req.cookies;
  
    if(!refreshToken){
        console.log('hey');
        
        res.status(401).json({error:"Refresh token is missing"})
        return
    }
  try {
    const tokenService=container.resolve(TokenService)
    const userRepo=container.resolve(MongoUserRepository)
    const decoded=tokenService.verifyRefreshToken(refreshToken)
    if(!decoded){
        res.status(401).json({error:"Refresh token is missing"})
        return
    }
    console.log(decoded.userId);
    
   const user = await userRepo.findById(decoded.userId)
   console.log(user);
   
   if(!user){
     res.status(404).json({error:'user no found'})
    return
   }

   const newAccessToken=await tokenService.generateAccessToken(user._id+"")
   console.log("newAccessToken");
   console.log(newAccessToken);
   
   
   res.json({accessToken:newAccessToken})
   return

  } catch (error) {
    console.log(error);
    
     res.status(500).json({error})
    return
  }

}