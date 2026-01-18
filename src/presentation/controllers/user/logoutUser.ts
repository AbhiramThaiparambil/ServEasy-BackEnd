// import { Request, Response } from "express";
// import { HttpStatus } from "../../../constants/HttpStatus";

// export const logoutUser = async (req: Request, res: Response) => {
//   try {

//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     if (req.cookies.serviceProviderToken) {
//       res.clearCookie("serviceProviderToken", {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });
//     }

//     res.status(HttpStatus.OK).json({ message: "User logged out successfully" });
//     return;
//   } catch (error) {
//     console.error("Logout error:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
//     return;
//   }
// };
