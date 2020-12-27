import express, { Express, Request, Response } from 'express';

export function staticRoutes(route: string, server: Express): Express {
  server.use(`/${route}`, express.static('dist/client')); //get?
  return server;
}
