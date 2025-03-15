import { Request, Response } from "express";

import { TokenService } from "../../../services/auth/TokenService";
import { container } from "tsyringe";
import { MongoUserRepository } from "../../../infrastructure/repositories/UserRepositoriey";

export const refreshTokenAdmin = async (req: Request, res: Response) => {
  const adminTokenData = req.cookies.adminToken;
  const { refreshToken, isAdmin } = JSON.parse(adminTokenData);

  if (!refreshToken) {
    res.status(401).json({ error: "Refresh token is missing" });
    return;
  }
  try {
    const tokenService = container.resolve(TokenService);
    const userRepo = container.resolve(MongoUserRepository);
    const decoded = tokenService.verifyRefreshToken(refreshToken);
    if (!decoded) {
      res.status(401).json({ error: "Refresh token is missing" });
      return;
    }
    console.log(decoded.userId);

    const user = await userRepo.findById(decoded.userId);
    console.log(user);

    if (!user || !user.isAdmin) {
      res.status(404).json({ error: "user no found" });
      return;
    }

    const newAccessToken = await tokenService.generateAccessToken(
      user._id + "","adminId"
    );

    res.json({ accessToken: newAccessToken });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({ error });
    return;
  }
};
