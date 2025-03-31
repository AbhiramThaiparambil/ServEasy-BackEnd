import { Request, Response } from "express";
import { container } from "tsyringe";
import { BookService } from "../../../application/use-case/bookService/bookService";

export const bookServiceHandler = async (req: Request, res: Response): Promise<void> => {
  try {

    const { address, serviceId } = req.body;
    const userId = res.locals.user?.userId;

    if (!serviceId || !address || !userId) { 
      res.status(400).json({ error: "Bad Request: Missing required fields (serviceId, address, or userId)" });
      return;
    }
    
    const bookService = container.resolve(BookService);
    const bookedService = await bookService.execute(userId, serviceId, address);

    res.status(201).json({ message: "Service booked successfully", data: bookedService });
  } catch (error) {
    console.error("Error in bookServiceHandler:", error);
    res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
};
