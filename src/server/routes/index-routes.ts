import { Express, Request, Response } from 'express';
import { App } from '../../common/App';
// https://stackoverflow.com/questions/47277887/node-experimental-modules-requested-module-does-not-provide-an-export-named
// import { renderToString } from 'react-dom/server';
import reactDomServer from 'react-dom/server';
const { renderToString } = reactDomServer;

export function indexRoutes(route: string, server: Express): Express {
  server.get(`/${route}`, async (req: Request, res: Response) => {
    res.send(renderToString(App()));
  });

  return server;
}
