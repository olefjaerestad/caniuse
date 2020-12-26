import util from 'util';
import { authorize } from './google-analytics/auth';
import { filterBrowserUsageData, formatBrowserUsageData, getBrowserUsageData } from './google-analytics/data';
import { getConfig } from './util/config';
import { TBrowserUsageDataRowFilter } from './google-analytics/data-types';

const googleAnalytics = getConfig('googleAnalytics');
const { viewId } = Object.values(googleAnalytics)[0];
const filters: TBrowserUsageDataRowFilter = {
  'Chrome': {
    minUsersPercentage: 25,
  },
  'Safari': {
    minUsersPercentage: 25,
  },
  'Firefox': {
    minUsersPercentage: 25,
  },
};

export async function app() {
  await authorize();
  const browserDataRaw = await getBrowserUsageData(viewId, 7); // TODO: Remove this when done testing?
  const browserData = formatBrowserUsageData(browserDataRaw);
  const browserDataFiltered = filterBrowserUsageData(browserData, filters);
  console.log(util.inspect({browserData}, false, null));
  console.log(util.inspect({browserDataFiltered}, false, null));
}
