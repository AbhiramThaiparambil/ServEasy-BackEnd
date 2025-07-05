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
import googleRouter from "./presentation/routes/google";
import locationRouter from "./presentation/routes/location";
import serviceRouter from "./presentation/routes/service";
import morgan from "morgan"
import paymentRouter from "./presentation/routes/payment";

import { container } from "tsyringe";
import chatRouter from "./presentation/routes/chat"
import http from 'http'
import { SocketService } from "./services/socket/socketService";
import morganMiddleware from "./utils/logger";
const app = express();
const server=http.createServer(app)
app.use(cookieparser());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morganMiddleware)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH","PUT","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const socketService = container.resolve(SocketService);
socketService.initialize(server);

app.use('/location',locationRouter)

app.use("/", authRouter);
app.use("/", userRoutes);
app.use("/service-providers", serviceProviderRoute);
app.use("/google",googleRouter)
app.use("/admin", adminRoute);
app.use("/service", serviceRouter);
app.use("/payment",paymentRouter)
app.use("/chat",chatRouter)
dbConnect().catch((e) => console.log(e));
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
