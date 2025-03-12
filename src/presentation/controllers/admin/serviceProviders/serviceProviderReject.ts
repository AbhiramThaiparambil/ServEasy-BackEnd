import { Request, Response } from "express";
import { container } from "tsyringe";
import { ServiceProviderRejectVerify } from "../../../../application/use-case/admin/serviceProviderManagement/serviceProviderRejectUseCase";

export const serviceProviderReject = async (req: Request, res: Response) => {
  try {
    const { serviceProviderId, reason } = req.body;

    const serviceProvider = container.resolve(ServiceProviderRejectVerify);
    const data = await serviceProvider.rejectServiceProvider(
      serviceProviderId,
      reason
    );

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: "User not found or update failed." });
    }
  } catch (error) {
    console.log(error);
  }
};
