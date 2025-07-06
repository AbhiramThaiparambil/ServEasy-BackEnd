"use strict";
// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { HttpStatus } from "../../../constants/HttpStatus";
// import { AddReviewUseCase } from "../../../application/use-case/bookService/AddReviewUseCase";
// export const addReviewHandler = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { bookedServiceId, serviceId, rating, comment } = req.body;
//          console.log(req.body);
//     if (!bookedServiceId || !serviceId || rating === undefined) {
//      res.status(HttpStatus.BAD_REQUEST).json({
//         message: "bookedServiceId, serviceId, and rating are required.",
//       });
//       return
//     }
//     if (comment && typeof comment !== "string") {
//        res.status(HttpStatus.BAD_REQUEST).json({
//         message: "Comment must be a string.",
//       });
//       return
//     }
//     const addReviewUseCase = container.resolve(AddReviewUseCase);
//     await addReviewUseCase.execute(bookedServiceId, serviceId, rating, comment);
//     res
//       .status(HttpStatus.CREATED)
//       .json({ message: "Review added successfully!" });
//   } catch (error) {
//     console.error("Error adding review:", error);
//     res
//       .status(HttpStatus.INTERNAL_SERVER_ERROR)
//       .json({ message: "Failed to add review." });
//   }
// };
