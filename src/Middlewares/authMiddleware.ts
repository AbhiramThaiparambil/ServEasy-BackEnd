import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../services/auth/TokenService";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const tokenService = container.resolve(TokenService);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
         res.status(401).json({ message: "Unauthorized: No token provided" });
         return
        }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = tokenService.verifyAccessToken(token) as JwtPayload;

        if (!decoded.userId) {
             res.status(403).json({ message: "Forbidden: Invalid token payload" });
             return
            }

        res.locals.user = decoded; 

        next(); 
    } catch (error) {
         res.status(403).json({ message: "Forbidden: Invalid or expired token" });
         return
        }
};
