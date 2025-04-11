import { Request, Response } from "express";
import { container } from "tsyringe";
import { GoogleAuthUseCase } from "../../../../application/use-case/User/auth/googleAuth";
import { HttpStatus } from "../../../../constants/HttpStatus";

export const googleAuth = async (req: Request, res: Response) => {
  try {
    console.log("google");

    const { googleToken } = req.body;
    if (!googleToken) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: "google token is Required" });
    }
    const googleUseCase = container.resolve(GoogleAuthUseCase);
    const result = await googleUseCase.execute(googleToken);

    res.cookie("refreshToken", result?.refreshToke, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
  } catch (error) {
    console.error(error);
  }
};
