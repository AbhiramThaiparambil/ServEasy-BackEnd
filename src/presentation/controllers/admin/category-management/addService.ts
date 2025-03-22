import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddService } from "../../../../application/use-case/admin/category-management/addService";

export const addServiceHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId, newServiceName, newServiceDescription } = req.body;
    
    const addService = container.resolve(AddService);
    const service = await addService.execute(categoryId, {
      serviceName: newServiceName,
      serviceDescription: newServiceDescription,
    });

    res.status(200).json({ message: service });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
