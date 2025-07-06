import { Response } from "express";

export const setAuthCookies = (res: Response,role:"refreshToken"|"adminToken"|"serviceProviderToken", refreshToken: string) => {
  res.cookie(role, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    path: "/",
  });
};
