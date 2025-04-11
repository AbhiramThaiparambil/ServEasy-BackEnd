import { VerifyServiceProvider } from "../../../application/use-case/serviceProvider/VerifyServiceProvider";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { HttpStatus } from "../../../constants/HttpStatus";

export const verifyServiceProvider = async (req: Request, res: Response) => {
  try {
    const verifyServiceProvideruseCase = container.resolve(
      VerifyServiceProvider
    );
    const user = res.locals.user;

    if (!user || !user.userId) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized access" });
      return;
    }

    const refreshToken = await verifyServiceProvideruseCase.execute(
      user.userId
    );

    if (!refreshToken) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Not a valid service provider" });
      return;
    }

    res.cookie("serviceProviderToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({ message: "Service provider verified" });
    return;
  } catch (error) {
    console.error("Error in getServiceProvider:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
    return;
  }
};
