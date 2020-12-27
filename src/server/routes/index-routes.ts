import { Express, Request, Response } from 'express';
import { App } from '../../common/App';
import { renderToString } from 'react-dom/server';

export function indexRoutes(route: string, server: Express): Express {
  server.get(`/${route}`, async (req: Request, res: Response) => {
    res.send(renderToString(App()));
  });

  return server;
}
