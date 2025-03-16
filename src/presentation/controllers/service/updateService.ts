import { Request, Response } from "express";
import { container } from "tsyringe";
import { IService } from "../../../domain/entities/IService";
import { EditService } from "../../../application/service-management/EditService";

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { serviceId } = req.params;
    if (!serviceId) {
      res.status(400).json({ error: "Bad Request: Missing serviceId" });
      return;
    }

    const {
      serviceName,
      description,
      serviceType,
      category,
      location,
      estimatedPrice,
      serviceImage,
      serviceProviderId,
    }: IService = req.body;

    // Validate required fields
    if (!serviceName || !description || !serviceType || !category || !location || !estimatedPrice || !serviceImage || !serviceProviderId) {
      res.status(400).json({ error: "Bad Request: Missing required fields" });
      return;
    }

    const serviceData: IService = {
      serviceName,
      description,
      serviceType,
      category,
      location,
      estimatedPrice,
      serviceImage:"",
      serviceProviderId,
    };

    

    const editService = container.resolve(EditService);
    const updatedService = await editService.execute(serviceId, serviceData,serviceImage);

    if (!updatedService) {
      res.status(404).json({ error: "Service not found or not updated" });
      return;
    }

    res.status(200).json({ message: "Service updated successfully", data: updatedService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
