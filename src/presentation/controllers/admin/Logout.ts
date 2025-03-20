import { Request, Response } from "express";

export const logoutAdmin = async (req: Request, res: Response) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

     res.status(200).json({ message: "Admin logged out successfully" });
     return
    } catch (error) {
    console.error("Logout error:", error);
    
     res.status(500).json({ message: "Internal server error" });
     return
    }
};
