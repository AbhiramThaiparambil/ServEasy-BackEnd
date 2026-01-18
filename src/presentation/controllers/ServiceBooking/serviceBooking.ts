// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { HttpStatus } from "../../../constants/HttpStatus";
// import { log } from "console";
// import { CreateBookingUseCase } from "../../../application/use-case/booking/createBooking/CreateBookingUseCase";

// export const bookServiceHandler = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     log("bookServiceHandler called with body:");
//     const {
//       address,
//       serviceId,
//       isOnline,
//       preferredServiceTime,
//       liveLocation,
//       slotId,
//     } = req.body;
//     const userId = res.locals.user?.userId;
//     console.log(
//       userId + "userId",
//       serviceId + "serviceId",
//       isOnline + "isOnline",
//       address + "address"
//     );

//     if (!userId || !serviceId || (!isOnline && !address)) {
//       res.status(HttpStatus.BAD_REQUEST).json({
//         error:
//           "Bad Request: Missing required fields (serviceId, address or userId)",
//       });
//       return;
//     }

//     const bookService = container.resolve(CreateBookingUseCase);
//     const bookedService = isOnline
//       ? await bookService.bookOnlineService(
//           userId,
//           serviceId,
//           preferredServiceTime,
//           slotId
//         )
//       : await bookService.execute(
//           userId,
//           serviceId,
//           address,
//           preferredServiceTime,
//           liveLocation
//         );

//     if (!bookService) {
//       res.status(HttpStatus.CONFLICT).json({
//         success: false,
//         message: "Service provider is not available. Please try again later.",
//       });
//     }

//     res.status(HttpStatus.CREATED).json({
//       message: "Service booked successfully",
//       data: bookedService,
//     });
//   } catch (error) {
//     console.error("Error in bookServiceHandler:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       error: "Internal Server Error",
//       details: (error as Error).message,
//     });
//   }
// };
