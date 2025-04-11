import { Request, Response } from "express";
import { container } from "tsyringe";
import { BookService } from "../../../application/use-case/bookService/bookService";
import { GetBookService } from "../../../application/use-case/bookService/fetchBookedService";
import { HttpStatus } from "../../../constants/HttpStatus";

export const GetbookServiceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 0;
    const skip = page * limit;

    const userId = res.locals.user?.userId;
      
    const bookService = container.resolve(GetBookService);
    const service = await bookService.UserBookedServices( userId);

    res.status(HttpStatus.OK).json({ service });
  } catch (error) {
    console.error("Error in bookServiceHandler:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
  }
};
