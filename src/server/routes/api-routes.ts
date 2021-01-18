import { Express, Request, Response } from 'express';
import { getConfig } from '../util/config';
import { setFullServerState } from '../server-state';
import { getSupportDataForMyAudience } from '../util/get-support-data';

const gaDomains = getConfig('googleAnalytics', 'domains');
const { viewId: defaultViewId } = Object.values(gaDomains)[0];

export function apiRoutes(route: string, server: Express): Express {
  server.get(`${route}/caniuse`, async (req: Request, res: Response) => {
    let { search } = req.query;
    search = search ? search.toString().replace(/</g, '\\u003c') : null;

    if (!search || typeof search !== 'string' || search.length < 3) {
      return res.status(400).send(
        'search param must be set, be a string and be at least 3 characters.'
      );
    }

    try {
      const supportDataForMyAudience = getSupportDataForMyAudience(search);
      res.json(supportDataForMyAudience);
    } catch(e) {
      res.status(500).send(
        e.message
      );
    }

  });

  server.post(`${route}/updateserverstate`, async (req: Request, res: Response) => {
    const viewId = req.body && req.body.viewId ? req.body.viewId.toString() : defaultViewId;

    if (!viewId) {
      return res.status(500).send(
        'Error: you didn\'t pass a viewId param, and the server couldn\'t find a default viewId.'
      );
    }

    setFullServerState(viewId)
      .then(() => res.send(`Server state updated, using viewId: ${viewId}.`))
      .catch((err) => res.status(500).send(err.message));
  });

  return server;
}
