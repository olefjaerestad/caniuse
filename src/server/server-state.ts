import {
  filterBrowserUsageData,
  formatBrowserUsageData,
  getBrowserUsageData,
  getMockBrowserUsageData
} from './google-analytics/data';
import { getBrowserSupportData, getMockBrowserSupportData } from './caniuse-data/data';
import { getConfig } from './util/config';
import { ICanIUseData } from './caniuse-data/data-types';
import { IBrowserUsageDataByCriticality } from './google-analytics/data-types';
import { analyticsreporting_v4 } from 'googleapis';

interface IServerState {
  browserSupportData?: ICanIUseData;
  browserUsageData?: IBrowserUsageDataByCriticality;
}

/* type ISetServerStateParam = {
  browserSupportData?: IServerState['browserSupportData'];
  browserUsageData?: IServerState['browserUsageData'];
} */

const serverState: IServerState = {};

const googleAnalytics = getConfig('googleAnalytics');
const { days } = googleAnalytics.params;
const filters = googleAnalytics.filters;

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

export async function setFullServerState(viewId: string) {
  let browserUsageDataRaw: analyticsreporting_v4.Schema$GetReportsResponse;
  let browserSupportData: ICanIUseData;

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
