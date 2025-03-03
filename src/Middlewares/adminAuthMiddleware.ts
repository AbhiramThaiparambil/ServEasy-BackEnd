import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../services/auth/TokenService";
import { JwtPayload } from "jsonwebtoken";

export const adminAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("🔒 Admin auth middleware called");
    const adminTokenData = req.cookies.adminToken;
    const { isAdmin } = JSON.parse(adminTokenData);
     console.log(isAdmin);
         
    const tokenService = container.resolve(TokenService);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No admin token provided");
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = tokenService.verifyAccessToken(token) as JwtPayload;
        console.log("✅ Admin token decoded:", decoded);

        if (!decoded.userId || !isAdmin) {
            console.log("Invalid admin token data");
            res.status(403).json({ message: "Forbidden: Invalid token payload" });
            return;
        }

        res.locals.admin = decoded; 

        next(); 
    } catch (error: any) {
        console.log("Admin token verification failed:", error.message);

        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        return;
    }
};
