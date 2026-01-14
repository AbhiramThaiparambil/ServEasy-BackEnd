import { JwtPayload } from "jsonwebtoken";

export interface ITokenService {
  generateAccessToken(userId: string, role: string): string;
  generateRefreshToken(userId: string, role: string): string;

  verifyAccessToken(token: string): JwtPayload | null;
  verifyRefreshToken(token: string): JwtPayload | null;
}
