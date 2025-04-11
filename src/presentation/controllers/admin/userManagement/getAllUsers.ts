import { Request, Response } from "express";
import { container } from "tsyringe";

import { getAllUsersUseCase } from "../../../../application/use-case/admin/userManagement/getAllUsersUseCase";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 0;
    const skip = page * limit;
    const getAdminProfileUseCase = container.resolve(getAllUsersUseCase);
 

    const {users,count} = await getAdminProfileUseCase.execute(skip,limit);
     console.log(users);
       
    res.status(200).json({ users,count });
  } catch (error) {}
};
