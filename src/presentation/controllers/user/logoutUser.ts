

import { Request, Response } from "express";

export const logoutUser = async (req: Request, res: Response) => {
  try {
    console.log('logOut-------------------------------');
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    if (req.cookies.serviceProviderToken) {
      res.clearCookie("serviceProviderToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    }

    res.status(200).json({ message: "User logged out successfully" });
    return;
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
