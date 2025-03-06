import { Request, Response } from "express";
import { container } from "tsyringe";

import { getAllUsersUseCase } from "../../../../application/use-case/admin/getAllUsersUseCase";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("all users");

    const getAdminProfileUseCase = container.resolve(getAllUsersUseCase);

    const data = await getAdminProfileUseCase.execute();

    res.status(200).json({ data });
  } catch (error) {}
};
