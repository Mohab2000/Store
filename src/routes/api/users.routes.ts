import { Router } from 'express';
import * as controllers from '../../controllers/user.controllers';
const routes = Router();

routes.post('/', controllers.create);

export default routes;
