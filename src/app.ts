import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import "./container"
import userRoutes from "./presentation/routes/User";
import cors from 'cors'
import dbConnect from "./infrastructure/database/db";
import authRouter from "./presentation/routes/authRoutes"
dotenv.config();
import cookieparser  from "cookie-parser";
import googleRoute from "./presentation/routes/google"
const app = express();
app.use(cookieparser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// { origin: "http://localhost:5173", credentials: true }
app.use("/",authRouter)
app.use("/", userRoutes);
app.use("/google",googleRoute)
dbConnect().catch((e)=>console.log(e));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
