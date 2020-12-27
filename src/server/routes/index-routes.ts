import { Express, Request, Response } from 'express';

export function indexRoutes(route: string, server: Express): Express {
  server.get(`/${route}`, async (req: Request, res: Response) => {
    res.send('<h1>Hello<h1>');
  });

  return server;
}
