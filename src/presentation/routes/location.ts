import { Router } from 'express';
import { getAutoSuggestions } from '../controllers/getAutoSuggestions';
const locationRouter = Router();

locationRouter.get('/autocomplete', getAutoSuggestions);

export default locationRouter;
