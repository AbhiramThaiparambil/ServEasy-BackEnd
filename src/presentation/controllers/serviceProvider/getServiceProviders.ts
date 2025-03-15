import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetServiceProvider } from "../../../application/use-case/serviceProvider/auth/getServiceProvider";
export const getServiceProvider = async (req: Request, res: Response) => {
  try {
  
    const getServiceProvider = container.resolve(GetServiceProvider);
    const user = res.locals.user;
    const result=await getServiceProvider.execute(user.userId)
    res.status(201).json({serviceProvider:result});
  } catch (error) {}
};
