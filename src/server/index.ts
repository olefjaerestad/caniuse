import './globals';
import express, { Express } from 'express';
import { apiRoutes } from './routes/api-routes';
import { authorize } from './google-analytics/auth';
import { getConfig } from './util/config';
import { indexRoutes } from './routes/index-routes';
import { setFullServerState } from './server-state';
import { staticRoutes } from './routes/static-routes';
// TODO: Use dynamic import for hmr, so we can include it only in dev?
import { notify } from '@olefjaerestad/hmr';

type IRegisterRoutesFunction = (route: string, server: Express) => Express;
interface IRoutes {
  [route: string]: IRegisterRoutesFunction;
}

const server = express();
const routes: IRoutes = {
  '/': indexRoutes,
  '/api': apiRoutes,
  '/static': staticRoutes,
}
const gaDomains = getConfig('googleAnalytics', 'domains');
const { viewId } = Object.values(gaDomains)[0];

function registerMiddleware(server: Express): Express {
  // https://expressjs.com/en/4x/api.html#req.body
  server.use(express.json());

  return server;
}

function registerRoutes(server: Express, routes: IRoutes) {
  Object.entries(routes).forEach(([route, callback]) => {
    callback(route, server);
  });
}

export async function app() {
  await authorize();
  await setFullServerState(viewId);
  registerMiddleware(server);
  registerRoutes(server, routes);
  
  server.listen('3000', () => {
    if (__NODE_ENV__ === 'development') {
      notify({
        hostname: 'localhost',
        port: 3001,
        event: {
          type: 'serverrestart'
        }
      });
    }

    console.info(
      `Server listening at localhost:3000. __NODE_ENV__: ${__NODE_ENV__}, __IS_MOCK_MODE__: ${__IS_MOCK_MODE__}`
    );
  });
}
