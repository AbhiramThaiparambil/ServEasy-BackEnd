import { Request, Response } from "express";
import { container } from "tsyringe";
import { BlockUnblockCategoryService } from "../../../../application/use-case/admin/category-management/blockUnblockService ";


export const blockUnblockServiceHandler = async (req: Request, res: Response) => {
    try {
      const { categoryId, serviceId } = req.body;
   
      console.log( req.body);
      
      if (!categoryId || !serviceId) {
         res.status(400).json({ message: "Category ID and Service ID are required" });
         return
        }
  
      const blockUnblockCategoryUseCase = container.resolve(BlockUnblockCategoryService);
      const message = await blockUnblockCategoryUseCase.execute(categoryId, serviceId);
  
       res.status(200).json({ message });
       return
    } catch (error) {
      console.error("Error updating service visibility:", error);
       res.status(500).json({ message: "Internal server error" });
      return
    }
  };