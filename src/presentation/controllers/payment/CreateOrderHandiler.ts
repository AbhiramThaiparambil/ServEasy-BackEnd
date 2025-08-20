import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "../../../application/use-case/payment/CreateOrderUseCase";
import { HttpStatus } from "../../../constants/HttpStatus";

export const createOrderHandler = async (req: Request, res: Response) => {
  const { serviceId } = req.body;
      console.log(req.body)
  if (!serviceId) {
    res.status(HttpStatus.BAD_REQUEST);
    res.json({ success: false, message: "Missing or invalid service ID" });
    return;
  }

  

  try {
    const createOrder = container.resolve(CreateOrderUseCase);
    const result = await createOrder.execute(serviceId);

    if (!result || result.success === false) {
      res.status(HttpStatus.BAD_REQUEST);
      res.json(result);
      return;
    }

    res.status(HttpStatus.OK);
    res.json(result);
    return;
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.json({ success: false, message: "Failed to create Razorpay order" });
    return;
  }
};
