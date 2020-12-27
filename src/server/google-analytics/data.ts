/**
 * https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
 * https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
 * https://ga-dev-tools.appspot.com/query-explorer/
 */
import { analyticsreporting_v4 } from 'googleapis';
import { getMaxBrowserVersion, getMinBrowserVersion } from './util/browser-version-utils';
import { reporting } from './auth';
import { TBrowserUsageData, TBrowserUsageDataFilter } from './data-types';

/**
 * Get browser usage data from Google Analytics.
 * @param viewId GA viewId to get data for.
 * @param days Starting at today, how many days back to get data for.
 */
export async function getBrowserUsageData(viewId: string, days: number): Promise<analyticsreporting_v4.Schema$GetReportsResponse | undefined> {
  const res = await reporting.reports.batchGet({
    requestBody: {
      reportRequests: [{
        viewId: viewId,
        dateRanges: [
          // {
          //   startDate: '2020-12-17',
          //   endDate: '2020-12-25',
          // },
          {
            startDate: `${days}daysAgo`,
            endDate: 'today',
          },
        ],
        // filtersExpression: '', // ga:name operator expression
        dimensions: [
          {
            name: 'ga:browser'
          },
          {
            name: 'ga:browserVersion'
          },
        ],
        metrics: [
          {
            expression: 'ga:users',
            // expression: 'ga:percentNewSessions',
            // expression: 'ga:totalVisitors',
          },
        ],
      }],
    }
  }).catch((err) => console.error({errData2: err}));

  if (!res) {
    return;
  }

  return res.data;
}

/**
 * Format Google Analytics browser usage data for easier handling.
 * @param data 
 */
export function formatBrowserUsageData(data: analyticsreporting_v4.Schema$GetReportsResponse): TBrowserUsageData {
  const totalUsers = Number(data.reports[0].data.totals[0].values[0]);

  const res = data.reports[0].data.rows.reduce((acc: TBrowserUsageData, val: analyticsreporting_v4.Schema$ReportRow) => {
    const browser = val.dimensions[0];
    const version = val.dimensions[1];
    const users = Number(val.metrics[0].values[0]);
    const usersPercentage = users / totalUsers * 100;

    if (!acc[browser]) {
      acc[browser] = {
        versions: [],
      }
    }

    acc[browser].versions.push({
      users,
      usersPercentage,
      version,
    });

    acc[browser].maxVersion = getMaxBrowserVersion(acc[browser].versions);
    acc[browser].minVersion = getMinBrowserVersion(acc[browser].versions);
    
    return acc;
  }, {});

  return res;
}

/**
 * Filter out browser usage data below specified filter thresholds.
 * @param data 
 * @param filters 
 */
export function filterBrowserUsageData(data: TBrowserUsageData, filters: TBrowserUsageDataFilter): TBrowserUsageData {
  return Object.entries(data).reduce((browsers: TBrowserUsageData, val: [string, TBrowserUsageData['Chrome']]) => {
    const [browser, usageData] = val;
    
    usageData.versions.forEach((version: TBrowserUsageData['Chrome']['versions'][0]) => {
      const minUsersPercentage = filters[browser] 
        ? filters[browser].minUsersPercentage 
        : Object.values(filters)[0].minUsersPercentage;

      if (version.usersPercentage >= minUsersPercentage) {
        if (!browsers[browser]) {
          browsers[browser] = {
            maxVersion: usageData.maxVersion,
            minVersion: usageData.minVersion,
            versions: [],
          }
        }

        browsers[browser].versions.push(version);
      }
    });
    
    return browsers;
  }, {});
}
