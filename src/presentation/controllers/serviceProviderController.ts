import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { GetPaymentInfoUseCaseServiceProvider } from '../../application/use-case/serviceProvider/GetPaymentInfoUseCaseServiceProvider';
import { EditServiceProviderProfileUseCase } from '../../application/use-case/serviceProvider/EditProfile';
import { HttpStatus } from '../../constants/HttpStatus';
import { RegisterServiceProviderUseCase } from '../../application/use-case/serviceProvider/auth/RegisterServiceProvider';
import { UpdateUserWithServiceProviderUseCase } from '../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider';
import { IServiceProviderRegistration } from '../../domain/entities/IServiceProvider';
import { VerifyServiceProvider } from '../../application/use-case/serviceProvider/VerifyServiceProvider';
import { GetCategory } from '../../application/use-case/admin/category-management/GetCategory';
import { GetServiceProvider } from '../../application/use-case/serviceProvider/auth/getServiceProvider';
import { ManageAllServiceUseCase } from '../../application/use-case/admin/mangageAllserviceUseCase';
import { checkServiceProviderAvailabilityUseCase } from '../../application/use-case/serviceProvider/checkServiceProviderAvailabilityUseCase';
import { setAuthCookies } from '../../utils/setAuthCookies';
import { USE_CASE_TOKENS } from '../../utils/constants/tokens';
import { IGetWalletUseCase } from '../../application/use-case/serviceProvider/wallet/getWallet/IGetWalletUseCase';
import { IWithdrawPaymentUseCase } from '../../application/use-case/serviceProvider/wallet/withdrawPayment/IWithdrawPaymentUseCase';
import { IGetSubscriptionPlansUseCase } from '../../application/use-case/subscription/IGetSubscriptionPlansUseCase';
import { IEditAdUseCase } from '../../application/use-case/ads-useCase/IEditAdUseCase';
import { ICreateAdUseCase } from '../../application/use-case/ads-useCase/ICreateAdUseCase';
import { IGetProviderAdsUseCase } from '../../application/use-case/ads-useCase/IGetProviderAdsUseCase';
import { IGetServiceNamesUseCase } from '../../application/use-case/admin/service-management/IGetServiceNamesUseCase';

@injectable()
export class ServiceProviderController {
  constructor(
    @inject(GetPaymentInfoUseCaseServiceProvider)
    private getPaymentInfo: GetPaymentInfoUseCaseServiceProvider,
    @inject(GetServiceProvider)
    private getServiceProviderUseCase: GetServiceProvider,
    @inject(EditServiceProviderProfileUseCase)
    private editServiceProviderProfileUseCase: EditServiceProviderProfileUseCase,
    @inject(RegisterServiceProviderUseCase)
    private registerServiceProviderUseCase: RegisterServiceProviderUseCase,
    @inject(UpdateUserWithServiceProviderUseCase)
    private updateUserWithServiceProviderUseCase: UpdateUserWithServiceProviderUseCase,

    @inject(VerifyServiceProvider)
    private verifyServiceProviderUseCase: VerifyServiceProvider,
    @inject(GetCategory)
    private getCategoryUseCase: GetCategory,

    @inject(ManageAllServiceUseCase) private manageAllServiceUseCase: ManageAllServiceUseCase,
    @inject(checkServiceProviderAvailabilityUseCase)
    private checkServiceProviderAvailabilityUseCase: checkServiceProviderAvailabilityUseCase,
    @inject(USE_CASE_TOKENS.GetWalletUseCase)
    private getWalletUseCase: IGetWalletUseCase,
    @inject(USE_CASE_TOKENS.WithdrawPaymentUseCase)
    private withdrawPaymentUseCase: IWithdrawPaymentUseCase,
      @inject(USE_CASE_TOKENS.GetSubscriptionPlansUseCase)
    private getSubscriptionPlansUseCase: IGetSubscriptionPlansUseCase,
    @inject(  USE_CASE_TOKENS.EditAdUseCase) private editAdUseCase:IEditAdUseCase,
        @inject(  USE_CASE_TOKENS.CreateAdUseCase) private createAdUseCase:ICreateAdUseCase,
                @inject(  USE_CASE_TOKENS.GetProviderAdsUseCase) private getProviderAdsUseCase:IGetProviderAdsUseCase,
@inject(USE_CASE_TOKENS.GetServiceNamesUseCase)private getServiceNamesUseCase:IGetServiceNamesUseCase

  ) {}

  async getPaymentInfoForChartServiceProvider(req: Request, res: Response): Promise<void> {
    console.log('getPaymentInfo is:', this.getPaymentInfo);

    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
      const serviceProviderId = res.locals.serviceProvider_id;
      console.log('getPaymentInfo is:', this.getPaymentInfo);
      const paymentData = await this.getPaymentInfo.execute(serviceProviderId, startDate, endDate);

      res.status(HttpStatus.OK).json({ paymentData });
      return;
    } catch (error) {
      console.error('Failed to fetch payment info for chart:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async updateServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      const updated = await this.editServiceProviderProfileUseCase.execute(req.body);

      if (updated) {
        res.status(HttpStatus.OK).json({ message: 'Service provider updated successfully' });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Failed to update service provider' });
      }
    } catch (error) {
      console.error('Error updating service provider:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  async registerServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const { data, bankDetails } = req.body;

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
        documentImg2,
        socialMedia,
        description,
      } = data;

      const serviceProviderData: IServiceProviderRegistration = {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        experience: parseInt(experience, 10),
        location,
        services,
        skills,
        serviceMode,
        profileImage: '',
        document: [],
        businessType,
        category,
        subcategory,
        socialMedia: '',
        description: description || '',
        userId: res.locals.user.userId,
        bankDetails,
      };

      const serviceProvider = await this.registerServiceProviderUseCase.execute(
        serviceProviderData,
        profileImage,
        documentImg,
        documentImg2
      );

      const user = res.locals.user;

      if (user.userId && serviceProvider._id) {
        await this.updateUserWithServiceProviderUseCase.execute(
          user.userId,
          serviceProvider._id.toString()
        );
      }

      res.status(HttpStatus.CREATED).json({
        message: 'Service provider registered successfully.',
        serviceProvider,
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred while registering the service provider.',
      });
    }
  }

  async verifyServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user;

      if (!user || !user.userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized access' });
        return;
      }

      const refreshToken = await this.verifyServiceProviderUseCase.execute(user.userId);

      if (!refreshToken) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Not a valid service provider' });
        return;
      }

      setAuthCookies(res, 'serviceProviderToken', refreshToken);
      res.status(HttpStatus.OK).json({ message: 'Service provider verified' });
    } catch (error) {
      console.error('Error verifying service provider:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  async getActiveCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.getCategoryUseCase.getActiveCategory();
      res.status(HttpStatus.OK).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    }
  }

  async getServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user;

      const result = await this.getServiceProviderUseCase.execute(user.userId);

      res.status(HttpStatus.CREATED).json({ serviceProvider: result });
    } catch (error) {
      console.error('Error fetching service provider:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
    }
  }

  async makeItactiveAllService(req: Request, res: Response) {
    try {
      const serviceProviderId = req.params.id;

      if (!serviceProviderId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Service provider ID is required',
        });
        return;
      }

      await this.manageAllServiceUseCase.makeActiveAllService(serviceProviderId);

      res.status(HttpStatus.OK).json({
        message: 'All services have been activated successfully.',
      });
      return;
    } catch (error) {
      console.error('Error activating services:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong while activating services.',
        error,
      });
      return;
    }
  }

  async makeInactiveAllService(req: Request, res: Response) {
    try {
      const serviceProviderId = req.params.id;

      if (!serviceProviderId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Service provider ID is required',
        });
        return;
      }

      await this.manageAllServiceUseCase.makeActiveAllService(serviceProviderId);

      res.status(HttpStatus.OK).json({
        message: 'All services have been marked as inactive successfully.',
      });
      return;
    } catch (error) {
      console.error('Error deactivating services:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong while deactivating services.',
        error,
      });
      return;
    }
  }

  // async rescheduleBookingHandler(req: Request, res: Response){
  //   try{
  //     const { bookingId, newDate } = req.body;

  //     if (!bookingId || !newDate ) {
  //       return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Booking ID, new date, and new time are required.' });
  //     }

  //     const updatedBooking = await this.manageAllServiceUseCase.rescheduleBooking(bookingId, newDate);

  //     if (!updatedBooking) {
  //       return res.status(HttpStatus.NOT_FOUND).json({ message: 'Booking not found or could not be rescheduled.' });
  //     }

  //     res.status(HttpStatus.OK).json({ message: 'Booking rescheduled successfully.', booking: updatedBooking });

  //   } catch (error) {
  //     console.error('Error rescheduling booking:', error);
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });

  // }
  // }

  async getAvailability(req: Request, res: Response): Promise<void> {
    try {
      const serviceProviderId = req.params.serviceProviderId;

      if (!serviceProviderId) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Service provider ID is required' });
        return;
      }

      const availability =
        await this.checkServiceProviderAvailabilityUseCase.execute(serviceProviderId);

      res.status(HttpStatus.OK).json({ availability });
    } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  async getWallet(req: Request, res: Response) {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      console.log(req.query);
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.skip as string) || 0;
      const skip = page * limit;

      const data= await this.getWalletUseCase.execute(
        serviceProviderId,
        limit,
        skip,
        
      );
if(!data){
res.status(HttpStatus.BAD_REQUEST)
}
      res.status(HttpStatus.OK).json({ success: true, data: data?.wallet,count:data?.count });
    } catch (error: any) {
      res.status(HttpStatus.OK).json({ success: false, message: error.message });
    }
  }

  withdrawPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      const { amount } = req.body;

      if (!amount || !serviceProviderId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Amount and Service Provider ID are required' });
        return;
      }
      const result = await this.withdrawPaymentUseCase.execute(serviceProviderId, amount);

      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
  };


    async getAvailableSubscriptionPlans(req: Request, res: Response): Promise<void> {
    try {
      const plans = await this.getSubscriptionPlansUseCase.execute();
      res.status(HttpStatus.OK).json(plans);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching subscription plans", error });
    }
  }

async createAd(req: Request, res: Response): Promise<void> {
  try {
    console.log('09090909090909090909090909090909')
        console.log(req.body)

            console.log('09090909090909090909090909090909')


    const serviceProviderId = res.locals.serviceProvider_id;

    const adData = req.body.data;


    console.log(req.body+"--formData")
    const createdAd = await this.createAdUseCase.execute({...adData,providerId:serviceProviderId});

    res.status(HttpStatus.CREATED).json(createdAd);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error creating ad",
      error
    });
  }
}


async editAd(req: Request, res: Response): Promise<void> {
  try {
    const { adId } = req.params;
    const updateData = req.body;


    console.log(req.body)
    
    const updatedAd = await this.editAdUseCase.execute(adId, updateData);
         
    res.status(HttpStatus.OK).json(updatedAd);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error updating ad",
      error
    });
  }
}

async getProviderAds(req: Request, res: Response): Promise<void> {
  try {
    const { providerId } = req.params;

console.log(req.params)
    const ads = await this.getProviderAdsUseCase.execute(providerId);

    res.status(HttpStatus.OK).json(ads);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching provider ads",
      error
    });
  }
}


 async getServiceNames(req: Request, res: Response): Promise<void> {
    try {
      const { providerId } = req.params;
   
      const result = await this.getServiceNamesUseCase.execute(providerId);
      console.log(result)
      res.status(200).json({
        success: true,
        data: result
      });

      return;
    } catch (error) {
      
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong"
      });

      return;
    }
  }

}
