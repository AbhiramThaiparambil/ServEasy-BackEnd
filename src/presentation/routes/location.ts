import { Router } from 'express';
import { getAutoSuggestions } from '../controllers/AutoSuggestionController';
const locationRouter = Router();

locationRouter.get('/autocomplete', getAutoSuggestions);

export default locationRouter;
