import { Request, Response } from "express";
import { Signin } from "../../../application/use-case/admin/auth/signin";
import { config } from "dotenv";
import { container } from "tsyringe";

config();

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, phone, password } = req.body;
    console.log(email, phone, password);

    if (!password || (!email && !phone)) {
      res
        .status(400)
        .json({ error: "Email or phone and password are required" });
      return;
    }

    const signInUseCase = container.resolve(Signin);
    let result;

    if (email) {
      console.log("Email Sign-In");
      result = await signInUseCase.signByEmail(email, password);
    } else if (phone) {
      console.log("Phone Sign-In");
      result = await signInUseCase.signByPhone(phone, password);
    }

    if (!result) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const { accessToken, refreshToken, user } = result;

    const refreshTokenData = JSON.stringify({
      refreshToken,
      isAdmin: true, // Set isAdmin to true
    });
    console.log(refreshTokenData);

    // Set the cookie with the JSON string
    res.cookie("adminToken", refreshTokenData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ accessToken, user });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
