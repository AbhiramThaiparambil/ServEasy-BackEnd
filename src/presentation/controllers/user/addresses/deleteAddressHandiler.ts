
import { Request, Response } from "express";
import { container } from "tsyringe";

export const deleteAddressHandiler = async (req: Request, res: Response) => {
     console.log("______");
     
    try {
        console.log(req.body)
    } catch (error) {
        
    }
}