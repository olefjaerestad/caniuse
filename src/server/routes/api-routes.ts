import { Express, Request, Response } from 'express';
import { filterSupportData } from '../caniuse-data/data';
import { getBrowserSupport } from '../caniuse-data/util/caniuse-utils';
import { getConfig } from '../util/config';
import { getServerState } from '../server-state';
import { setFullServerState } from '../server-state';

const gaDomains = getConfig('googleAnalytics', 'domains');
const { viewId: defaultViewId } = Object.values(gaDomains)[0];

export function apiRoutes(route: string, server: Express): Express {
  server.get(`${route}/caniuse`, async (req: Request, res: Response) => {
    const { search } = req.query;

    if (!search || typeof search !== 'string' || search.length < 3) {
      return res.status(400).send(
        'search param must be set, be a string and be at least 3 characters.'
      );
    }

    const browserUsageData = getServerState('browserUsageData');
    const browserSupportData = getServerState('browserSupportData');

    if (!Object.keys(browserUsageData).length) {
      return res.status(500).send(
        'Server has no browserUsageData.'
      );
    }

    if (!Object.keys(browserSupportData).length) {
      return res.status(500).send(
        'Server has no browserSupportData.'
      );
    }

    const browserSupportDataFiltered = filterSupportData(browserSupportData, search);
    const supportDataForMyAudience = getBrowserSupport(browserUsageData, browserSupportDataFiltered);

    res.json(supportDataForMyAudience);
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
