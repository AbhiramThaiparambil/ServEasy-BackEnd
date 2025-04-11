import { Request, Response } from "express";
import { container } from "tsyringe";
import { TokenService } from "../../../services/auth/TokenService";
import { GetUserProfileUseCase } from "../../../application/use-case/User/GetProfile";
import { HttpStatus } from "../../../constants/HttpStatus";
export const userProfile = async (req: Request, res: Response) => {
  try {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: "Unauthorized: No token provided" });
      return;
    }
    const token = authHeader?.split(" ")[1];
    const tokenService = container.resolve(TokenService);
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    const decoded = await tokenService.verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: "User not found" });

      return;
    }

    const user = await getUserProfileUseCase.execute(decoded.userId);

    res.status(HttpStatus.OK).json({ user });
  } catch (error) {}
};
