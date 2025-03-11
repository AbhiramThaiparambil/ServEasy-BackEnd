import { Request, Response } from "express";
import { SignIn } from "../../../../application/use-case/SignIn";
import { config } from "dotenv";

config();

const signInUseCase = SignIn.create();

export const signIn = async (req: Request, res: Response) => {
  const { method } = req.params;

  try {
    if (method === "email") {
      console.log("Email Sign-In");

      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const result = await signInUseCase.signInWithEmail(email, password);
      console.log(result);

      if (result?.errorOtp) {
        res.status(400).json({ errorOtp: result.errorOtp });
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

      res.status(200).json({ accessToken: result?.accessToken });
      return;
    }

    if (method === "phone") {
      console.log("Phone Sign-In");

      const { phone, password } = req.body;

      if (!phone || !password) {
        res.status(400).json({ error: "Phone and password are required" });
        return;
      }

      const result = await signInUseCase.signInWithPhone(phone, password);

      if (result?.errorOtp) {
        res.status(400).json({ errorOtp: result.errorOtp });
        return;
      }

      if (result?.errorMessage) {
        res.status(401).json({ error: result.errorMessage });
        return;
      }
      console.log(result?.refreshToken);

      res.cookie("refreshToken", result?.refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.status(200).json({ accessToken: result?.accessToken });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
