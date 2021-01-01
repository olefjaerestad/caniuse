import { Express, Request, Response } from 'express';
import { filterSupportData } from '../caniuse-data/data';
import { getBrowserSupport } from '../caniuse-data/util/caniuse-utils';
import { getServerState } from '../server-state';

export function apiRoutes(route: string, server: Express): Express {
  server.get(`/${route}/caniuse`, async (req: Request, res: Response) => {
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

  return server;
}
