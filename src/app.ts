import "reflect-metadata";
import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import http from "http";
import { container } from "tsyringe";
import "./container";
import dbConnect from "./infrastructure/database/db";
import authRouter from "./presentation/routes/auth";
import userRoutes from "./presentation/routes/user";
import locationRouter from "./presentation/routes/location";
import serviceProviderRoute from "./presentation/routes/serviceProvider";
import serviceProviderSubscriptionRouter from "./presentation/routes/serviceProviderSubscription";
import adminRoute from "./presentation/routes/admin";
import serviceRouter from "./presentation/routes/service";
import paymentRouter from "./presentation/routes/payment";
import chatRouter from "./presentation/routes/chat";
import morganMiddleware from "./utils/logger";
import { SocketService } from "./services/socket/SocketService";
import { SubscriptionCheckJob } from "./infrastructure/jobs/cron/SubscriptionCheckJob";
import { AdsExpireJob } from "./infrastructure/jobs/cron/AdsExpireJob";
import { CleanupExpiredSlotsJob } from "./infrastructure/jobs/cron/CleanupExpiredSlotsJob";
import { errorMiddleware } from "./presentation/Middlewares/errorMiddleware";

const app = express();
const server = http.createServer(app);

const allowedOrigins =
  process.env.CLIENT_URL?.split(",").map((url) => url.trim()) || [];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morganMiddleware);

container.resolve(SocketService).initialize(server);

container.resolve(SubscriptionCheckJob).schedule();
container.resolve(AdsExpireJob).start();
container.resolve(CleanupExpiredSlotsJob).schedule();

app.use("/", authRouter);
app.use("/", userRoutes);
app.use("/location", locationRouter);
app.use("/service-providers", serviceProviderRoute);
app.use("/service-providers", serviceProviderSubscriptionRouter);
app.use("/admin", adminRoute);
app.use("/service", serviceRouter);
app.use("/payment", paymentRouter);
app.use("/chat", chatRouter);

app.use(errorMiddleware);

dbConnect()
  .then(() => {
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
