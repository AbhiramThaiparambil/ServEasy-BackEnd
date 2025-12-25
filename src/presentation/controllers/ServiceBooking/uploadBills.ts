import { Request, Response } from "express";
import { UploadBills } from "../../../application/use-case/booking/billing/UploadBillsUseCase";
import { container } from "tsyringe";
import { HttpStatus } from "../../../constants/HttpStatus";

export const uploadBillsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { invoices } = req.body;

    if (!Array.isArray(invoices) || invoices.length === 0) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "No invoice images provided." });
      return;
    }

    const uploadBills = container.resolve(UploadBills);
    await uploadBills.execute(id, invoices);

    res
      .status(HttpStatus.CREATED)
      .json({ message: "Invoice images uploaded successfully." });
  } catch (error) {
    console.error("Error uploading invoice bills:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to upload invoice images." });
  }
};
