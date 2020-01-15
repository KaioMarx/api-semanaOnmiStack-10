import { Router } from 'express';
import DevController from './controllers/DevController';
import SearchController from './controllers/SearchController';

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.put('/devs/:git', DevController.update);
routes.delete('/devs/:git', DevController.delete);

routes.get('/search', SearchController.index);

module.exports = routes;