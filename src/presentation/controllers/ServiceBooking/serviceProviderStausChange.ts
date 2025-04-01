import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateServiceStatus } from "../../../application/use-case/bookService/updateBookingStatus";

export const serviceProviderStatusChange = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const { id, action } = req.params;
    const changeStatusContainer = container.resolve(UpdateServiceStatus);

    if (!id) {
      res.status(400).json({ error: "Bad Request: Missing required fields (id or action)" });
      return;
    }

    let updatedService;

    if (action === "accept") {
      const { estimatedServiceTime, serviceStatus } = req.body;

      if (!estimatedServiceTime || !serviceStatus) {
        res.status(400).json({ error: "Bad Request: Missing estimatedServiceTime or serviceStatus" });
        return;
      }

      updatedService = await changeStatusContainer.ConformBookingStatus(id, serviceStatus, estimatedServiceTime);
      
    } else if (action === "status") {
      const { serviceStatus } = req.body;

      if (!serviceStatus) {
        res.status(400).json({ error: "Bad Request: Missing serviceStatus" });
        return;
      }

      console.log("Service Status:", serviceStatus);

      updatedService = await changeStatusContainer.updateBookingStatus(id, serviceStatus);
      
    } else if (action === "cancel") {
      const { cancellationReason, serviceStatus } = req.body;

      if (!cancellationReason || !serviceStatus) {
        res.status(400).json({ error: "Bad Request: Missing cancellationReason or serviceStatus" });
        return;
      }

      updatedService = await changeStatusContainer.bookingCancel(id, serviceStatus, cancellationReason);
    }

    if (!updatedService) {
      res.status(404).json({ error: "Service booking not found or update failed" });
      return;
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      data: updatedService,
    });

  } catch (error) {
    console.error("Error in serviceProviderStatusChange:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: (error as Error).message,
    });
  }
};
