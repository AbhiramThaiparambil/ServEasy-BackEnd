import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategory } from "../../../../application/use-case/admin/category-management/deleteCategory";

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
       res.status(400).json({ message: "Category ID is required" });
    
       return
    }

    const deleteCategoryUseCase = container.resolve(DeleteCategory);
    const message = await deleteCategoryUseCase.execute(id);

     res.status(200).json({ message });
     return
  } catch (error) {
    console.error("Error deleting category:", error);
     res.status(500).json({ message: "Internal server error" });
    return
  }
};
