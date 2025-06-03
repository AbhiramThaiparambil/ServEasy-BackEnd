import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { Signin } from "../../application/use-case/admin/auth/signin";
import { TokenService } from "../../services/auth/TokenService";
import { GetAdminProfileUseCase } from "../../application/use-case/admin/profile";
import { getAllUsersUseCase } from "../../application/use-case/admin/userManagement/getAllUsersUseCase";
import { blockUnblockUsersUseCase } from "../../application/use-case/admin/userManagement/blockUnblockUsersUseCase";
import { getServiceProvidersUseCase } from "../../application/use-case/admin/serviceProviderManagement/getServiceProvidersUsercase";
import { GetPaymentInfoUseCase } from "../../application/use-case/admin/getPaymentInfoUseCase";
import { AdminSiteSettingsUseCase } from "../../application/use-case/siteSetting/AdminSiteSettingsUseCase";
import { HttpStatus } from "../../constants/HttpStatus";

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
    private adminSiteSettingsUseCase: AdminSiteSettingsUseCase
  ) {}

  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, phone, password } = req.body;

      if (!password || (!email && !phone)) {
        return res
          .status(400)
          .json({ error: "Email or phone and password are required" });
      }

      let result;
      if (email) {
        result = await this.signInUseCase.signByEmail(email, password);
      } else {
        result = await this.signInUseCase.signByPhone(phone, password);
      }

      if (!result) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const { accessToken, refreshToken, user } = result;

      res.cookie("adminToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      return res.status(200).json({ accessToken, user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res
          .status(401)
          .json({ message: "Unauthorized: No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = await this.tokenService.verifyAccessToken(token);

      if (!decoded || !decoded.adminId) {
        return res.status(401).json({ message: "Admin not found" });
      }

      const data = await this.getAdminProfileUseCase.execute(decoded.adminId);
      return res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;

      const { users, count } = await this.getAllUsersUseCase.execute(
        skip,
        limit
      );
      return res.status(200).json({ users, count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async blockUnblockUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, action } = req.body;
      let data;

      if (action === "Block") {
        data = await this.blockUnblockUsersUseCase.blockUser(userId);
      } else {
        data = await this.blockUnblockUsersUseCase.unblockUser(userId);
      }

      if (data) {
        return res.status(200).json({ data });
      } else {
        return res
          .status(404)
          .json({ message: "User not found or update failed." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getServiceProviders(req: Request, res: Response): Promise<Response> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 0;
      const skip = page * limit;

      const { data, count } = await this.getServiceProvidersUseCase.execute(
        skip,
        limit
      );
      return res.status(200).json({ data, count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
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
        endDate
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
          req.body
        );
        res.status(HttpStatus.CREATED).json({ banner });
        return;
      }

      if (req.body.type === "addTheme") {
        const theme = await this.adminSiteSettingsUseCase.addTheme(
          req.body
        );
        res.status(HttpStatus.CREATED).json({ theme });
        return;
      }

      if (req.body.type === "addFooterBanner") {
        const footerBanner =
          await this.adminSiteSettingsUseCase.addFooterBanner(
            req.body
          );
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
       res.status(HttpStatus.OK).json({ message: "Banner deleted successfully" });
    return
    }

    if (req.body.type === "deleteFooterBanner") {
      await this.adminSiteSettingsUseCase.deleteFooterBanner(req.body.footerBannerId);
       res.status(HttpStatus.OK).json({ message: "Footer banner deleted successfully" });
    return
    }

    if (req.body.type === "deleteTheme") {
      await this.adminSiteSettingsUseCase.deleteTheme(req.body.themeName);
       res.status(HttpStatus.OK).json({ message: "Theme deleted successfully" });
    return
    }

     res.status(HttpStatus.BAD_REQUEST).json({ error: "Invalid type provided" });
  return
  } catch (error) {
    console.error("Error in deleteSiteSettings:", error);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  return
    }
}

async makeActiveSiteSettings(req: Request, res: Response): Promise<void> {
  try {
    console.log(req.body);
    
    if (req.body.type === "makeActiveHomeBanner") {
     
      const banner = await this.adminSiteSettingsUseCase.makeHomeBannerActive(req.body.id);
       res.status(HttpStatus.OK).json({ banner });
    return
    }

    if (req.body.type === "makeActiveFooterBanner") {
      
      const footerBanner = await this.adminSiteSettingsUseCase.makeFooterBannerActive(req.body.id);
       res.status(HttpStatus.OK).json({ footerBanner });
    return
    }

  

     res.status(HttpStatus.BAD_REQUEST).json({ error: "Invalid type provided" });
  return
    } catch (error) {
    console.error("Error in makeActiveSiteSettings:", error);
     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
  return
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
        console.error("Error in getSiteSettings:", error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
 

}


}
