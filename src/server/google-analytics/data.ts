/**
 * https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
 * https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
 * https://ga-dev-tools.appspot.com/query-explorer/
 */
import fs from 'fs';
import { analyticsreporting_v4 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
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
  }).catch((error) => {
    throw new Error(error);
  });

  if (!res) {
    return;
  }

  return res.data;
}

export function getMockBrowserUsageData(): analyticsreporting_v4.Schema$GetReportsResponse {
  const data: any = fs.readFileSync('mock/browser-usage-data.json', 'utf-8');
  const parsedData: GaxiosResponse<analyticsreporting_v4.Schema$GetReportsResponse> = JSON.parse(data);

  return parsedData.data;
}

/**
 * Filter out browser usage data below specified filter thresholds.
 * @param data 
 * @param filters 
 */
export function filterBrowserUsageData(data: analyticsreporting_v4.Schema$GetReportsResponse, filters: TBrowserUsageDataFilter): analyticsreporting_v4.Schema$GetReportsResponse {
  // const newData: analyticsreporting_v4.Schema$GetReportsResponse = JSON.parse(JSON.stringify(data));
  const newData: analyticsreporting_v4.Schema$GetReportsResponse = {...data};
  const totalUsers = Number(newData.reports[0].data.totals[0].values[0]);
  // let minUsers: number | null = null;
  // let maxUsers: number | null = null;

  newData.reports[0].data.rows = newData.reports[0].data.rows.filter((row: analyticsreporting_v4.Schema$ReportRow) => {
    const browser = row.dimensions[0];
    const usersPercentage = Number(row.metrics[0].values[0]) / totalUsers * 100;
    const minUsersPercentage = filters[browser] 
      ? filters[browser].minUsersPercentage 
      : Object.values(filters)[0].minUsersPercentage;

    return usersPercentage >= minUsersPercentage;
  });
  // newData.reports[0].data.totals[0].values[0] = newData.reports[0].data.rows.reduce((acc: number, row) => {
  //   const users = Number(row.metrics[0].values[0]);

  //   if (maxUsers === null || users > maxUsers) {
  //     maxUsers = users;
  //   }
  //   if (minUsers === null || users < minUsers) {
  //     minUsers = users;
  //   }

  //   return acc + users;
  // }, 0).toString();
  // newData.reports[0].data.rowCount = newData.reports[0].data.rows.length;
  // newData.reports[0].data.minimums[0].values[0] = minUsers.toString();
  // newData.reports[0].data.maximums[0].values[0] = maxUsers.toString();

  return newData;
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
