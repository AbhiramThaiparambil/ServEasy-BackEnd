import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteService } from "../../../../application/use-case/admin/category-management/deleteService";

export const deleteServiceHandler = async (req: Request, res: Response) => {
  try {
    console.log('-----------------------------');
    
    const { categoryId, serviceId } = req.params;
     console.log(req.params);
     
    if (!categoryId || !serviceId) {
      res.status(400).json({ message: "Category ID and Service ID are required" });
      return;
    }

    const deleteServiceUseCase = container.resolve(DeleteService);
    const message = await deleteServiceUseCase.execute(categoryId, serviceId);

    res.status(200).json({ message });
  } catch (error) {
    console.error("Error deleting service from category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
