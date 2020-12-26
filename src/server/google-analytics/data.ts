/**
 * https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
 * https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
 * https://ga-dev-tools.appspot.com/query-explorer/
 */
import { analyticsreporting_v4 } from 'googleapis';
import { IBrowserUsageDataRow, TBrowserUsageDataRowFilter } from './data-types';
import { reporting } from './auth';

/**
 * Get browser usage data from Google Analytics.
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
export function formatBrowserUsageData(data: analyticsreporting_v4.Schema$GetReportsResponse): IBrowserUsageDataRow[] {
  const totalUsers = Number(data.reports[0].data.totals[0].values[0]);

  const res = data.reports[0].data.rows.reduce((acc: IBrowserUsageDataRow[], val: analyticsreporting_v4.Schema$ReportRow) => {
    const users = Number(val.metrics[0].values[0]);
    const usersPercentage = users / totalUsers * 100;

    acc.push({
      browser: val.dimensions[0],
      version: val.dimensions[1],
      users,
      usersPercentage,
    });
    return acc;
  }, []);

  return res;
}

/**
 * Filter out browser usage data below specified filter thresholds.
 * @param data 
 * @param filters 
 */
export function filterBrowserUsageData(data: IBrowserUsageDataRow[], filters: TBrowserUsageDataRowFilter): IBrowserUsageDataRow[] {
  return data.filter((val) => {
    if (!filters[val.browser]) {
      return val.usersPercentage >= Object.values(filters)[0].minUsersPercentage;
    }

    return val.usersPercentage >= filters[val.browser].minUsersPercentage;
  });
}
