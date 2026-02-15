import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetPaymentInfoUseCase } from "../../application/use-case/admin/dashboard/IGetPaymentInfo.usecase";
import { getString } from "../../utils/requestUtils";
import { getErrorMessage } from "../../utils/errorUtils";


import { IServiceProviderRejectVerify } from "../../application/use-case/admin/provider-management/rejectRequest/IServiceProviderReject.usecase";
import { HttpStatus } from "../../constants/HttpStatus";

import fs from "fs";
import { setAuthCookies } from "../../utils/setAuthCookies";
import { SERVICE_TOKENS, USE_CASE_TOKENS } from "../../constants/tokens";
import { ICreateCouponUseCase } from "../../application/use-case/admin/coupon-management/createCoupon/ICreateCoupon.usecase";
import { IFindAllCouponsUseCase } from "../../application/use-case/admin/coupon-management/findAllCoupons/IFindAllCoupons.usecase";
import { IMakeCouponInactiveUseCase } from "../../application/use-case/admin/coupon-management/makeCouponInactive/IMakeCouponInactive.usecase";
import { IToggleShowInBannerUseCase } from "../../application/use-case/admin/coupon-management/toggleShowInBanner/IToggleShowInBanner.usecase";
import { IGetAllProvidersWalletsUseCase } from "../../application/use-case/admin/wallet-management/getWallet/IGetAllProvidersWallets.usecase";
import { IGetProviderWalletUseCase } from "../../application/use-case/admin/wallet-management/getWalletByid/IGetProviderWalletById.usecase";

import { IAdminGetAdsUseCase } from "../../application/use-case/admin/ad-management/getAds/IAdminGetAds.usecase";
import { ITokenService } from "../../services/token/ITokenService";


import path from "path";

import { IChangeAdStatusUseCase } from "../../application/use-case/common/ads/changeAdStatus/IChangeAdStatus.usecase";
import { ChangeAdStatusRequestDTO } from "../../application/dtos/common/ads/changeAdStatus/ChangeAdStatusDTO";
import { IGetAllUsers } from "../../application/use-case/admin/user-management/getAllUsers/IGetAllUsers.usecase";
import { IBlockUnblockUsers } from "../../application/use-case/admin/user-management/blockUnblockUsers/IBlockUnblockUsers.usecase";
import { IGetServiceProviders } from "../../application/use-case/admin/provider-management/getServiceProvider/IGetServiceProviders.usecase";
import { IGetAllServices } from "../../application/use-case/admin/service-management/getService/IGetAllServices.usecase";
import { IBlockUnblockService } from "../../application/use-case/admin/service-management/blockUnblock/IBlockUnblock.usecase";
import { IAddCategory } from "../../application/use-case/admin/category-management/addCategoryy.ts/IAddCategory.usecase";
import { IGetCategory } from "../../application/use-case/common/category/getCategory/IGetCategory.usecase";
import { IEditCategory } from "../../application/use-case/admin/category-management/editCategory/IEditCategory.usecase";
import { IBlockUnblockCategory } from "../../application/use-case/admin/category-management/blockUnblockCategory/IBlockUnblockCategory.usecase";
import { IDeleteCategory } from "../../application/use-case/admin/category-management/deleteCategory/IDeleteCategory.usecase";
import { IAddService } from "../../application/use-case/admin/category-management/addService/IAddService.usecase";
import { IDeleteService } from "../../application/use-case/admin/category-management/deleteService/IDeleteService.usecase";
import { IWithdrawFromProviderWalletUseCase } from "../../application/use-case/admin/wallet-management/withdraw/IWithdrawFromProviderWallet.usecase";
import { IGetAllSubscriptionPlansUseCase } from "../../application/use-case/admin/subscription-management/getSubscription/IGetAllSubscriptionPlans.usecase";
import { ICreateSubscriptionPlanUseCase } from "../../application/use-case/admin/subscription-management/createSubscription/ICreateSubscriptionPlan.usecase";
import { IUpdateSubscriptionPlanUseCase } from "../../application/use-case/admin/subscription-management/updateSubscription/IUpdateSubscriptionPlan.usecase";
import { IAdminSignin } from "../../application/use-case/admin/auth/IAdminSignin.usecase";
import { IGetAdminProfileUseCase } from "../../application/use-case/admin/profile/IProfile";
import { IBlockUnblockProviderUseCase } from "../../application/use-case/admin/provider-management/blockServiceProvider/IBlockUnblockProvider.usecase";
import { IAdminSiteSettingsUseCase } from "../../application/use-case/admin/site-settings/IAdminSiteSettings.usecase";
import { IBlockUnblockCategoryService } from "../../application/use-case/admin/category-management/blockUnblockService/IBlockUnblockCategoryService.usecase";
import { AddCategoryDTO } from "../../application/dtos/admin/category/AddCategoryDTO";
import { EditCategoryDTO } from "../../application/dtos/admin/category/EditCategoryDTO";
import { BlockUnblockCategoryDTO } from "../../application/dtos/admin/category/BlockUnblockCategoryDTO";
import { DeleteCategoryDTO } from "../../application/dtos/admin/category/DeleteCategoryDTO";
import { AddServiceDTO } from "../../application/dtos/admin/category/AddServiceDTO";
import { DeleteServiceDTO } from "../../application/dtos/admin/category/DeleteServiceDTO";
import { BlockUnblockCategoryServiceDTO } from "../../application/dtos/admin/category/BlockUnblockCategoryServiceDTO";
import { CreateCouponDTO } from "../../application/dtos/admin/coupon/CreateCouponDTO";
import { MakeCouponInactiveDTO } from "../../application/dtos/admin/coupon/MakeCouponInactiveDTO";
import { ToggleShowInBannerDTO } from "../../application/dtos/admin/coupon/ToggleShowInBannerDTO";
import { AdminProfileResponseDTO } from "../../application/dtos/admin/profile/AdminProfileResponseDTO";
import { BlockUnblockProviderDTO } from "../../application/dtos/admin/provider/BlockUnblockProviderDTO";
import { GetProvidersDTO } from "../../application/dtos/admin/provider/GetProvidersDTO";
import { RejectProviderDTO } from "../../application/dtos/admin/provider/RejectProviderDTO";
import { VerifyProviderDTO } from "../../application/dtos/admin/provider/VerifyProviderDTO";
import { IGetProviderVerificationDetailsUseCase } from "../../application/use-case/admin/provider-management/getProviderVerificationDetails/IGetProviderVerificationDetails.usecase";
import { GetCategoryRequestDTO } from "../../application/dtos/common/category/getCategory/GetCategoryDTO";
import { GetServiceListRequestDTO } from "../../application/dtos/admin/service/GetServiceListDTO";
import { BlockUnblockServiceRequestDTO } from "../../application/dtos/admin/service/BlockUnblockServiceDTO";
import {
  AddFooterBannerRequestDTO,
} from "../../application/dtos/admin/site-settings/FooterBannerDTO";
import {
  AddHomeBannerRequestDTO,
} from "../../application/dtos/admin/site-settings/HomeBannerDTO";
import { AddThemeRequestDTO } from "../../application/dtos/admin/site-settings/ThemeDTO";
import {
  CreateSubscriptionPlanRequestDTO,
  UpdateSubscriptionPlanRequestDTO,
} from "../../application/dtos/admin/subscription/SubscriptionPlanDTO";
import {
  GetUserListRequestDTO,
  BlockUnblockUserRequestDTO,
} from "../../application/dtos/admin/user/UserManagementDTO";
import {
  GetWalletByIdRequestDTO,
  GetWalletListRequestDTO,
  WithdrawRequestDTO,
} from "../../application/dtos/admin/wallet/WalletManagementDTO";
import { IGetAdminBookingHistoryUseCase } from "../../application/use-case/admin/bookings/IGetAdminBookingHistory.usecase";
import {
  IFindPaymentInfoAdminRequestDTO,
} from "../../application/dtos/admin/bookings/GetAdminBookingHistoryDTO";

@injectable()
export class AdminController {
  constructor(
    @inject(USE_CASE_TOKENS.AdminSignin) private signInUseCase: IAdminSignin,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService,
    @inject(USE_CASE_TOKENS.GetAdminProfileUseCase)
    private getAdminProfileUseCase: IGetAdminProfileUseCase,
    @inject(USE_CASE_TOKENS.GetAllUsers)
    private getAllUsersUseCase: IGetAllUsers,
    @inject(USE_CASE_TOKENS.BlockUnblockUsers)
    private blockUnblockUsersUseCase: IBlockUnblockUsers,
    @inject(USE_CASE_TOKENS.GetServiceProviders)
    private getServiceProvidersUseCase: IGetServiceProviders,
    @inject(USE_CASE_TOKENS.GetPaymentInfoUseCase)
    private getPaymentInfoUseCase: IGetPaymentInfoUseCase,
    @inject(USE_CASE_TOKENS.AdminSiteSettingsUseCase)
    private adminSiteSettingsUseCase: IAdminSiteSettingsUseCase,
    @inject(USE_CASE_TOKENS.ServiceProviderRejectVerify)
    private serviceProviderRejectVerify: IServiceProviderRejectVerify,

    @inject(USE_CASE_TOKENS.GetAllServices)
    private getAllServicesUseCase: IGetAllServices,

    @inject(USE_CASE_TOKENS.BlockUnblockService)
    private blockUnblockServiceUseCase: IBlockUnblockService,

    @inject(USE_CASE_TOKENS.BlockUnblockSericeProvider)
    private blockUnblockProviderUseCase: IBlockUnblockProviderUseCase,
    @inject(USE_CASE_TOKENS.GetProviderVerificationDetailsUseCase)
    private getProviderVerificationDetailsUseCase: IGetProviderVerificationDetailsUseCase,
    @inject(USE_CASE_TOKENS.AddCategory)
    private addCategoryUseCase: IAddCategory,
    @inject(USE_CASE_TOKENS.GetCategory)
    private getCategoryUseCase: IGetCategory,
    @inject(USE_CASE_TOKENS.EditCategory)
    private editCategoryUseCase: IEditCategory,
    @inject(USE_CASE_TOKENS.BlockUnblockCategory)
    private blockUnblockCategoryUseCase: IBlockUnblockCategory,
    @inject(USE_CASE_TOKENS.DeleteCategory)
    private deleteCategoryUseCase: IDeleteCategory,
    @inject(USE_CASE_TOKENS.AddService)
    private addServiceUseCase: IAddService,
    @inject(USE_CASE_TOKENS.DeleteService)
    private deleteServiceUseCase: IDeleteService,
    @inject(USE_CASE_TOKENS.BlockUnblockCategoryService)
    private blockUnblockCategoryServiceUseCase: IBlockUnblockCategoryService,
    @inject(USE_CASE_TOKENS.CreateCouponUseCase)
    private createCouponUseCase: ICreateCouponUseCase,
    @inject(USE_CASE_TOKENS.FindAllCouponsUseCase)
    private findAllCouponsUseCase: IFindAllCouponsUseCase,
    @inject(USE_CASE_TOKENS.MakeCouponInactiveUseCase)
    private makeActiveInActiveCouponUseCase: IMakeCouponInactiveUseCase,
    @inject(USE_CASE_TOKENS.CouponshowInBanner)
    private showInBannerUseCase: IToggleShowInBannerUseCase,
    @inject(USE_CASE_TOKENS.GetAllProvidersWallets)
    private getWalletUseCase: IGetAllProvidersWalletsUseCase,
    @inject(USE_CASE_TOKENS.GetProviderWalletByIdUseCase)
    private getWalletByIdUseCase: IGetProviderWalletUseCase,
    @inject(USE_CASE_TOKENS.WithdrawFromProviderWalletUseCase)
    private withDrawProviderWallet: IWithdrawFromProviderWalletUseCase,
    @inject(USE_CASE_TOKENS.GetAllSubscriptionPlansUseCase)
    private getAllSubscriptionPlans: IGetAllSubscriptionPlansUseCase,
    @inject(USE_CASE_TOKENS.CreateSubscriptionPlanUseCase)
    private createSubscriptionPlan: ICreateSubscriptionPlanUseCase,

    @inject(USE_CASE_TOKENS.UpdateSubscriptionPlanUseCase)
    private updateSubscriptionPlan: IUpdateSubscriptionPlanUseCase,
    @inject(USE_CASE_TOKENS.AdminGetAdsUseCase)
    private getAdsUseCase: IAdminGetAdsUseCase,
    @inject(USE_CASE_TOKENS.ChangeAdStatusUseCase)
    private changeAdStatusUseCase: IChangeAdStatusUseCase,
    @inject(USE_CASE_TOKENS.GetAdminBookingHistoryUseCase)
    private getAdminBookingHistoryUseCase: IGetAdminBookingHistoryUseCase,
  ) {}

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const adminTokenData = req.cookies.adminToken;

      if (!adminTokenData) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: "Refresh token is missing" });
        return;
      }

      const decoded = this.tokenService.verifyRefreshToken(adminTokenData);

      if (!decoded) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: "Invalid refresh token" });
        return;
      }

      const user = await this.getAdminProfileUseCase.execute(decoded.adminId);

      if (!user || !user.isAdmin) {
        res.status(HttpStatus.NOT_FOUND).json({ error: "Admin not found" });
        return;
      }

      const newAccessToken = await this.tokenService.generateAccessToken(
        user._id + "",
        "adminId",
      );

      res.status(HttpStatus.OK).json({ adminToken: newAccessToken });
    } catch (error: unknown) {
      console.error("AdminController::refreshToken error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal server error" });
    }
  };

  public async getAdminProfile(req: Request, res: Response): Promise<void> {
    try {
      const adminId = getString(req.params.adminId);
      const data: AdminProfileResponseDTO | null =
        await this.getAdminProfileUseCase.execute(adminId);
      if (!data) {
        res.status(HttpStatus.BAD_REQUEST);
        return;
      }
      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      console.error("AdminController::getAdminProfile error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { email, phone, password } = req.body;

      if (!password || (!email && !phone)) {
        res
          .status(400)
          .json({ error: "Email or phone and password are required" });
        return;
      }

      let result;
      if (email) {
        result = await this.signInUseCase.execute({ email, password });
      } else {
        result = await this.signInUseCase.execute({ phone, password });
      }

      if (!result) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const { accessToken, refreshToken, user } = result;

      setAuthCookies(res, "adminToken", refreshToken);
      res.status(200).json({ accessToken, user });
      return;
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      if (!res.locals.adminId.adminId) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }

      const data = await this.getAdminProfileUseCase.execute(
        res.locals.adminId.adminId,
      );
      res.status(200).json({ data });
      return;
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const limit = parseInt(getString(req.query.limit)) || 10;
      const page = parseInt(getString(req.query.page)) || 0;
      const skip = page * limit;
      const search = getString(req.query.search);

      const dto: GetUserListRequestDTO = {
        skip,
        limit,
        search,
      };

      const { users, count } = await this.getAllUsersUseCase.execute(dto);
      res.status(200).json({ users, count });
      return;
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  async allServiceProviders(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(getString(req.query.page)) || 1;
      const limit = parseInt(getString(req.query.limit)) || 10;
      const search = getString(req.query.search);
      const serviceProviderVerfication: boolean =
        req.query.serviceProviderVerfication === "true";
      const skip = (page - 1) * limit;

      const dto: GetProvidersDTO = {
        skip,
        limit,
        search,
        serviceProviderVerfication,
      };

      const data = await this.getServiceProvidersUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ data: data.data, count: data.count });
      return;
    } catch (error: unknown) {
      console.error("AdminController::getServiceProviders error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async getPaymentInfoForChart(req: Request, res: Response): Promise<void> {
    try {
      const startDate = req.query.startDate
        ? new Date(getString(req.query.startDate))
        : undefined;
      const endDate = req.query.endDate
        ? new Date(getString(req.query.endDate))
        : undefined;

      const paymentData = await this.getPaymentInfoUseCase.execute(
        startDate,
        endDate,
      );

      res.status(200).json({ paymentData });
      return;
    } catch (error: unknown) {
      console.error("Failed to fetch payment info for chart:", getErrorMessage(error));
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  async addSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      console.log("Received request to add site settings:", req.body);
      if (req.body.type === "addBanner") {
        const dto: AddHomeBannerRequestDTO = {
          image: req.body.image,
          title: req.body.title,
          subtitle: req.body.subtitle,
          imageUrl: req.body.imageUrl,
        };
        const banner = await this.adminSiteSettingsUseCase.addHomeBanner(dto);
        res.status(HttpStatus.CREATED).json({ banner });
        return;
      }

      if (req.body.type === "addTheme") {
        const dto: AddThemeRequestDTO = {
          name: req.body.name,
          isActive: req.body.isActive,
        };
        const theme = await this.adminSiteSettingsUseCase.addTheme(dto);
        res.status(HttpStatus.CREATED).json({ theme });
        return;
      }

      if (req.body.type === "addFooterBanner") {
        const dto: AddFooterBannerRequestDTO = {
          image: req.body.image,
          title: req.body.title,
          subtitle: req.body.subtitle,
          imageUrl: req.body.imageUrl,
        };
        const footerBanner =
          await this.adminSiteSettingsUseCase.addFooterBanner(dto);
        res.status(HttpStatus.CREATED).json({ footerBanner });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid type provided" });
      return;
    } catch (error: unknown) {
      console.error("Error in addSiteSettings:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
      return;
    }
  }

  async deleteSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      if (req.body.type === "deleteBanner") {
        await this.adminSiteSettingsUseCase.deleteHomeBanner(req.body.bannerId);
        res
          .status(HttpStatus.OK)
          .json({ message: "Banner deleted successfully" });
        return;
      }

      if (req.body.type === "deleteFooterBanner") {
        await this.adminSiteSettingsUseCase.deleteFooterBanner(
          req.body.footerBannerId,
        );
        res
          .status(HttpStatus.OK)
          .json({ message: "Footer banner deleted successfully" });
        return;
      }

      if (req.body.type === "deleteTheme") {
        await this.adminSiteSettingsUseCase.deleteTheme(req.body.themeName);
        res
          .status(HttpStatus.OK)
          .json({ message: "Theme deleted successfully" });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid type provided" });
      return;
    } catch (error: unknown) {
      console.error("Error in deleteSiteSettings:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
      return;
    }
  }

  async makeActiveSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      if (req.body.type === "makeActiveHomeBanner") {
        const banner = await this.adminSiteSettingsUseCase.makeHomeBannerActive(
          req.body.id,
        );
        res.status(HttpStatus.OK).json({ banner });
        return;
      }

      if (req.body.type === "makeActiveFooterBanner") {
        const footerBanner =
          await this.adminSiteSettingsUseCase.makeFooterBannerActive(
            req.body.id,
          );
        res.status(HttpStatus.OK).json({ footerBanner });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid type provided" });
      return;
    } catch (error: unknown) {
      console.error("Error in makeActiveSiteSettings:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
      return;
    }
  }

  async getSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      const homeBanners =
        await this.adminSiteSettingsUseCase.findAllHomeBanners();
      const footerBanners =
        await this.adminSiteSettingsUseCase.findAllFooterBanners();
      const themes = await this.adminSiteSettingsUseCase.findAllThemes();

      res.status(HttpStatus.OK).json({
        homeBanners,
        footerBanners,
        themes,
      });
    } catch (error: unknown) {
      console.error("Error in getSiteSettings:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }

  async blockUnblockUser(req: Request, res: Response) {
    try {
      const { userId, action } = req.body;

      const dto: BlockUnblockUserRequestDTO = {
        userId,
        action,
      };

      const data = await this.blockUnblockUsersUseCase.execute(dto);

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found or update failed." });
        return;
      }
    } catch (error: unknown) {
      console.error("AdminController::blockUnblockUser error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async serviceProviderVerify(req: Request, res: Response): Promise<void> {
    try {
      const { serviceProviderId } = req.body;
        
      const reqData: VerifyProviderDTO = {
    providerId: serviceProviderId,
}
      const data =
        await this.serviceProviderRejectVerify.verifyServiceProvider(
          reqData,
        );
         console.log(data)
      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found or update failed." });
        return;
      }
    } catch (error: unknown) {
      console.error("AdminController::serviceProviderVerify error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const search = getString(req.query.search);

      const dto: GetServiceListRequestDTO = {
        skip,
        limit,
        search,
      };

      const { allServices, count } =
        await this.getAllServicesUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ allServices, count });
      return;
    } catch (error: unknown) {
      console.error("AdminController::getAllServices error", getErrorMessage(error));
      res.status(HttpStatus.BAD_REQUEST).json({ message: getErrorMessage(error) });
      return;
    }
  }

  async blockUnblockService(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId, action } = req.body;

      if (!serviceId || !action) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "serviceId and action are required" });
        return;
      }

      const dto: BlockUnblockServiceRequestDTO = {
        serviceId,
      };

      let result: boolean;

      if (action === "Block") {
        result = await this.blockUnblockServiceUseCase.blockService(dto);
      } else if (action === "Unblock") {
        result = await this.blockUnblockServiceUseCase.unblockService(dto);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
        return;
      }

      if (result) {
        res
          .status(HttpStatus.OK)
          .json({ message: `Service ${action.toLowerCase()}ed successfully` });
        return;
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: `Failed to ${action.toLowerCase()} service` });
        return;
      }
    } catch (error: unknown) {
      console.error("AdminController::blockUnblockService error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: getErrorMessage(error) || "Internal server error" });
      return;
    }
  }
  async blockUnblockServiceProvider(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { action, providerId } = req.body;

      if (!providerId || !action) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "providerId and action are required" });
        return;
      }

      const dto: BlockUnblockProviderDTO = {
        serviceProviderId: providerId,
        action: action === "Block",
      };

      let result: boolean;

      if (action === "Block") {
        result =
          await this.blockUnblockProviderUseCase.blockServiceProvider(dto);
      } else if (action === "Unblock") {
        result =
          await this.blockUnblockProviderUseCase.unblockServiceProvider(dto);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
        return;
      }

      if (result) {
        res.status(HttpStatus.OK).json({
          message: `Service Provider ${action.toLowerCase()}ed successfully`,
        });
        return;
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: `Failed to ${action.toLowerCase()} service provider`,
        });
        return;
      }
    } catch (error: unknown) {
      console.error(
        "AdminController::blockUnblockServiceProvider error",
        getErrorMessage(error),
      );
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: getErrorMessage(error) || "Internal server error" });
      return;
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const {newCategory} = req.body;
       console.log(newCategory)
      const dto: AddCategoryDTO = { category:newCategory };
      console.log(dto)
      console.log(dto.category)
      if (!dto.category) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category is required" });
        return;
      }

      const data = await this.addCategoryUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ data });
      return;
    } catch (error: unknown) {
      console.error("AdminController:: addCategory error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    try {
      const dto: GetCategoryRequestDTO = {};
      const categories = await this.getCategoryUseCase.execute(dto);

      console.log(categories);

      res.status(HttpStatus.OK).json(categories);
      return;
    } catch (error: unknown) {
      console.error("AdminController::getCategory error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
      return;
    }
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const data: EditCategoryDTO = {
        categoryId: req.body.categoryId,
        newName: req.body.categoryName,
      };

      if (!data.categoryId || !data.newName) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID and name are required" });
        return;
      }

      const result = await this.editCategoryUseCase.execute(data);

      res
        .status(HttpStatus.OK)
        .json({ message: "Category updated successfully", data: result });
      return;
    } catch (error: unknown) {
      console.error("AdminController::editCategory error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async blockUnblockCategory(req: Request, res: Response): Promise<void> {
    try {
      const data: BlockUnblockCategoryDTO = { categoryId: req.body.categoryId };

      if (!data.categoryId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID is required" });
        return;
      }

      const result = await this.blockUnblockCategoryUseCase.execute(data);

      res.status(HttpStatus.OK).json({ message: result });
      return;
    } catch (error: unknown) {
      console.error("AdminController::blockUnblockCategory error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const data: DeleteCategoryDTO = { categoryId: getString(req.params.id) };

      if (!data.categoryId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID is required" });
        return;
      }

      const result = await this.deleteCategoryUseCase.execute(data);

      res.status(HttpStatus.OK).json({ message: result });
      return;
    } catch (error: unknown) {
      console.error("AdminController::deleteCategory error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async addService(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, newServiceName, newServiceDescription } = req.body;

      if (!categoryId || !newServiceName || !newServiceDescription) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "All fields are required" });
        return;
      }

      const dto: AddServiceDTO = {
        categoryId,
        service: {
          serviceName: newServiceName,
          serviceDescription: newServiceDescription,
          isHidden: false,
        },
      };

      const data = await this.addServiceUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ message: data });
    } catch (error: unknown) {
      console.error("AdminController::addService error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  async deleteService(req: Request, res: Response): Promise<void> {
    try {
      const data: DeleteServiceDTO = {
        categoryId: getString(req.params.categoryId),
        serviceId: getString(req.params.serviceId),
      };

      if (!data.categoryId || !data.serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID and Service ID are required" });
        return;
      }

      const result = await this.deleteServiceUseCase.execute(data);

      res.status(HttpStatus.OK).json({ message: result });
    } catch (error: unknown) {
      console.error("AdminController::deleteService error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async blockUnblockCategoryService(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const data: BlockUnblockCategoryServiceDTO = {
        categoryId: req.body.categoryId,
        serviceId: req.body.serviceId,
      };

      if (!data.categoryId || !data.serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID and Service ID are required" });
        return;
      }

      const result =
        await this.blockUnblockCategoryServiceUseCase.execute(data);

      res.status(HttpStatus.OK).json({ message: result });
    } catch (error: unknown) {
      console.error(
        "AdminController::blockUnblockCategoryService error",
        getErrorMessage(error),
      );
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  public async logoutAdmin(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("adminToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res
        .status(HttpStatus.OK)
        .json({ message: "Admin logged out successfully" });
    } catch (error: unknown) {
      console.error("AdminController::logoutAdmin error", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  public async getCurrentLog(req: Request, res: Response) {
    const logFilePath = path.join(__dirname, "../../../logs/access.log");

    if (!fs.existsSync(logFilePath)) {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Log file not found" });
      return;
    }

    const logContent = fs.readFileSync(logFilePath, "utf-8");

    const reversedLog = logContent
      .split("\n")
      .filter(Boolean)
      .reverse()
      .join("\n");

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(reversedLog);
    return;
  }

  public async createCoupon(req: Request, res: Response) {
    try {
      const { data } = req.body;
      console.log("createCoupon input:", data);

      const inputData: CreateCouponDTO = data;

      if (!inputData) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Coupon data required" });
        return;
      }

      const resdata = await this.createCouponUseCase.execute(inputData);
      console.log(resdata);
      res.status(HttpStatus.CREATED).json(resdata); 
      return;
    } catch (e: unknown) {
      console.log(getErrorMessage(e));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  public async getAllCoupon(req: Request, res: Response) {
    try {
      const coupons = await this.findAllCouponsUseCase.execute();
      console.log(coupons);
      res.status(HttpStatus.CREATED).json(coupons);
      return;
    } catch (e: unknown) {
      console.log(getErrorMessage(e));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
  public async activeInActiveCoupons(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const dto: MakeCouponInactiveDTO = {
        id: getString(req.params.id),
        action: req.body.action,
      };

      if (!dto.id) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "ID is required" });
        return;
      }

      await this.makeActiveInActiveCouponUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: `Coupon ${dto.action ? "activated" : "deactivated"} successfully`,
      });
    } catch (error: unknown) {
      console.error("Error toggling coupon status:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  public async showCouponsInBanner(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.params);
      const dto: ToggleShowInBannerDTO = {
        id: getString(req.params.id),
        show: req.body.action,
      };

      if (!dto.id) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Coupon ID is required" });
        return;
      }

      await this.showInBannerUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        message: `Coupon ${
          dto.show ? "shown in" : "removed from"
        } banner successfully`,
      });
    } catch (error: unknown) {
      console.error("Error toggling coupon banner status:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  public async getAllWallets(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;

      const dto: GetWalletListRequestDTO = { skip, limit };

      const data = await this.getWalletUseCase.execute(dto);
      console.log(data);
      res.status(HttpStatus.OK).json({ data: data.wallets });
    } catch {}
  }

  public async rejectServiceProvider(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { reason,serviceProviderId } = req.body;
    const dto: RejectProviderDTO = { providerId:serviceProviderId, reason };

    await this.serviceProviderRejectVerify.rejectServiceProvider(dto);

    res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Provider rejected successfully" });
  }

  public async verifyServiceProvider(
    req: Request,
    res: Response,
  ): Promise<void> {
    const id = getString(req.params.id);

    const dto: VerifyProviderDTO = { providerId: id };

    await this.serviceProviderRejectVerify.verifyServiceProvider(dto);
    res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Verification success" });
  }

  public async getProviderVerificationDetails(
    req: Request,
    res: Response,
  ): Promise<void> {
    const id = getString(req.params.id);
    const provider =
      await this.getProviderVerificationDetailsUseCase.execute(id);

    if (!provider) {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Provider not found" });
      return;
    }

    res.status(HttpStatus.OK).json({ success: true, data: provider });
  }

  public async getWalletById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "provider Id is missing" });
        return;
      }

      const dto: GetWalletByIdRequestDTO = {
        providerId: getString(req.params.id),
      };

      const data = await this.getWalletByIdUseCase.execute(dto);
      res.status(HttpStatus.OK).json(data);
    } catch {}
  }

  async withdrawFromWallet(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, newStatus, reason } = req.body;
      const walletId = getString(req.params.walletId);

      if (!walletId || !transactionId || !newStatus) {
        res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
        return;
      }

      const dto: WithdrawRequestDTO = {
        walletId,
        transactionId,
        newStatus,
        reason,
      };

      const success = await this.withDrawProviderWallet.execute(dto);

      if (!success) {
        res.status(404).json({
          success: false,
          message: "Transaction not found or not updated",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Transaction status updated successfully",
      });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async getAllSubscriptions(req: Request, res: Response): Promise<void> {
    try {
      const subscriptions = await this.getAllSubscriptionPlans.execute();

      if (!subscriptions || subscriptions.length === 0) {
        res.status(404).json({
          success: false,
          message: "No subscription plans found",
          data: [],
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Subscriptions fetched successfully",
        data: subscriptions,
      });
    } catch (error: unknown) {
      console.error("Error fetching subscriptions:", getErrorMessage(error));

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        price,
        validityDays,
        features,
        adLimitPerMonth,
        payoutSpeedDays,
        description,
      } = req.body;

      if (!name || !price || !validityDays) {
        res.status(400).json({
          success: false,
          message: "Required fields are missing",
        });
        return;
      }

      const dto: CreateSubscriptionPlanRequestDTO = {
        name,
        price,
        validityDays,
        features: features || [],
        adLimitPerMonth: adLimitPerMonth || 0,
        payoutSpeedDays: payoutSpeedDays || 0,
        description: description || "",
      };

      const newPlan = await this.createSubscriptionPlan.execute(dto);

      res.status(201).json({
        success: true,
        message: "Subscription created successfully",
        data: newPlan,
      });
    } catch (error: unknown) {
      console.error("Create subscription error:", getErrorMessage(error));

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async updateSubscription(req: Request, res: Response): Promise<void> {
    try {
      const id = getString(req.params.id);

      const {
        name,
        price,
        validityDays,
        features,
        adLimitPerMonth,
        payoutSpeedDays,
        description,
      } = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Subscription ID is required",
        });
        return;
      }

      const dto: UpdateSubscriptionPlanRequestDTO = {
        name,
        price,
        validityDays,
        features,
        adLimitPerMonth,
        payoutSpeedDays,
        description,
      };

      const updatedPlan = await this.updateSubscriptionPlan.execute(id, dto);

      if (!updatedPlan) {
        res.status(404).json({
          success: false,
          message: "Subscription plan not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Subscription updated successfully",
        data: updatedPlan,
      });
    } catch (error: unknown) {
      console.error("Update subscription error:", getErrorMessage(error));

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getAds(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(getString(req.query.limit)) || 10;
      const page = parseInt(getString(req.query.page)) || 0;
      const skip = page * limit;
      const data = await this.getAdsUseCase.execute({ skip, limit });

      console.log(data);

      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error fetching provider ads",
        error: getErrorMessage(error),
      });
    }
  }

  async changeAdStatus(req: Request, res: Response): Promise<void> {
    try {
      const adId = getString(req.params.adId);
      const { status } = req.body; 
      console.log("called");
      if (!adId || !status) {
        res.status(400).json({ message: "adId and status are required" });
        return;
      }
      console.log("called");

      const dto: ChangeAdStatusRequestDTO = { adId, status };
      const updated = await this.changeAdStatusUseCase.execute(dto);

      if (!updated) {
        res.status(404).json({ message: "Ad not found or status unchanged" });
        return;
      }

      res.status(200).json({
        message: "Ad status updated successfully",
        status,
      });
    } catch (error: unknown) {
      console.error("Error changing ad status:", getErrorMessage(error));

      res.status(500).json({
        message: "Internal server error",
        error: getErrorMessage(error),
      });
    }
  }

  async getAllBookings(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 0;
      const skip = page * limit;

      const search =
        typeof req.query.search === "string" ? req.query.search.trim() : "";

      const status =
        typeof req.query.status === "string" ? req.query.status.trim() : "";

      const statusField =
        req.query.statusType === "paymentStatus"
          ? "paymentStatus"
          : "serviceStatus";

      const dto: IFindPaymentInfoAdminRequestDTO = {
        limit,
        skip,
        search,
        status,
        statusField,
      };

      const bookings = await this.getAdminBookingHistoryUseCase.execute(dto);

      return res.status(HttpStatus.OK).json(bookings);
    } catch (error: unknown) {
      console.log(getErrorMessage(error));

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error fetching bookings",
        error: getErrorMessage(error),
      });
    }
  }
}
