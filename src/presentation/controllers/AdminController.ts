import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Signin } from '../../application/use-case/admin/auth/signin';
import { TokenService } from '../../services/auth/TokenService';
import { GetAdminProfileUseCase } from '../../application/use-case/admin/profile';
import { getAllUsersUseCase } from '../../application/use-case/admin/userManagement/getAllUsersUseCase';
import { blockUnblockUsersUseCase } from '../../application/use-case/admin/userManagement/blockUnblockUsersUseCase';
import { getServiceProvidersUseCase } from '../../application/use-case/admin/serviceProviderManagement/getServiceProvidersUsercase';
import { GetPaymentInfoUseCase } from '../../application/use-case/admin/getPaymentInfoUseCase';
import { AdminSiteSettingsUseCase } from '../../application/use-case/siteSetting/AdminSiteSettingsUseCase';
import { HttpStatus } from '../../constants/HttpStatus';
import { ServiceProviderRejectVerify } from '../../application/use-case/admin/serviceProviderManagement/serviceProviderRejectUseCase';
import { GetAllServics } from '../../application/use-case/admin/service-management/getAllServices';
import { BlockUnblockSericeAdmin } from '../../application/use-case/admin/service-management/blockUnblock';
import { BlockUnblockSericeProvider } from '../../application/use-case/admin/serviceProviderManagement/blockUnblockProvider';
import { AddCategory } from '../../application/use-case/admin/category-management/addCategory';
import { GetCategory } from '../../application/use-case/admin/category-management/GetCategory';
import { EditCategory } from '../../application/use-case/admin/category-management/editCategory';
import { BlockUnblockCategory } from '../../application/use-case/admin/category-management/blockUnblockCategory';
import { DeleteCategory } from '../../application/use-case/admin/category-management/deleteCategory';
import { AddService } from '../../application/use-case/admin/category-management/addService';
import { DeleteService } from '../../application/use-case/admin/category-management/deleteService';
import path from 'path';
import fs from 'fs';
import { setAuthCookies } from '../../utils/setAuthCookies';
import { USE_CASE_TOKENS } from '../../utils/constants/tokens';
import { ICreateCouponUseCase } from '../../application/use-case/coupon/createCoupon/ICreateCouponUseCase';
import { IFindAllCouponsUseCase } from '../../application/use-case/coupon/findAllCoupons/IFindAllCouponsUseCase';
import { IMakeCouponInactiveUseCase } from '../../application/use-case/coupon/makeCouponInactive/IMakeCouponInactiveUseCase';
import { IToggleShowInBannerUseCase } from '../../application/use-case/coupon/toggleShowInBanner/IToggleShowInBannerUseCase';
import { IGetAllProvidersWalletsUseCase } from '../../application/use-case/admin/wallet/getWallet/IGetAllProvidersWallets.usecase';
import { IGetProviderWalletUseCase } from '../../application/use-case/admin/wallet/getWallet/IGetProviderWalletById.usecase';
import { IWithdrawFromProviderWalletUseCase } from '../../application/use-case/admin/wallet/IWithdrawFromProviderWallet.usecase';

@injectable()
export class AdminController {
  constructor(
    @inject(Signin) private signInUseCase: Signin,
    @inject(TokenService) private tokenService: TokenService,
    @inject(GetAdminProfileUseCase)
    private getAdminProfileUseCase: GetAdminProfileUseCase,
    @inject(getAllUsersUseCase) private getAllUsersUseCase: getAllUsersUseCase,
    @inject(blockUnblockUsersUseCase)
    private blockUnblockUsersUseCase: blockUnblockUsersUseCase,
    @inject(getServiceProvidersUseCase)
    private getServiceProvidersUseCase: getServiceProvidersUseCase,
    @inject(GetPaymentInfoUseCase)
    private getPaymentInfoUseCase: GetPaymentInfoUseCase,
    @inject(AdminSiteSettingsUseCase)
    private adminSiteSettingsUseCase: AdminSiteSettingsUseCase,
    @inject(ServiceProviderRejectVerify)
    private serviceProviderRejectVerify: ServiceProviderRejectVerify,

    @inject(GetAllServics)
    private getAllServicesUseCase: GetAllServics,
    @inject(BlockUnblockSericeAdmin)
    private blockUnblockServiceUseCase: BlockUnblockSericeAdmin,
    @inject(BlockUnblockSericeProvider)
    private blockUnblockProviderUseCase: BlockUnblockSericeProvider,
    @inject(AddCategory)
    private addCategoryUseCase: AddCategory,
    @inject(GetCategory)
    private getCategoryUseCase: GetCategory,
    @inject(EditCategory)
    private editCategoryUseCase: EditCategory,
    @inject(BlockUnblockCategory)
    private blockUnblockCategoryUseCase: BlockUnblockCategory,
    @inject(DeleteCategory)
    private deleteCategoryUseCase: DeleteCategory,
    @inject(AddService)
    private addServiceUseCase: AddService,
    @inject(DeleteService)
    private deleteServiceUseCase: DeleteService,
    @inject(USE_CASE_TOKENS.CreateCouponUseCase) private createCouponUseCase: ICreateCouponUseCase,
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
    private withDrawProviderWallet: IWithdrawFromProviderWalletUseCase
  ) {}

  async signIn(req: Request, res: Response) {
    try {
      const { email, phone, password } = req.body;

      if (!password || (!email && !phone)) {
        res.status(400).json({ error: 'Email or phone and password are required' });
        return;
      }

      let result;
      if (email) {
        result = await this.signInUseCase.signByEmail(email, password);
      } else {
        result = await this.signInUseCase.signByPhone(phone, password);
      }

      if (!result) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const { accessToken, refreshToken, user } = result;

      setAuthCookies(res, 'adminToken', refreshToken);
      res.status(200).json({ accessToken, user });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      if (!res.locals.adminId.adminId) {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
      }

      const data = await this.getAdminProfileUseCase.execute(res.locals.adminId.adminId);
      res.status(200).json({ data });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const search = req.query.search || '';
      const { users, count } = await this.getAllUsersUseCase.execute(skip, limit, search as string);
      res.status(200).json({ users, count });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async getServiceProviders(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const search = req.query.search || '';
      const verification = req.query.verification;
      const { data, count } = await this.getServiceProvidersUseCase.execute(
        skip,
        limit,
        search as string,
        verification ? true : false
      );

      res.status(HttpStatus.OK).json({ data, count });
      return;
    } catch (error) {
      console.error('AdminController::getServiceProviders error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async getPaymentInfoForChart(req: Request, res: Response): Promise<void> {
    try {
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const paymentData = await this.getPaymentInfoUseCase.execute(startDate, endDate);

      res.status(200).json({ paymentData });
      return;
    } catch (error) {
      console.error('Failed to fetch payment info for chart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async addSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      console.log('Received request to add site settings:', req.body);
      if (req.body.type === 'addBanner') {
        const banner = await this.adminSiteSettingsUseCase.addHomeBanner(req.body);
        res.status(HttpStatus.CREATED).json({ banner });
        return;
      }

      if (req.body.type === 'addTheme') {
        const theme = await this.adminSiteSettingsUseCase.addTheme(req.body);
        res.status(HttpStatus.CREATED).json({ theme });
        return;
      }

      if (req.body.type === 'addFooterBanner') {
        const footerBanner = await this.adminSiteSettingsUseCase.addFooterBanner(req.body);
        res.status(HttpStatus.CREATED).json({ footerBanner });
        return;
      }

      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid type provided' });
      return;
    } catch (error) {
      console.error('Error in addSiteSettings:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      return;
    }
  }

  async deleteSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      if (req.body.type === 'deleteBanner') {
        await this.adminSiteSettingsUseCase.deleteHomeBanner(req.body.bannerId);
        res.status(HttpStatus.OK).json({ message: 'Banner deleted successfully' });
        return;
      }

      if (req.body.type === 'deleteFooterBanner') {
        await this.adminSiteSettingsUseCase.deleteFooterBanner(req.body.footerBannerId);
        res.status(HttpStatus.OK).json({ message: 'Footer banner deleted successfully' });
        return;
      }

      if (req.body.type === 'deleteTheme') {
        await this.adminSiteSettingsUseCase.deleteTheme(req.body.themeName);
        res.status(HttpStatus.OK).json({ message: 'Theme deleted successfully' });
        return;
      }

      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid type provided' });
      return;
    } catch (error) {
      console.error('Error in deleteSiteSettings:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      return;
    }
  }

  async makeActiveSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      console.log(req.body);

      if (req.body.type === 'makeActiveHomeBanner') {
        const banner = await this.adminSiteSettingsUseCase.makeHomeBannerActive(req.body.id);
        res.status(HttpStatus.OK).json({ banner });
        return;
      }

      if (req.body.type === 'makeActiveFooterBanner') {
        const footerBanner = await this.adminSiteSettingsUseCase.makeFooterBannerActive(
          req.body.id
        );
        res.status(HttpStatus.OK).json({ footerBanner });
        return;
      }

      res.status(HttpStatus.BAD_REQUEST).json({ error: 'Invalid type provided' });
      return;
    } catch (error) {
      console.error('Error in makeActiveSiteSettings:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
      return;
    }
  }

  async getSiteSettings(req: Request, res: Response): Promise<void> {
    try {
      const homeBanners = await this.adminSiteSettingsUseCase.findAllHomeBanners();
      const footerBanners = await this.adminSiteSettingsUseCase.findAllFooterBanners();
      const themes = await this.adminSiteSettingsUseCase.findAllThemes();

      res.status(HttpStatus.OK).json({
        homeBanners,
        footerBanners,
        themes,
      });
    } catch (error) {
      console.error('Error in getSiteSettings:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }

  async blockUnblockUser(req: Request, res: Response) {
    try {
      const { userId, action } = req.body;

      let data;
      if (action === 'Block') {
        data = await this.blockUnblockUsersUseCase.blockUser(userId);
      } else {
        data = await this.blockUnblockUsersUseCase.unblockUser(userId);
      }

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found or update failed.' });
        return;
      }
    } catch (error) {
      console.error('AdminController::blockUnblockUser error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async serviceProviderReject(req: Request, res: Response): Promise<void> {
    try {
      const { serviceProviderId, reason } = req.body;

      const data = await this.serviceProviderRejectVerify.rejectServiceProvider(
        serviceProviderId,
        reason
      );

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found or update failed.' });
        return;
      }
    } catch (error) {
      console.error('AdminController::serviceProviderReject error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async serviceProviderVerify(req: Request, res: Response): Promise<void> {
    try {
      const { serviceProviderId } = req.body;

      const data = await this.serviceProviderRejectVerify.verifyServiceProvider(serviceProviderId);

      if (data) {
        res.status(HttpStatus.OK).json({ data });
        return;
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found or update failed.' });
        return;
      }
    } catch (error) {
      console.error('AdminController::serviceProviderVerify error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
      return;
    }
  }

  async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;
      const search = req.query.search || '';

      const { allServices, count } = await this.getAllServicesUseCase.execute(
        skip,
        limit,
        search as string
      );

      res.status(HttpStatus.OK).json({ allServices, count });
      return;
    } catch (error) {
      console.error('AdminController::getAllServices error', error);
      res.status(HttpStatus.BAD_REQUEST).json(error);
      return;
    }
  }

  async blockUnblockService(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId, action } = req.body;

      if (!serviceId || !action) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'serviceId and action are required' });
        return;
      }

      let result: boolean;

      if (action === 'Block') {
        result = await this.blockUnblockServiceUseCase.blockService(serviceId);
      } else if (action === 'Unblock') {
        result = await this.blockUnblockServiceUseCase.unblockService(serviceId);
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
      console.error('AdminController::blockUnblockService error', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || 'Internal server error' });
      return;
    }
  }
  async blockUnblockServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const { providerId, action } = req.body;

      if (!providerId || !action) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'providerId and action are required' });
        return;
      }

      let result: boolean;

      if (action === 'Block') {
        result = await this.blockUnblockProviderUseCase.blockServiceProvider(providerId);
      } else if (action === 'Unblock') {
        result = await this.blockUnblockProviderUseCase.unblockServiceProvider(providerId);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Invalid action. Use 'Block' or 'Unblock'." });
        return;
      }

      if (result) {
        res
          .status(HttpStatus.OK)
          .json({ message: `Service Provider ${action.toLowerCase()}ed successfully` });
        return;
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: `Failed to ${action.toLowerCase()} service provider` });
        return;
      }
    } catch (error: any) {
      console.error('AdminController::blockUnblockServiceProvider error', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message || 'Internal server error' });
      return;
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const { newCategory } = req.body;

      if (!newCategory) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category is required' });
        return;
      }

      const data = await this.addCategoryUseCase.execute({ category: newCategory });

      res.status(HttpStatus.OK).json({ data });
      return;
    } catch (error) {
      console.error('AdminController::addCategory error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
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
      console.error('AdminController::getCategory error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error.' });
      return;
    }
  }

  async editCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, categoryName } = req.body;

      if (!categoryId || !categoryName) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category ID and name are required' });
        return;
      }

      const data = await this.editCategoryUseCase.execute(categoryId, categoryName);

      res.status(HttpStatus.OK).json({ message: 'Category updated successfully', data });
      return;
    } catch (error) {
      console.error('AdminController::editCategory error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      return;
    }
  }

  async blockUnblockCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.body;

      if (!categoryId) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category ID is required' });
        return;
      }

      const message = await this.blockUnblockCategoryUseCase.execute(categoryId);

      res.status(HttpStatus.OK).json({ message });
      return;
    } catch (error) {
      console.error('AdminController::blockUnblockCategory error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      return;
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Category ID is required' });
        return;
      }

      const message = await this.deleteCategoryUseCase.execute(id);

      res.status(HttpStatus.OK).json({ message });
      return;
    } catch (error) {
      console.error('AdminController::deleteCategory error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      return;
    }
  }

  async addService(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, newServiceName, newServiceDescription } = req.body;

      if (!categoryId || !newServiceName || !newServiceDescription) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'All fields are required' });
        return;
      }

      const service = await this.addServiceUseCase.execute(categoryId, {
        serviceName: newServiceName,
        serviceDescription: newServiceDescription,
        isHidden: false,
      });

      res.status(HttpStatus.OK).json({ message: service });
    } catch (error) {
      console.error('AdminController::addService error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
  }

  async deleteService(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, serviceId } = req.params;

      if (!categoryId || !serviceId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: 'Category ID and Service ID are required' });
        return;
      }

      const message = await this.deleteServiceUseCase.execute(categoryId, serviceId);

      res.status(HttpStatus.OK).json({ message });
    } catch (error) {
      console.error('AdminController::deleteService error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      return;
    }
  }

  public async logoutAdmin(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('adminToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      res.status(HttpStatus.OK).json({ message: 'Admin logged out successfully' });
    } catch (error) {
      console.error('AdminController::logoutAdmin error', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  public async getCurrentLog(req: Request, res: Response) {
    const logFilePath = path.join(__dirname, '../../../logs/access.log');

    if (!fs.existsSync(logFilePath)) {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Log file not found' });
      return;
    }

    const logContent = fs.readFileSync(logFilePath, 'utf-8');

    const reversedLog = logContent.split('\n').filter(Boolean).reverse().join('\n');

    res.setHeader('Content-Type', 'text/plain');
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
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
  public async activeInActiveCoupons(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const action: boolean = req.body.action;
      if (!id) {
        res.status(HttpStatus.BAD_REQUEST);
        return;
      }

      await this.makeActiveInActiveCouponUseCase.execute(id, action);

      res
        .status(HttpStatus.OK)
        .json({ message: `Coupon ${action ? 'activated' : 'deactivated'} successfully` });
    } catch (error) {
      console.error('Error toggling coupon status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
    }
  }

  public async showCouponsInBanner(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const action: boolean = req.body.action;

      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'Coupon ID is required' });
        return;
      }

      await this.showInBannerUseCase.execute(id, action);

      res
        .status(HttpStatus.OK)
        .json({ message: `Coupon ${action ? 'shown in' : 'removed from'} banner successfully` });
    } catch (error) {
      console.error('Error toggling coupon banner status:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
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
        res.status(HttpStatus.BAD_REQUEST).json({ message: 'provider Id is missing' });
        return;
      }
      const data = await this.getWalletByIdUseCase.execute(id);
      res.status(HttpStatus.OK).json(data);
    } catch {}
  }

  async withdrawFromWallet(req: Request, res: Response): Promise<void> {
    try {
      const { transactionId, newStatus,reason} = req.body;
      const { walletId } = req.params;

      if (!walletId || !transactionId || !newStatus) {
        res.status(400).json({ success: false, message: 'Missing required fields' });
        return;
      }

      const success = await this.withDrawProviderWallet.execute({
         walletId,
        transactionId,
        newStatus,
        reason
      });

      if (!success) {
        res.status(404).json({ success: false, message: 'Transaction not found or not updated' });
        return;
      }

      res.status(200).json({ success: true, message: 'Transaction status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
