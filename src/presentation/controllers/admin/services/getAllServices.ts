import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllServics } from "../../../../application/use-case/admin/service-management/getAllServices";
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 0;
    const skip = page * limit;
    const getAllservices = container.resolve(GetAllServics);

    const {allServices,count} = await getAllservices.execute(skip,limit);

    res.status(200).json({ allServices,count });
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
};
