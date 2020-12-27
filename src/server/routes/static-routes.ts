import express, { Express } from 'express';

export function staticRoutes(route: string, server: Express): Express {
  server.use(`/${route}`, express.static('dist/client'));
  server.use('/common', express.static('dist/common'));
  server.use('/web_modules', express.static('dist/web_modules'));
  return server;
}
