import { Request, Response } from "express";
import { container } from "tsyringe";
import { BlockUnblockSericeProvider } from "../../../../application/use-case/admin/serviceProviderManagement/blockUnblockProvider";


export const blockUnblockServiceProvider = async (req: Request, res: Response) => {
  try {
    const { providerId, action } = req.body;

    if (!providerId || !action) {
      res.status(400).json({ message: "serviceId and action are required" });
      return;
    }

    const blockUnblockService = container.resolve(BlockUnblockSericeProvider);
    let result: boolean;

    if (action === "Block") {
      result = await blockUnblockService.blockServiceProvider(providerId);
    } else if (action === "Unblock") {
      result = await blockUnblockService.unblockServiceProvider(providerId);
    } else {
      res.status(400).json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
      return;
    }

    if (result) {
      res.status(200).json({ message: `Service Provider ${action.toLowerCase()}ed successfully` });
      return;
    } else {
      res.status(400).json({ message: `Service Provider  to ${action.toLowerCase()} service` });
      return;
    }
  } catch (error: any) {
    console.error("Error in blockUnblockService:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
    return;
  }
};
