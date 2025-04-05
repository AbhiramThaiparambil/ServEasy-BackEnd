import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { TokenService } from "../services/auth/TokenService";
import { JwtPayload } from "jsonwebtoken";

export const roleMiddleware = (role: "user" | "admin") => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(`${role} auth middleware called`);

        const tokenService = container.resolve(TokenService);
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log(`No ${role} token provided`);
             res.status(401).json({ message: "Unauthorized: No token provided" });
             return
            }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = tokenService.verifyAccessToken(token) as JwtPayload;
            console.log(`${role} token decoded:`, decoded);

            if (role === "user") {
                if (!decoded.userId) {
                    console.log("Invalid user token data");
                     res.status(403).json({ message: "Forbidden: Invalid token payload" });
                     return
                    }
                res.locals.user = decoded; 
            }

            if (role === "admin") {
                if (!decoded.adminId) {
                    console.log("Invalid admin token data");
                     res.status(403).json({ message: "Forbidden: Invalid token payload" });
                     return
                    }
                res.locals.adminId = decoded; 
            }

            next();
        } catch (error: any) {
            console.log(`${role} token verification failed:`, error.message);
             res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
             return
            }
    };
};
