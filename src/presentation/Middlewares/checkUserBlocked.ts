import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { MongoUserRepository } from "../../infrastructure/repositories/UserRepositoriey";
import { REPOSITORY_TOKENS } from "../../constants/tokens";
export const checkUserBlocked = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user?.userId;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized: User not found in request" });
      return;
    }

    const userRepository = container.resolve<MongoUserRepository>(
      REPOSITORY_TOKENS.UserRepository
    );
    const user = await userRepository.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({ message: "User is blocked" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error in checkUserBlocked middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
