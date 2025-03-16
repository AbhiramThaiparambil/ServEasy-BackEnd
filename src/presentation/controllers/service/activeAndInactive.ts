import { Request, Response } from "express";
import { container } from "tsyringe";
import { BlockUnblockSericeUseCase } from "../../../application/service-management/BlockUnblockSericeUseCase";

export const blockUnblockService = async (req: Request, res: Response) => {
  try {
    const { serviceId, action } = req.body;

    if (!serviceId || !action) {
      res.status(400).json({ message: "serviceId and action are required" });
      return;
    }

    const blockUnblockService = container.resolve(BlockUnblockSericeUseCase);
    let result: boolean;

    if (action === "Block") {
      result = await blockUnblockService.blockService(serviceId);
    } else if (action === "Unblock") {
      result = await blockUnblockService.unblockService(serviceId);
    } else {
      res.status(400).json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
      return;
    }

    if (result) {
      res.status(200).json({ message: `Service ${action.toLowerCase()}ed successfully` });
      return;
    } else {
      res.status(400).json({ message: `Failed to ${action.toLowerCase()} service` });
      return;
    }
  } catch (error: any) {
    console.error("Error in blockUnblockService:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
    return;
  }
};
