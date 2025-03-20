import { Request, Response } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../../services/auth/TokenService";
import { GetAdminProfileUseCase } from "../../../application/use-case/admin/profile";
export const adminProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }
    const token = authHeader?.split(" ")[1];
     console.log(authHeader);
     
    const tokenService = container.resolve(TokenService);
    const getAdminProfileUseCase = container.resolve(GetAdminProfileUseCase);

    const decoded = await tokenService.verifyAccessToken(token);
    console.log('--------admin-profile-------');
    
   console.log(decoded)   
     if (!decoded || !decoded.adminId) {
      res.status(401).json({ message: "User not found" });

      return;
    }

    const data = await getAdminProfileUseCase.execute(decoded.adminId);
      
    res.status(200).json({ data });
  } catch (error) {}
};
