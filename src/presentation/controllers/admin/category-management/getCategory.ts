import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCategory } from "../../../../application/use-case/admin/category-management/GetCategory";

export const getCategoryHandler = async (req: Request, res: Response) => {
  try {
    const getCategoryUseCase = container.resolve(GetCategory);
    const categories = await getCategoryUseCase.getActiveCategory(); 

      

    res.status(200).json(categories); 
  } catch (error) {
    console.error("Error fetching categories:", error); 
    res.status(500).json({ message: "Internal server error." }); 
  }
};
