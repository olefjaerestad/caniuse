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

/**
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
  let scripts = /*html*/`
    <script src="static/client.js" type="module"></script>
  `;
  /**
   * Can't use short circuiting, since rollup converts __NODE_ENV__ 
   * to a string 'false' and the result of 'false' === 'development' 
   * gets output to document in prod.
   * Ref https://github.com/rollup/rollup/issues/2004
   */
  if (__NODE_ENV__ === 'development') {
    scripts += /*html*/`
      <script src="static/hmr-client.js" type="module"></script>
    `;
  }
  return scripts.trim();
}
