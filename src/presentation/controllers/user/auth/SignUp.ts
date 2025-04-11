import { Request, Response } from "express";

import { SignIn } from "../../../../application/use-case/User/auth/SignIn";
import { config } from "dotenv";
import { HttpStatus } from "../../../../constants/HttpStatus";

config();

const signInUseCase = SignIn.create();

export const signIn = async (req: Request, res: Response) => {
  const { method } = req.params;

  try {
    if (method === "email") {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Email and password are required" });
        return;
      }

      const result = await signInUseCase.signInWithEmail(email, password);
      console.log(result);

      if (result?.errorOtp) {
        res.status(HttpStatus.BAD_REQUEST).json({ errorOtp: result.errorOtp });
        return;
      }

      if (result?.errorMessage) {
        res.status(401).json({ error: result.errorMessage });
        return;
      }

      res.cookie("refreshToken", result?.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
      return;
    }

    if (method === "phone") {
      console.log("Phone Sign-In");

      const { phone, password } = req.body;

      if (!phone || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: "Phone and password are required" });
        return;
      }

      const result = await signInUseCase.signInWithPhone(phone, password);

      if (result?.errorOtp) {
        res.status(HttpStatus.BAD_REQUEST).json({ errorOtp: result.errorOtp });
        return;
      }

      if (result?.errorMessage) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: result.errorMessage });
        return;
      }

      res.cookie("refreshToken", result?.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
      return;
    }
  } catch (error) {
    console.error(error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
    return;
  }
};
