import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import "./container"
import userRoutes from "./presentation/routes/User";
import cors from 'cors'
import dbConnect from "./infrastructure/database/db";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/", userRoutes);
dbConnect().catch((e)=>console.log(e));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
