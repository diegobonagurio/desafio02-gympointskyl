import { Router } from 'express';
import authMiddlewares from './app/middlewares/auth';

import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.post('/student', StudentController.store);
routes.put('/atualizar', StudentController.update);

export default routes;
