// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { GetBookService } from "../../../application/use-case/booking/fetchBookings/GetBookedServicesUseCase";
// import { HttpStatus } from "../../../constants/HttpStatus";

// export const GetbookServiceHandler = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const bookService = container.resolve(GetBookService);
//     const userId = res.locals.user?.userId;

//     if (req.query.count) {
//       const count = await bookService.findBookedServiceUserCount(userId);

//       res.status(HttpStatus.OK).json({ count });
//       return;
//     }

//     const limit = parseInt(req.query.limit as string) || 10;
//     const page = parseInt(req.query.page as string) || 0;
//     const skip = page * limit;

//     const service = await bookService.UserBookedServices(userId, skip, limit);

//     res.status(HttpStatus.OK).json({ service });
//   } catch (error) {
//     console.error("Error in bookServiceHandler:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       error: "Internal Server Error",
//       details: (error as Error).message,
//     });
//   }
// };
