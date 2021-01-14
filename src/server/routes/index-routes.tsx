import React from 'react';
import { App } from '../../common/App';
import { createRootStore } from '../../common/redux/store';
import { Express, Request, Response } from 'express';
import { getSupportDataForMyAudience } from '../util/get-support-data';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { setFunctionalities } from '../../common/redux/functionality/functionality-actions';
// https://reactrouter.com/web/guides/server-rendering
import { StaticRouter } from 'react-router-dom';
import { Store } from 'redux';

export function indexRoutes(route: string, server: Express): Express {
  server.get(`${route}`, async (req: Request, res: Response) => {
    const { search } = req.query;

    res.send(generateIndex(req.url, search.toString()));
  });
  return server;
}

/**
 * #app and renderToString must be on same line: 
 * https://github.com/facebook/react/issues/10879
 */
function generateIndex(url: string, search: string) {
  const store: Store = createRootStore();
  store.dispatch(setFunctionalities(getSupportDataForMyAudience(search)));

  return /*html*/`
    <html>
      ${generateHead(store)}
      <body>
        <div id="app">${renderToString(
          <Provider store={store}>
            <StaticRouter location={url} context={{}}>
              <App />
            </StaticRouter>
          </Provider>)}
        </div>
      </body>
    </html>
  `.trim();
}

function generateHead(store: Store) {
  return /*html*/`
    <head>
      <title>Caniuse - based on browser usage</title>
      ${generateHeadScripts(store)}
    </head>
  `.trim();
}

function generateHeadScripts(store: Store) {
  let scripts = /*html*/`
    <script src="static/client.js" type="module"></script>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
    </script>
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
