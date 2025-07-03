import { Router } from 'express';
import { addNewService } from '../controllers/service/addnewService';
import { getServices } from '../controllers/service/getServices';
import { serviceProviderAuth } from '../../Middlewares/serviceProviderMiddleware';
import { blockUnblockService } from '../controllers/service/activeAndInactive';
import { updateService } from '../controllers/service/updateService';
import { bookServiceHandler } from '../controllers/ServiceBooking/serviceBooking';
import { GetbookServiceHandler } from '../controllers/ServiceBooking/getBookedService';
import { getSingleBookedServiceHandler } from '../controllers/ServiceBooking/getSingleBookedService';
import { GetServiceProviderBookServiceHandler } from '../controllers/serviceProvider/bookings/GetBookServic';
import { getServiceDetailsServiceProvider } from '../controllers/ServiceBooking/getServiceDetailsServiceProvider';
import { serviceProviderStatusChange } from '../controllers/ServiceBooking/serviceProviderStausChange';
import { authMiddleware } from '../../Middlewares/authMiddleware';
import { uploadBillsHandler } from '../controllers/ServiceBooking/uploadBills';
import { ServiceController } from '../controllers/ServiceController';
import { container } from 'tsyringe';
import { checkUserBlocked } from '../../Middlewares/checkUserBlocked';

const serviceController = container.resolve(ServiceController);
const serviceRouter = Router();
serviceRouter.put('/:serviceId', updateService);

serviceRouter
  .route('/')
  .post(addNewService)
  .get(authMiddleware('User'), serviceProviderAuth, getServices);

serviceRouter.patch(
  '/block-unblock',
  authMiddleware('User'),
  serviceProviderAuth,
  blockUnblockService
);

serviceRouter.post('/book', authMiddleware('User'), checkUserBlocked, bookServiceHandler);

serviceRouter.get('/bookings', authMiddleware('User'), checkUserBlocked, GetbookServiceHandler);
serviceRouter.get(
  '/bookings/serviceprovider',
  authMiddleware('User'),
  serviceProviderAuth,
  GetServiceProviderBookServiceHandler
);

serviceRouter.get('/online-services/with-slots', (req, res) =>
  serviceController.getOnlineServiceWithSlotHandler(req, res)
);

serviceRouter.get('/online-services/slots/:id', (req, res) =>
  serviceController.getOnlineServiceSlotsHandler(req, res)
);

serviceRouter.delete('/slots/:id', (req, res) => serviceController.deleteSlotHandler(req, res));

serviceRouter.post('/slots', (req, res) => serviceController.createSlotHandler(req, res));

serviceRouter.post('/service-provider/uploadbills/:id/', uploadBillsHandler);

serviceRouter.put(
  '/service-provider/bookings/:id/:action',
  authMiddleware('User'),
  serviceProviderAuth,
  serviceProviderStatusChange
);

serviceRouter.put('/bookings/:id/cancel', (req, res) =>
  serviceController.cancelUserBooking(req, res)
);

serviceRouter.get('/bookings/serviceProvider/:id', getServiceDetailsServiceProvider);

serviceRouter.get('/bookings:id', getSingleBookedServiceHandler);
export default serviceRouter;
