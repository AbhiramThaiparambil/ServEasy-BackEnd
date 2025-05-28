import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { Signin } from "../../application/use-case/admin/auth/signin";
import { TokenService } from "../../services/auth/TokenService";
import { GetAdminProfileUseCase } from "../../application/use-case/admin/profile";
import { getAllUsersUseCase } from "../../application/use-case/admin/userManagement/getAllUsersUseCase";
import { blockUnblockUsersUseCase } from "../../application/use-case/admin/userManagement/blockUnblockUsersUseCase";
import { getServiceProvidersUseCase } from "../../application/use-case/admin/serviceProviderManagement/getServiceProvidersUsercase";
import { GetPaymentInfoUseCase } from "../../application/use-case/admin/getPaymentInfoUseCase";

@injectable()
export class AdminController {
  constructor(
    @inject(Signin) private signInUseCase: Signin,
    @inject(TokenService) private tokenService: TokenService,
    @inject(GetAdminProfileUseCase) private getAdminProfileUseCase: GetAdminProfileUseCase,
    @inject(getAllUsersUseCase) private getAllUsersUseCase: getAllUsersUseCase,
    @inject(blockUnblockUsersUseCase) private blockUnblockUsersUseCase: blockUnblockUsersUseCase,
    @inject(getServiceProvidersUseCase) private getServiceProvidersUseCase: getServiceProvidersUseCase,
        @inject(GetPaymentInfoUseCase) private getPaymentInfoUseCase: GetPaymentInfoUseCase,

  ) {}

  async signIn(req: Request, res: Response): Promise<Response> {
    try {
      const { email, phone, password } = req.body;

      if (!password || (!email && !phone)) {
        return res.status(400).json({ error: "Email or phone and password are required" });
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
        return res.status(401).json({ message: "Unauthorized: No token provided" });
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

      const { users, count } = await this.getAllUsersUseCase.execute(skip, limit);
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
        return res.status(404).json({ message: "User not found or update failed." });
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

      const { data, count } = await this.getServiceProvidersUseCase.execute(skip, limit);
      return res.status(200).json({ data, count });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
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
    console.error("Failed to fetch payment info for chart:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}






}
