import { Request, Response } from "express";
import { UploadBills } from "../../../application/use-case/bookService/uploadBills";
import { container } from "tsyringe";

export const uploadBillsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { invoices } = req.body; 

    if (!Array.isArray(invoices) || invoices.length === 0) {
      res.status(400).json({ message: "No invoice images provided." });
      return;
    }

    const uploadBills = container.resolve(UploadBills);
    await uploadBills.execute(id, invoices);

    res.status(201).json({ message: "Invoice images uploaded successfully." });
  } catch (error) {
    console.error("Error uploading invoice bills:", error);
    res.status(500).json({ message: "Failed to upload invoice images." });
  }
};
