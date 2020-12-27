import util from 'util';
import { authorize } from './google-analytics/auth';
import { filterBrowserUsageData, formatBrowserUsageData, getBrowserUsageData } from './google-analytics/data';
import { getConfig } from './util/config';
import { TBrowserUsageDataFilter } from './google-analytics/data-types';

const googleAnalytics = getConfig('googleAnalytics');
const { viewId } = Object.values(googleAnalytics)[0];
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

export async function app() {
  await authorize();
  const browserDataRaw = await getBrowserUsageData(viewId, 7); // TODO: Remove this when done testing?
  const browserDataFiltered = filterBrowserUsageData(browserDataRaw, filters);
  const browserData = formatBrowserUsageData(browserDataFiltered);
  // console.log(util.inspect({browserDataRaw}, false, null));
  // console.log(util.inspect({browserDataFiltered}, false, null));
  console.log(util.inspect({browserData}, false, null));

}
