import { Request, Response } from "express";
import { container } from "tsyringe";
import { RegisterServiceProviderUseCase } from "../../../application/use-case/serviceProvider/auth/RegisterServiceProvider";
import { IServiceProvider, IServiceProviderRegistration } from "../../../domain/entities/IServiceProvider";
import { UpdateUserWithServiceProviderUseCase } from "../../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider";
import { HttpStatus } from "../../../constants/HttpStatus";

export const RegistrationServiceProvider = async (req: Request, res: Response) => {
   try {
    const {data,bankDetails}=req.body
console.log(bankDetails);

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
      documentImg2
    } = data
   console.log(documentImg2);
   
        
    
    
    
    const serviceProviderData:IServiceProviderRegistration = {
      serviceProviderName,
      serviceProviderEmail,
      serviceProviderPhone,
      experience: parseInt(experience, 10), 
      location,
      services,
      skills,
      serviceMode,
      profileImage: "",
      document:[],
      businessType,
      category,
      subcategory,
      socialMedia: "", 
      description: description || "", 
      userId:res.locals.user.userId,
      bankDetails:bankDetails
    };
    data.bankDetails=req.body.bankDetails
// if (!serviceProviderName || !serviceProviderEmail || !serviceProviderPhone) {
//        res.status(HttpStatus.BAD_REQUEST).json({ message: "Name, email, and phone are required." });
//        return
//     }


    const registerService = container.resolve(RegisterServiceProviderUseCase);
    const serviceProvider = await registerService.execute(serviceProviderData, profileImage,documentImg,documentImg2);
      console.log(serviceProvider);
      
    const updateUser =await container.resolve(UpdateUserWithServiceProviderUseCase);
    const user = res.locals.user;
     
    if (user.userId && serviceProvider._id) {
        
    await updateUser.execute(user.userId, serviceProvider._id.toString());
       
    }
        
     res.status(HttpStatus.CREATED).json({ message: "Service provider registered successfully.",serviceProvider });
     return
    } catch (error) {
    console.error("Registration error:", error);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while registering the service provider." });
     return
    }
  
};