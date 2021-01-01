import './globals';
import express, { Express } from 'express';
import { apiRoutes } from './routes/api-routes';
import { authorize } from './google-analytics/auth';
import { indexRoutes } from './routes/index-routes';
import { setInitialServerState } from './server-state';
import { staticRoutes } from './routes/static-routes';

type IRegisterRoutesFunction = (route: string, server: Express) => Express;
interface IRoutes {
  [route: string]: IRegisterRoutesFunction;
}

const server = express();
const routes: IRoutes = {
  '': indexRoutes,
  'api': apiRoutes,
  'static': staticRoutes,
}

function registerRoutes(server: Express, routes: IRoutes) {
  Object.entries(routes).forEach(([route, callback]) => {
    callback(route, server);
  });
}

export async function app() {
  await authorize();
  await setInitialServerState();
  registerRoutes(server, routes);
  
  server.listen('3000', () => console.info(
    `Server listening at localhost:3000. __NODE_ENV__: ${__NODE_ENV__}, __IS_MOCK_MODE__: ${__IS_MOCK_MODE__}`
  ));
}
