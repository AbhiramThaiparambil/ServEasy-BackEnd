import { Request, Response } from "express";
import { container } from "tsyringe";
import { IService } from "../../../domain/entities/IService";
import { EditService } from "../../../application/service-management/EditService";
import { HttpStatus } from "../../../constants/HttpStatus";

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    
    const { serviceId } = req.params;
    if (!serviceId) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: "Bad Request: Missing serviceId" });
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
      res.status(HttpStatus.BAD_REQUEST).json({ error: "Bad Request: Missing required fields" });
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
      res.status(HttpStatus.BAD_REQUEST).json({ error: "Service not found or not updated" });
      return;
    }

    res.status(HttpStatus.OK).json({ message: "Service updated successfully", data: updatedService });
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  }
};
