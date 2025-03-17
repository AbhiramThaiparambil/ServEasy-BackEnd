import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllServics } from "../../../../application/use-case/admin/service-management/getAllServices";
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const getAllservices = container.resolve(GetAllServics);

    const allServices = await getAllservices.execute();

    res.status(200).json({ allServices });
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};
