import { Request, Response } from "express";
import { container } from "tsyringe";
import { BookService } from "../../../application/use-case/bookService/bookService";
import { GetBookService } from "../../../application/use-case/bookService/fetchBookedService";

export const GetbookServiceHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log('hello');
    
    const userId = res.locals.user?.userId;
      console.log(userId);
      
    const bookService = container.resolve(GetBookService);
    const service = await bookService.UserBookedServices( userId);
console.log(service);

    res.status(200).json({ service });
  } catch (error) {
    console.error("Error in bookServiceHandler:", error);
    res
      .status(500)
      .json({
        error: "Internal Server Error",
        details: (error as Error).message,
      });
  }
};
