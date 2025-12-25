// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import mongoose from "mongoose";
// import { GetBookSingleService } from "../../../application/use-case/booking/fetchBookings/GetBookedServiceByIdUseCase";
// import { HttpStatus } from "../../../constants/HttpStatus";

// export const getServiceDetailsServiceProvider = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       res
//         .status(HttpStatus.BAD_REQUEST)
//         .json({ error: "Invalid service booking ID" });
//       return;
//     }

//     const bookService = container.resolve(GetBookSingleService);
//     const service = await bookService.ServiceProviderBookedService(
//       new mongoose.Types.ObjectId(id)
//     );

//     res.status(HttpStatus.OK).json({ service });
//   } catch (error) {
//     console.error("Error in getSingleBookedServiceHandler:", error);
//     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
//       error: "Internal Server Error",
//       details: (error as Error).message,
//     });
//   }
// };
