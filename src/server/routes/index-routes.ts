import { Express, Request, Response } from 'express';
import { App } from '../../common/App';
// https://stackoverflow.com/questions/47277887/node-experimental-modules-requested-module-does-not-provide-an-export-named
// import { renderToString } from 'react-dom/server';
import reactDomServer from 'react-dom/server';
const { renderToString } = reactDomServer;

export function indexRoutes(route: string, server: Express): Express {
  server.get(`${route}`, async (req: Request, res: Response) => {
    res.send(generateIndex());
  });
  return server;
}

/*
 * #app and renderToString must be on same line: 
 * https://github.com/facebook/react/issues/10879
 */
function generateIndex() {
  return /*html*/`
    <html>
      ${generateHead()}
      <body>
        <div id="app">${renderToString(App())}</div>
      </body>
    </html>
  `.trim();
}

function generateHead() {
  return /*html*/`
    <head>
      <title>Caniuse - based on browser usage</title>
      ${generateHeadScripts()}
    </head>
  `.trim();
}

function generateHeadScripts() {
  return /*html*/`
    <script src="static/client.js" type="module"></script>
    ${__NODE_ENV__ === 'development' && 
      '<script src="static/hmr-client.js" type="module"></script>'}
  `.trim();
}
