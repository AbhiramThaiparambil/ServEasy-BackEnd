import { Request, Response } from "express";
import { container } from "tsyringe";
import { IService } from "../../../domain/entities/IService";
import { GetService } from "../../../application/service-management/getServices";

export const getServices = async (req: Request, res: Response) => {
 try{
    console.log('-------------0-0-0-0-0-0');
    
  const getService = container.resolve(GetService);
    const user = res.locals.user;
    const result=await getService.execute(user.userId)

 }catch(e){
    console.log(e);
    
 }
}