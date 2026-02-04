import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IGetPaymentInfoUseCase } from "../../application/use-case/admin/dashboard/IGetPaymentInfo.usecase";
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

import { userInfo } from "os";

import path from "path";

import { IChangeAdStatusUseCase } from "../../application/use-case/common/ads/changeAdStatus/IChangeAdStatus.usecase";
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
import { BlockUnblockProviderUseCase } from "../../application/use-case/admin/provider-management/blockServiceProvider/BlockUnblockProvider.usecase";
import { IAdminSignin } from "../../application/use-case/admin/auth/IAdminSignin.usecase";
import { IGetAdminProfileUseCase } from "../../application/use-case/admin/profile/IProfile";
import { IBlockUnblockProviderUseCase } from "../../application/use-case/admin/provider-management/blockServiceProvider/IBlockUnblockProvider.usecase";
import { IAdminSiteSettingsUseCase } from "../../application/use-case/admin/site-settings/IAdminSiteSettings.usecase";
import { IBlockUnblockCategoryService } from "../../application/use-case/admin/category-management/blockUnblockService/IBlockUnblockCategoryService.usecase";

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
    } catch (error) {
      console.error("Admin RefreshToken error:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };

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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const search = req.query.search || "";
      const { users, count } = await this.getAllUsersUseCase.execute(
        skip,
        limit,
        search as string,
      );
      res.status(200).json({ users, count });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  async getServiceProviders(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const search = req.query.search || "";
      const verification = req.query.verification;
      const { data, count } = await this.getServiceProvidersUseCase.execute(
        skip,
        limit,
        search as string,
        verification ? true : false,
      );

      res.status(HttpStatus.OK).json({ data, count });
      return;
    } catch (error) {
      console.error("AdminController::getServiceProviders error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async getPaymentInfoForChart(req: Request, res: Response): Promise<void> {
    try {
      const startDate = req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined;
      const endDate = req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined;

      const paymentData = await this.getPaymentInfoUseCase.execute(
        startDate,
        endDate,
      );

      res.status(200).json({ paymentData });
      return;
    } catch (error) {
      console.error("Failed to fetch payment info for chart:", error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }

  async addSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      console.log("Received request to add site settings:", req.body);
      if (req.body.type === "addBanner") {
        const banner = await this.adminSiteSettingsUseCase.addHomeBanner(
          req.body,
        );
        res.status(HttpStatus.CREATED).json({ banner });
        return;
      }

      if (req.body.type === "addTheme") {
        const theme = await this.adminSiteSettingsUseCase.addTheme(req.body);
        res.status(HttpStatus.CREATED).json({ theme });
        return;
      }

      if (req.body.type === "addFooterBanner") {
        const footerBanner =
          await this.adminSiteSettingsUseCase.addFooterBanner(req.body);
        res.status(HttpStatus.CREATED).json({ footerBanner });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid type provided" });
      return;
    } catch (error) {
      console.error("Error in addSiteSettings:", error);
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
    } catch (error) {
      console.error("Error in deleteSiteSettings:", error);
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
    } catch (error) {
      console.error("Error in makeActiveSiteSettings:", error);
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
    } catch (error) {
      console.error("Error in getSiteSettings:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }

  async blockUnblockUser(req: Request, res: Response) {
    try {
      const { userId, action } = req.body;

      let data;
      if (action === "Block") {
        data = await this.blockUnblockUsersUseCase.blockUser(userId);
      } else {
        data = await this.blockUnblockUsersUseCase.unblockUser(userId);
      }

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found or update failed." });
        return;
      }
    } catch (error) {
      console.error("AdminController::blockUnblockUser error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async serviceProviderReject(req: Request, res: Response): Promise<void> {
    try {
      const { serviceProviderId, reason } = req.body;

      const data = await this.serviceProviderRejectVerify.rejectServiceProvider(
        serviceProviderId,
        reason,
      );

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found or update failed." });
        return;
      }
    } catch (error) {
      console.error("AdminController::serviceProviderReject error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async serviceProviderVerify(req: Request, res: Response): Promise<void> {
    try {
      const { serviceProviderId } = req.body;

      const data =
        await this.serviceProviderRejectVerify.verifyServiceProvider(
          serviceProviderId,
        );

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found or update failed." });
        return;
      }
    } catch (error) {
      console.error("AdminController::serviceProviderVerify error", error);
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
      const search = req.query.search || "";

      const { allServices, count } = await this.getAllServicesUseCase.execute(
        skip,
        limit,
        search as string,
      );

      res.status(HttpStatus.OK).json({ allServices, count });
      return;
    } catch (error) {
      console.error("AdminController::getAllServices error", error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
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

      let result: boolean;

      if (action === "Block") {
        result = await this.blockUnblockServiceUseCase.blockService(serviceId);
      } else if (action === "Unblock") {
        result =
          await this.blockUnblockServiceUseCase.unblockService(serviceId);
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
    } catch (error: any) {
      console.error("AdminController::blockUnblockService error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || "Internal server error" });
      return;
    }
  }
  async blockUnblockServiceProvider(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { providerId, action } = req.body;

      if (!providerId || !action) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "providerId and action are required" });
        return;
      }

      let result: boolean;

      if (action === "Block") {
        result =
          await this.blockUnblockProviderUseCase.blockServiceProvider(
            providerId,
          );
      } else if (action === "Unblock") {
        result =
          await this.blockUnblockProviderUseCase.unblockServiceProvider(
            providerId,
          );
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
    } catch (error: any) {
      console.error(
        "AdminController::blockUnblockServiceProvider error",
        error,
      );
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || "Internal server error" });
      return;
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const { newCategory } = req.body;

      if (!newCategory) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category is required" });
        return;
      }

      const data = await this.addCategoryUseCase.execute({
        category: newCategory,
      });

      res.status(HttpStatus.OK).json({ data });
      return;
    } catch (error) {
      console.error("AdminController::addCategory error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.getCategoryUseCase.execute();

      console.log(categories);

      res.status(HttpStatus.OK).json(categories);
      return;
    } catch (error) {
      console.error("AdminController::getCategory error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
      return;
    }
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, categoryName } = req.body;

      if (!categoryId || !categoryName) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID and name are required" });
        return;
      }

      const data = await this.editCategoryUseCase.execute({
        categoryId,
        newName: categoryName,
      });

      res
        .status(HttpStatus.OK)
        .json({ message: "Category updated successfully", data });
      return;
    } catch (error) {
      console.error("AdminController::editCategory error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async blockUnblockCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.body;

      if (!categoryId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID is required" });
        return;
      }

      const data = await this.blockUnblockCategoryUseCase.execute({
        categoryId,
      });

      res.status(HttpStatus.OK).json({ message: data });
      return;
    } catch (error) {
      console.error("AdminController::blockUnblockCategory error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id: categoryId } = req.params;

      if (!categoryId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID is required" });
        return;
      }

      const data = await this.deleteCategoryUseCase.execute({ categoryId });

      res.status(HttpStatus.OK).json({ message: data });
      return;
    } catch (error) {
      console.error("AdminController::deleteCategory error", error);
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

      const data = await this.addServiceUseCase.execute({
        categoryId,
        service: {
          serviceName: newServiceName,
          serviceDescription: newServiceDescription,
          isHidden: false,
        },
      });

      res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      console.error("AdminController::addService error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  async deleteService(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, serviceId } = req.params;

      if (!categoryId || !serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID and Service ID are required" });
        return;
      }

      const data = await this.deleteServiceUseCase.execute({
        categoryId,
        serviceId,
      });

      res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      console.error("AdminController::deleteService error", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
      return;
    }
  }

  async blockUnblockCategoryService(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, serviceId } = req.body;

      if (!categoryId || !serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Category ID and Service ID are required" });
        return;
      }

      const data = await this.blockUnblockCategoryServiceUseCase.execute({
        categoryId,
        serviceId,
      });

      res.status(HttpStatus.OK).json({ message: data });
    } catch (error) {
      console.error("AdminController::blockUnblockCategoryService error", error);
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
    } catch (error) {
      console.error("AdminController::logoutAdmin error", error);
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
      console.log(data);
      if (!data) {
        res.status(HttpStatus.BAD_REQUEST);
        return;
      }

      const resdata = await this.createCouponUseCase.execute(data);
      console.log(resdata);
      res.status(HttpStatus.CREATED);
      return;
    } catch (e) {
      console.log(e);
    }
  }

  public async getAllCoupon(req: Request, res: Response) {
    try {
      const coupons = await this.findAllCouponsUseCase.execute();
      res.status(HttpStatus.CREATED).json(coupons);
      return;
    } catch (e) {
      console.log(e);
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
      const id = req.params.id;
      const action: boolean = req.body.action;
      if (!id) {
        res.status(HttpStatus.BAD_REQUEST);
        return;
      }

      await this.makeActiveInActiveCouponUseCase.execute(id, action);

      res.status(HttpStatus.OK).json({
        message: `Coupon ${action ? "activated" : "deactivated"} successfully`,
      });
    } catch (error) {
      console.error("Error toggling coupon status:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }

  public async showCouponsInBanner(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const action: boolean = req.body.action;

      if (!id) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Coupon ID is required" });
        return;
      }

      await this.showInBannerUseCase.execute(id, action);

      res.status(HttpStatus.OK).json({
        message: `Coupon ${
          action ? "shown in" : "removed from"
        } banner successfully`,
      });
    } catch (error) {
      console.error("Error toggling coupon banner status:", error);
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
      const data = await this.getWalletUseCase.execute(skip, limit);
      console.log(data);
      res.status(HttpStatus.OK).json({ data });
    } catch {}
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
      const data = await this.getWalletByIdUseCase.execute(id);
      res.status(HttpStatus.OK).json(data);
    } catch {}
  }

  async withdrawFromWallet(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, newStatus, reason } = req.body;
      const { walletId } = req.params;

      if (!walletId || !transactionId || !newStatus) {
        res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
        return;
      }

      const success = await this.withDrawProviderWallet.execute({
        walletId,
        transactionId,
        newStatus,
        reason,
      });

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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error("Error fetching subscriptions:", error);

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

      const newPlan = await this.createSubscriptionPlan.execute({
        name,
        price,
        validityDays,
        features: features || [],
        adLimitPerMonth: adLimitPerMonth || 0,
        payoutSpeedDays: payoutSpeedDays || 0,
        description: description || "",
      });

      res.status(201).json({
        success: true,
        message: "Subscription created successfully",
        data: newPlan,
      });
    } catch (error) {
      console.error("Create subscription error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async updateSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

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

      const updatedPlan = await this.updateSubscriptionPlan.execute(id, {
        name,
        price,
        validityDays,
        features,
        adLimitPerMonth,
        payoutSpeedDays,
        description,
      });

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
    } catch (error) {
      console.error("Update subscription error:", error);

      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async getAds(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const data = await this.getAdsUseCase.execute({ skip, limit });

      console.log(data);

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error fetching provider ads",
        error,
      });
    }
  }

  async changeAdStatus(req: Request, res: Response): Promise<void> {
    try {
      const { adId } = req.params;
      const { status } = req.body; // expecting { status: "active" | "block" }
      console.log("called");
      if (!adId || !status) {
        res.status(400).json({ message: "adId and status are required" });
        return;
      }
      console.log("called");

      const updated = await this.changeAdStatusUseCase.execute(adId, status);

      if (!updated) {
        res.status(404).json({ message: "Ad not found or status unchanged" });
        return;
      }

      res.status(200).json({
        message: "Ad status updated successfully",
        status,
      });
    } catch (error) {
      console.error("Error changing ad status:", error);

      res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }
}
