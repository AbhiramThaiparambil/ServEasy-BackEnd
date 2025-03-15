import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../services/auth/TokenService";
import { JwtPayload } from "jsonwebtoken";

export const serviceProviderAuth = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Auth middleware called");

    if (!req.cookies.serviceProviderToken) {
         res.status(400).json({ message: "Unauthorized: No ServiceProvider token provided" });
         return
        }

    const tokenService = container.resolve(TokenService);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token provided");
         res.status(401).json({ message: "Unauthorized: No token provided" });
         return
        }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = tokenService.verifyAccessToken(token) as JwtPayload;
        console.log("Token decoded:", decoded);

        if (!decoded.userId) {
            console.log("Invalid token data");
             res.status(403).json({ message: "Forbidden: Invalid token payload" });
             return
            }
     const decodedServiceProvider = tokenService.verifyRefreshToken(req.cookies.serviceProviderToken)as JwtPayload;
               if(!decodedServiceProvider.serviceProvider||!decodedServiceProvider){
                res.status(403).json({ message: "Forbidden: Invalid token serviceProvider" });
                return
               }
        res.locals.serviceProvider_id=decodedServiceProvider.serviceProvider
        res.locals.user = decoded;

        next();
    } catch (error: any) {
        console.log("Token verification failed:", error.message);
         res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
         return
        }
};
