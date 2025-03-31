import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAddress } from "../../../../application/use-case/User/Address/DeleteAddress";

export const deleteAddressHandler = async (req: Request, res: Response) => {
  try {

    const { id } = req.params;
    console.log(id);
    
    const userId = res.locals.user?.userId;

    console.log("User ID:", userId, "Address ID:", id);

    if (!userId) {
       res.status(401).json({ message: "Unauthorized: User ID missing" });
       return
    }

    if (!id) {
       res.status(400).json({ message: "Address ID is required" });
       return
    }

    const deleteAddressUseCase = container.resolve(DeleteAddress);
    await deleteAddressUseCase.execute(userId, id);

    
     res.status(200).json({ message: "Address deleted successfully" });
     return
    } catch (error) {
    console.error("Error deleting address:", error);
     res.status(500).json({ message: "Failed to delete address" });
     return
    }
};
