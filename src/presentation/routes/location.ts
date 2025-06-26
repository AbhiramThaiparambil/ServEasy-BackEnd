import { Router } from 'express';
import { getAutoSuggestions } from '../controllers/user/location/getAutoSuggestions';
const locationRouter = Router();

locationRouter.get('/autocomplete', getAutoSuggestions);

export default locationRouter;
