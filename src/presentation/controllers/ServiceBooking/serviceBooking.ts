import { Request, Response } from "express";
import { container } from "tsyringe";
import { BookService } from "../../../application/use-case/bookService/bookService";
import { HttpStatus } from "../../../constants/HttpStatus";

export const bookServiceHandler = async (req: Request, res: Response): Promise<void> => {
  try {

    const { address, serviceId } = req.body;
    const userId = res.locals.user?.userId;

    if (!serviceId || !address || !userId) { 
      res.status(HttpStatus.BAD_REQUEST).json({ error: "Bad Request: Missing required fields (serviceId, address, or userId)" });
      return;
    }
    
    const bookService = container.resolve(BookService);
    const bookedService = await bookService.execute(userId, serviceId, address);

    res.status(HttpStatus.CREATED).json({ message: "Service booked successfully", data: bookedService });
  } catch (error) {
    console.error("Error in bookServiceHandler:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error", details: (error as Error).message });
  }
};
