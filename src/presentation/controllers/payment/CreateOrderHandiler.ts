import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateOrderUseCase } from "../../../application/use-case/payment/CreateOrderUseCase";

export const createOrderHandler = async (req: Request, res: Response) => {
  const { serviceid } = req.body;

  if (!serviceid) {
    res.status(400);
    res.json({ success: false, message: "Missing or invalid service ID" });
    return;
  }

  try {
    const createOrder = container.resolve(CreateOrderUseCase);
    const result = await createOrder.execute(serviceid);
console.log(result);

    if (!result || result.success === false) {
      res.status(400);
      res.json(result);
      return;
    }

    res.status(200);
    res.json(result);
    return;
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500);
    res.json({ success: false, message: "Failed to create Razorpay order" });
    return;
  }
};
