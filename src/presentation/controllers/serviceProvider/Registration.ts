import { Request, Response } from "express";
import { container } from "tsyringe";
import { RegisterServiceProviderUseCase } from "../../../application/use-case/serviceProvider/auth/RegisterServiceProvider";
import { IServiceProvider } from "../../../domain/entities/IServiceProvider";
import { UpdateUserWithServiceProviderUseCase } from "../../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider";

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
      documentImg,
      socialMedia,
      description, 
    } = req.body;
  

        
    
    if (!serviceProviderName || !serviceProviderEmail || !serviceProviderPhone) {
       res.status(400).json({ message: "Name, email, and phone are required." });
       return
    }

    
    const data: IServiceProvider = {
      serviceProviderName,
      serviceProviderEmail,
      serviceProviderPhone,
      experience: parseInt(experience, 10), 
      location,
      services,
      skills,
      serviceMode,
      profileImage: "",
      document:'',
      businessType,
      category,
      subcategory,
      socialMedia: "", 
      description: description || "", 
      userId:res.locals.user.userId,
    };


    const registerService = container.resolve(RegisterServiceProviderUseCase);
    const serviceProvider = await registerService.execute(data, profileImage, documentImg);

    const updateUser = container.resolve(UpdateUserWithServiceProviderUseCase);
    const user = res.locals.user;
     console.log(user);
     
    if (user.userId && serviceProvider._id) {
        
     const result=  await updateUser.execute(user.userId, serviceProvider._id.toString());
       console.log(result);
       
    }

     res.status(201).json({ message: "Service provider registered successfully.",serviceProvider });
     return
    } catch (error) {
    console.error("Registration error:", error);
     res.status(500).json({ message: "An error occurred while registering the service provider." });
     return
    }
};