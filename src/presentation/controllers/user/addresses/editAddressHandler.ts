// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { EditAddress } from "../../../../application/use-case/User/Address/EditAddress";

// export const editAddressHandler = async (req: Request, res: Response) => {
//   try {
//    console.log('-9-0-0-0-0-0-0-0-0');

//     console.log(req.body);

//     const { address } = req.body;
//     const userId = res.locals.user?.userId;

//     console.log("User ID:", userId, "Updated Address:", address);

//     if (!userId) {
//        res.status(401).json({ message: "Unauthorized: User ID missing" });
//        return
//       }

//     if (!address) {
//        res.status(400).json({ message: "Updated address data is required" });
//        return
//       }

//     const editAddressUseCase = container.resolve(EditAddress);
//     await editAddressUseCase.execute(userId, address);

//      res.status(200).json({ message: "Address updated successfully" });
//      return
//    } catch (error) {
//     console.error("Error updating address:", error);
//      res.status(500).json({ message: "Failed to update address" });
//      return
//   }
// };
