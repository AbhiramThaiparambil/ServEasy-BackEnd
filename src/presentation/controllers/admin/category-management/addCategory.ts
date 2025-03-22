import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddCategory } from "../../../../application/use-case/admin/category-management/addCategory";

interface IServiceType {
  name: string;
  description: string;
}

interface ICategory {
  id?: string | number;
  category: string;
  typeService: IServiceType[];
}

export const addCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { newCategory } = req.body;
    console.log(newCategory);
    
    if (!newCategory) {
       res.status(400).json({ message: "Category is required" });
       return
    }

    const addCategoryUseCase = container.resolve(AddCategory);
      
    const data = await addCategoryUseCase.execute({category:newCategory});

     res.status(200).json({ data });
     return
  } catch (error) {
    console.error("Error adding category:", error);
     res.status(500).json({ message: "Internal server error" });
     return
    }
};
