import { Request, Response } from "express";
import { container } from "tsyringe";
import { BlockUnblockCategory } from "../../../../application/use-case/admin/category-management/blockUnblockCategory";

export const blockUnblockCategoryHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      res.status(400).json({ message: "Category ID is required" });
      return;
    }

    const blockUnblockCategoryUseCase = container.resolve(BlockUnblockCategory);
    const message = await blockUnblockCategoryUseCase.execute(categoryId);

    res.status(200).json({ message });
    return;
  } catch (error) {
    console.error("Error updating category visibility:", error);
    res.status(500).json({ message: "Internal server error" });

    return;
  }
};
