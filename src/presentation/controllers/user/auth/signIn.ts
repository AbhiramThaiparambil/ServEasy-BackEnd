import { Request, Response } from "express";
import { RegisterUser } from "../../../../application/use-case/User/auth/RegisterUser";
import { container } from "tsyringe";
import { HttpStatus } from "../../../../constants/HttpStatus";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const registerUser = container.resolve(RegisterUser);

    const { userName, email, password, phone } = req.body;

    if (!userName || !password) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: "Username and password are required" });
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
      res.status(HttpStatus.BAD_REQUEST).json({ message: "Either phone or email is required" });
    }

    const result = await registerUser.execute(data);

    if (result.user) {
      const regInfo = result.user.phone ? result.user.phone : result.user.email;
      const message = result.user.phone
        ? "OTP sent to phone"
        : "Your account has been successfully created";

      res.status(HttpStatus.CREATED).json({ message, regInfo });
    } else if (result.errorMessage) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: result.errorMessage });
    }
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Registration error:", errorMessage);
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: errorMessage || "An unexpected error occurred" });
  }
};
