

import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditCategory } from "../../../../application/use-case/admin/category-management/editCategory";

export const editCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { categoryId, categoryName } = req.body;
    
    if (!categoryId || !categoryName) {
       res.status(400).json({ message: "Category ID and name are required" });
       return
    }

    const editCategoryUseCase = container.resolve(EditCategory);
    const data = await editCategoryUseCase.execute(categoryId, categoryName);
    
     res.status(200).json({ message: "Category updated successfully", data });
     return
    } catch (error) {
    console.error("Error updating category:", error);
     res.status(500).json({ message: "Internal server error" });
     return
    }
};