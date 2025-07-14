import { Request, Response } from "express";
import { container } from "tsyringe";
import { IService } from "../../../domain/entities/IService";
import { AddNewService } from "../../../application/use-case/service-management/addnewService";
import { HttpStatus } from "../../../constants/HttpStatus";

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
       res.status(HttpStatus.BAD_REQUEST).json({ error: 'Bad Request: Missing required fields' });
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

    res.status(HttpStatus.CREATED).json({ data: service });
    return
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    return  
}
};
