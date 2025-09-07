
import { Router } from "express";
import { container } from "tsyringe";
import { ServiceProviderSubscriptionController } from "../controllers/ServiceProviderSubscriptionController";

const serviceProviderSubscriptionController = container.resolve(ServiceProviderSubscriptionController);

const serviceProviderSubscriptionRouter = Router();

serviceProviderSubscriptionRouter.get(
  "/ai-assistance/chats",
  (req, res,) => serviceProviderSubscriptionController.handleChatRequest(req, res,)
);


export default serviceProviderSubscriptionRouter;
