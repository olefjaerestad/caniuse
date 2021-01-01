import {
  filterBrowserUsageData,
  formatBrowserUsageData,
  getBrowserUsageData,
  getMockBrowserUsageData
} from './google-analytics/data';
import { getBrowserSupportData, getMockBrowserSupportData } from './caniuse-data/data';
import { getConfig } from './util/config';
import { ICanIUseData } from './caniuse-data/data-types';
import { TBrowserUsageData, TBrowserUsageDataFilter } from './google-analytics/data-types';

interface IServerState {
  browserSupportData?: ICanIUseData;
  browserUsageData?: TBrowserUsageData;
}

/* type ISetServerStateParam = {
  browserSupportData?: IServerState['browserSupportData'];
  browserUsageData?: IServerState['browserUsageData'];
} */

const serverState: IServerState = {};

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

/* export function setServerState(props: ISetServerStateParam) {
  Object.entries(props).forEach(([key, val]) => {
    serverState[key] = val;
  });
} */
export function setServerState<T extends keyof IServerState>(key: T, val: IServerState[T]) {
  serverState[key] = val;
}

export function getServerState<T extends keyof IServerState>(key: T): IServerState[T] {  
  return serverState[key];
}

export async function setInitialServerState() {
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
