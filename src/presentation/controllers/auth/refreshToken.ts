// router.post("/refresh-token", refreshAccessToken);


import {Request,Response} from 'express'

import { TokenService } from '../../../services/auth/TokenService'
import {container} from 'tsyringe'
import { MongoUserRepository } from '../../../infrastructure/repositories/UserRepositoriey'


export const refreshAccessToken = async (req:Request ,res:Response)=>{
    console.log('refresh Token is called------------------');
     
  const {refreshToken}=req.cookies;
    if(!refreshToken){
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
   const user = await userRepo.findById(decoded.id)
   if(!user){
     res.status(404).json({error:'user no found'})
    return
   }

   const newAccessToken=tokenService.generateAccessToken(user._id+"")
   res.json({accessToken:newAccessToken})
   return

  } catch (error) {
     res.status(500).json({error})
    return
  }

}