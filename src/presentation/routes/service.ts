import { Router } from "express";
import {addNewService} from '../controllers/service/addnewService'
import { getServices } from "../controllers/service/getServices";
import { authMiddleware } from "../../Middlewares/authMiddleware";
import { verifyServiceProvider } from "../controllers/serviceProvider/verifyServiceProvider";
import { serviceProviderAuth } from "../../Middlewares/serviceProviderMiddleware";

const serviceRouter=Router()

serviceRouter.route("/").post(addNewService).get(authMiddleware,serviceProviderAuth,getServices)

// /service
// router.route("/")
//   .post(addService)         // Add a new service
//   .get(getAllServices);     // Get all services

// router.route("/:id")
//   .get(getServiceById)      // Get a single service by ID
//   .patch(updateService)     // Update a service
//   .delete(deleteService);   // Delete a service

// router.get("/search", searchServices); // Search services


export default serviceRouter
