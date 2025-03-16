import { Request, Response } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../../services/auth/TokenService";
import { GetUserProfileUseCase } from "../../../application/use-case/User/GetProfile";
export const userProfile = async (req: Request, res: Response) => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }
    const token = authHeader?.split(" ")[1];
    const tokenService = container.resolve(TokenService);
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    const decoded = await tokenService.verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      res.status(401).json({ message: "User not found" });

      return;
    }

    const user = await getUserProfileUseCase.execute(decoded.userId);

    res.status(200).json({ user });
  } catch (error) {}
};
