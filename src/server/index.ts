import './globals';
import express, { Express } from 'express';
import { apiRoutes } from './routes/api-routes';
import { authorize } from './google-analytics/auth';
import {
  filterBrowserUsageData,
  formatBrowserUsageData,
  getBrowserUsageData,
  getMockBrowserUsageData
} from './google-analytics/data';
import { getConfig } from './util/config';
import { getBrowserSupportData, getMockBrowserSupportData } from './caniuse-data/data';
import { indexRoutes } from './routes/index-routes';
import { setServerState } from './server-state';
import { staticRoutes } from './routes/static-routes';
import { TBrowserUsageDataFilter } from './google-analytics/data-types';

type IRegisterRoutesFunction = (route: string, server: Express) => Express;
interface IRoutes {
  [route: string]: IRegisterRoutesFunction;
}

const server = express();
const routes: IRoutes = {
  '': indexRoutes,
  'api': apiRoutes,
  'static': staticRoutes,
}
const googleAnalytics = getConfig('googleAnalytics');
const { viewId } = Object.values(googleAnalytics.domains)[0];
const { days } = googleAnalytics.params;
const filters: TBrowserUsageDataFilter = {
  'Chrome': {
    minUsersPercentage: 5,
  },
  'Safari': {
    minUsersPercentage: 5,
  },
  'Firefox': {
    minUsersPercentage: 5,
  },
};

function registerRoutes(server: Express, routes: IRoutes) {
  Object.entries(routes).forEach(([route, callback]) => {
    callback(route, server);
  });
}

async function setInitialServerState() {
  let browserUsageDataRaw;
  let browserSupportData;

  if (__IS_MOCK_MODE__) {
    browserUsageDataRaw = getMockBrowserUsageData();
    browserSupportData = getMockBrowserSupportData();
  } else {
    browserUsageDataRaw = await getBrowserUsageData(viewId, days);
    browserSupportData = await getBrowserSupportData();
  }
  
  const browserDataFiltered = filterBrowserUsageData(browserUsageDataRaw, filters);
  const browserData = formatBrowserUsageData(browserDataFiltered);

  setServerState('browserUsageData', browserData);
  setServerState('browserSupportData', browserSupportData);
}

export async function app() {
  await authorize();
  await setInitialServerState();
  registerRoutes(server, routes);
  
  server.listen('3000', () => console.info(
    `Server listening at localhost:3000. __NODE_ENV__: ${__NODE_ENV__}, __IS_MOCK_MODE__: ${__IS_MOCK_MODE__}`
  ));
}
