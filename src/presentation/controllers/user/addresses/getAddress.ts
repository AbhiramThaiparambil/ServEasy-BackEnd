// import { Request, Response } from "express";
// import { container } from "tsyringe";
// import { GetAddress } from "../../../../application/use-case/User/Address/GetAddress";

// export const GetAddressHandler = async (req: Request, res: Response) => {
//   try {
//     const userId = res.locals.user?.userId;

//     console.log("User ID:", userId);

//     if (!userId) {
//        res.status(401).json({ message: "Unauthorized: User ID missing" });
//        return
//     }

//     const getAddress = container.resolve(GetAddress);
//     const allAddress = await getAddress.execute(userId);

//      res.status(200).json({ allAddress });
//      return
//     } catch (error: any) {
//     console.error("Error fetching address:", error.message || error);
//      res.status(500).json({ message: "Failed to fetch address" });
//      return
//     }
// };
