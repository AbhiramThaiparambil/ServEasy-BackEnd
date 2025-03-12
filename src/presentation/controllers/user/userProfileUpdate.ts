import { Request, Response } from "express";
import { RegisterUser } from "../../../application/use-case/User/auth/RegisterUser";
import { container } from "tsyringe";
import { UserProfileUpdate } from "../../../application/use-case/User/updateProfile";
export const userProfileUpdate = async (req: Request, res: Response) => {
  try {
    res.locals.user_id;
    const userProfile = container.resolve(UserProfileUpdate);
    const user = res.locals.user;
    await userProfile.execute(user.userId, req.body.ProfileImg);
    res.status(201);
  } catch (error) {}
};
