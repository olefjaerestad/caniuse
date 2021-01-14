import express, { Express } from 'express';

export function staticRoutes(route: string, server: Express): Express {
  // Different static file paths for dev and prod.
  if (__NODE_ENV__ === 'production') {
    server.use(`${route}`, express.static('build/client'));
    server.use('/node_modules', express.static('node_modules'));
  } else {
    server.use(`${route}`, express.static('dist/client'));
    server.use('/common', express.static('dist/common'));
    server.use('/_snowpack', express.static('dist/_snowpack'));
  }
  return server;
}
