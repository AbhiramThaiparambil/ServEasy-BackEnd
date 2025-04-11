import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../services/auth/TokenService";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (role: "User" | "Admin") => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      console.log("Auth middleware called");
  
      const tokenService = container.resolve(TokenService);
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }
  
      const token = authHeader.split(" ")[1];
  
      try {
        const decoded = tokenService.verifyAccessToken(token) as JwtPayload;
  
        if (role === "User") {
          if (!decoded.userId) {
            console.log("Invalid token data");
            res.status(403).json({ message: "Forbidden: Invalid token payload" });
            return;
          }
  
          res.locals.user = decoded;
          next();
        } else if (role === "Admin") {
          if (!decoded.adminId) {
            console.log("Invalid admin token data");
            res.status(403).json({ message: "Forbidden: Invalid token payload" });
            return;
          }
  
          res.locals.adminId = decoded;
          next();
        }
      } catch (error: any) {
        console.log("Token verification failed:", error.message);
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
      }
    };
  };
  