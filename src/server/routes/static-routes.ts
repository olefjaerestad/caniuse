import express, { Express } from 'express';

export function staticRoutes(route: string, server: Express): Express {
  // Different static file paths for dev and prod.
  if (__NODE_ENV__ === 'production') {
    server.use(`${route}`, express.static('build/client'));
    server.use('/node_modules', express.static('node_modules'));
  } else {
    server.use(`${route}`, express.static('dev/client'));
    server.use('/common', express.static('dev/common'));
    server.use('/_snowpack', express.static('dev/_snowpack'));
  }
  return server;
}
