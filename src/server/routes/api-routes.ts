// import util from 'util';
import { Express, Request, Response } from 'express';
import { filterBrowserUsageData, formatBrowserUsageData, getBrowserUsageData } from '../google-analytics/data';
import { getConfig } from '../util/config';
import { TBrowserUsageDataFilter } from '../google-analytics/data-types';

const gaDomains = getConfig('googleAnalytics', 'domains');
const { viewId } = Object.values(gaDomains)[0];
const filters: TBrowserUsageDataFilter = {
  'Chrome': {
    minUsersPercentage: 15,
  },
  'Safari': {
    minUsersPercentage: 15,
  },
  'Firefox': {
    minUsersPercentage: 15,
  },
};

export function apiRoutes(route: string, server: Express): Express {
  server.get(`/${route}/browserusage`, async (req: Request, res: Response) => {
    const browserDataRaw = await getBrowserUsageData(viewId, 7); // TODO: Remove this when done testing?
    const browserDataFiltered = filterBrowserUsageData(browserDataRaw, filters);
    const browserData = formatBrowserUsageData(browserDataFiltered);
    // console.log(util.inspect({browserDataRaw}, false, null));
    // console.log(util.inspect({browserDataFiltered}, false, null));
    // console.log(util.inspect({browserData}, false, null));

    res.json(browserData);
  });

  return server;
}