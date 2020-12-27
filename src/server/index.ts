import { authorize } from './google-analytics/auth';
import express, { Express } from 'express';
import { apiRoutes } from './routes/api-routes';
import { indexRoutes } from './routes/index-routes';

type IRegisterRoutesFunction = (route: string, server: Express) => Express;
interface IRoutes {
  [route: string]: IRegisterRoutesFunction;
}

const routes: IRoutes = {
  '': indexRoutes,
  'api': apiRoutes,
}

const server = express();

async function registerRoutes(server: Express, routes: IRoutes) {
  Object.entries(routes).forEach(([route, callback]) => {
    callback(route, server);
  });
}

export async function app() {
  await authorize();
  await registerRoutes(server, routes);
  server.listen('3000', () => console.log('Server listening at localhost:3000'));
}
