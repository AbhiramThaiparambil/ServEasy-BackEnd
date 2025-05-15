import { Request, Response } from "express";
import { container } from "tsyringe";
import mongoose from "mongoose";
import { GetBookSingleService } from "../../../application/use-case/bookService/GetBookedServiceById";
import { HttpStatus } from "../../../constants/HttpStatus";

export const getSingleBookedServiceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: "Invalid service booking ID" });
      return;
    }

    const userId = res.locals.user?.userId;
    console.log("Authenticated User ID:", userId);

    const bookService = container.resolve(GetBookSingleService);
    const service = await bookService.userBookedService(
      new mongoose.Types.ObjectId(id)
    );
     
    res.status(HttpStatus.OK).json({ service });
  } catch (error) {
    console.error("Error in getSingleBookedServiceHandler:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
  }
};
