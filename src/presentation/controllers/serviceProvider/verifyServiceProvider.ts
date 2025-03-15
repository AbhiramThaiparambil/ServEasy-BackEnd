import { VerifyServiceProvider } from "../../../application/use-case/serviceProvider/VerifyServiceProvider";
import { Request, Response } from "express";
import { container } from "tsyringe";

export const verifyServiceProvider = async (req: Request, res: Response) => {
  try {
    console.log('---------------------');
    
    const verifyServiceProvideruseCase = container.resolve(
      VerifyServiceProvider
    );
    const user = res.locals.user;
    console.log(user);

    if (!user || !user.userId) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const refreshToken = await verifyServiceProvideruseCase.execute(user.userId);

    if (!refreshToken) {
      res.status(400).json({ message: "Not a valid service provider" });
      return;
    }

    res.cookie("serviceProviderToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Service provider verified" });
    return;
  } catch (error) {
    console.error("Error in getServiceProvider:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
