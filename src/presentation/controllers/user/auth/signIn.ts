import { Request, Response } from "express";
import { RegisterUser } from "../../../../application/use-case/User/auth/RegisterUser";
import { container } from "tsyringe";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const registerUser = container.resolve(RegisterUser);
    console.log(registerUser);

    const { userName, email, password, phone } = req.body;

    if (!userName || !password) {
      res.status(400).json({ message: "Username and password are required" });
    }

    const data: {
      userName: string;
      password: string;
      phone?: string;
      email?: string;
    } = {
      userName,
      password,
    };

    if (phone) {
      data.phone = phone;
    } else if (email) {
      data.email = email;
    } else {
      res.status(400).json({ message: "Either phone or email is required" });
    }

    const result = await registerUser.execute(data);

    if (result.user) {
      const regInfo = result.user.phone ? result.user.phone : result.user.email;
      const message = result.user.phone
        ? "OTP sent to phone"
        : "Your account has been successfully created";

      res.status(201).json({ message, regInfo });
    } else if (result.errorMessage) {
      res.status(400).json({ message: result.errorMessage });
    }
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Registration error:", errorMessage);
    res
      .status(400)
      .json({ message: errorMessage || "An unexpected error occurred" });
  }
};
