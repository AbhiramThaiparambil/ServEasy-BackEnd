import { Request, Response } from "express";
import { container } from "tsyringe";
import { RegisterServiceProviderUseCase } from '../../../application/use-case/serviceProvider/RegisterServiceProvider';
import { IServiceProvider } from "../../../domain/entities/ServiceProvider";


export const RegistrationServiceProvider = async (req: Request, res: Response) => {
    try {
      const {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        businessType,
        category,
        subcategory,
        experience,
        location,
        serviceMode,
        services,
        skills,
        profileImage,
        document,
        socialMedia,
        description // Optional field
      } = req.body;
  
      // Validate required fields
      if (!serviceProviderName || !serviceProviderEmail || !serviceProviderPhone) {
         res.status(400).json({ message: "Name, email, and phone are required." });
         return
        }
  
      const data: IServiceProvider = {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        experience: parseInt(experience, 10), // Ensure experience is an integer
        location,
        services,
        skills,
        serviceMode,
        profileImage:"",
        document,
        businessType, 
        category, 
        subcategory, 
        socialMedia: "",
        description:description, 
      };
  
      const registerService = container.resolve(RegisterServiceProviderUseCase);
      await registerService.execute(data, profileImage, document);
  
      res.status(201).json({ message: "Service provider registered successfully." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred while registering the service provider." });
    }
  };