import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddNewAddress } from "../../../../application/use-case/User/Address/AddNewAddress";

export const addNewAddressHandler = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;
    const userId = res.locals.user?.userId;
          console.log(userId,address);
          
    if (!userId) {
       res.status(401).json({ message: "Unauthorized: User ID missing" });
       return
    }

    if (!address) {
       res.status(400).json({ message: "Address is required" });
       return
    }

    const addNewAddress = container.resolve(AddNewAddress);
    const resd= await addNewAddress.execute(userId, address);
console.log(resd);

     res.status(200).json({ message: "Address added successfully" });
     return
    } catch (error) {
    console.error("Error adding new address:", error);
     res.status(500).json({ message: "Failed to add new address" });
     return
    }
};
