import jwt, { JwtPayload } from "jsonwebtoken";
import { injectable } from "tsyringe";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class TokenService {
  private accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
  private refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

  generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, this.accessTokenSecret, { expiresIn: "15m" });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ userId }, this.refreshTokenSecret, { expiresIn: "7d" });
  }

  verifyAccessToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.accessTokenSecret) as JwtPayload;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}
