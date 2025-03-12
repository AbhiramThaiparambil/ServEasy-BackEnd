import { Request, Response } from "express";
import { container } from "tsyringe";
import { blockUnblockUsersUseCase } from "../../../../application/use-case/admin/blockUnblockUsersUseCase";

export const blockUnblock = async (req: Request, res: Response) => {
  try {
    const { userId, action } = req.body;

    const blockUnblock = container.resolve(blockUnblockUsersUseCase);
    let data;
    if (action == "Block") {
      data = await blockUnblock.blockUser(userId);

      res.status(200).json({ data });
    } else {
      data = await blockUnblock.unblockUser(userId);

      res.status(200).json({ data });
    }

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "User not found or update failed." });
    }
  } catch (error) {}
};
