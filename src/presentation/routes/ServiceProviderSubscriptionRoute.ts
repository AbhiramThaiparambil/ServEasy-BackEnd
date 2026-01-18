import { Router } from "express";
import { container } from "tsyringe";
import { ServiceProviderSubscriptionController } from "../controllers/ServiceProviderSubscriptionController";
import { serviceProviderAuth } from "../Middlewares/serviceProviderMiddleware";
import { authMiddleware } from "../Middlewares/authMiddleware";

const serviceProviderSubscriptionController = container.resolve(
  ServiceProviderSubscriptionController
);

const serviceProviderSubscriptionRouter = Router();

serviceProviderSubscriptionRouter.post(
  "/ai-assistance/chats/",
  authMiddleware("User"),
  serviceProviderAuth,
  (req, res) =>
    serviceProviderSubscriptionController.handleChatRequest(req, res)
);

serviceProviderSubscriptionRouter.get(
  "/ai-assistance/chats/:chatId",
  (req, res) =>
    serviceProviderSubscriptionController.handleGetChatByChatId(req, res)
);

serviceProviderSubscriptionRouter.get(
  "/ai-assistance/providers/:providerId/chats",
  (req, res) =>
    serviceProviderSubscriptionController.getServiceProviderChatsHandler(
      req,
      res
    )
);

export default serviceProviderSubscriptionRouter;
