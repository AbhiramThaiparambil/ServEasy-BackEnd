import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import "./container";
import userRoutes from "./presentation/routes/User";
import cors from "cors";
import dbConnect from "./infrastructure/database/db";
import authRouter from "./presentation/routes/authRoutes";
import serviceProviderRoute from "./presentation/routes/serviceProvider";
import adminRoute from "./presentation/routes/admin";
dotenv.config();
import cookieparser from "cookie-parser";
const app = express();
app.use(cookieparser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/", authRouter);
app.use("/", userRoutes);
app.use("/service-providers", serviceProviderRoute);
app.use("/admin", adminRoute);
dbConnect().catch((e) => console.log(e));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
