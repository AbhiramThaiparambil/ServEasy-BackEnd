import { Request, Response } from "express";
import { container } from "tsyringe";
import { IService } from "../../../domain/entities/IService";
import { AddNewService } from "../../../application/service-management/addnewService";

export const addNewService = async (req: Request, res: Response) => {
  try {
    const {
      serviceName,
      description,
      serviceType,
      category,
      location,
      estimatedPrice,
      serviceImage,
      serviceProviderId
    } = req.body;
console.log(req.body);

    // Check for required fields
    if (
      !serviceName ||
      !description ||
      !serviceType ||
      !category ||
      !location ||
      !estimatedPrice ||
      !serviceImage ||
      !serviceProviderId
    ) {
       res.status(400).json({ error: 'Bad Request: Missing required fields' });
       return
    }
    const updateLocation = {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
      address: location.address
    };
    const serviceData: IService = {
      serviceName,
      description,
      serviceType,
      category,
      location:updateLocation,
      estimatedPrice,
      serviceImage,
      serviceProviderId
    };
    

    const addNewService = container.resolve(AddNewService);
    const service = await addNewService.execute(serviceData);

    res.status(201).json({ data: service });
    return
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    return  
}
};
