/**
 * https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
 * https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
 * https://ga-dev-tools.appspot.com/query-explorer/
 */
import fs from 'fs';
import { analyticsreporting_v4 } from 'googleapis';
import { GaxiosResponse } from 'gaxios';
import {
  getMaxBrowserVersion, 
  getMinBrowserVersion
} from './util/browser-version-utils';
import { reporting } from './auth';
import {
  TBrowserUsageData, 
  TBrowserUsageDataFilters, 
  IBrowserUsageDataByCriticality, 
  IBrowserUsageDataByCriticalityRaw
} from './data-types';

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
export function filterBrowserUsageData(data: analyticsreporting_v4.Schema$GetReportsResponse, filters: TBrowserUsageDataFilters): IBrowserUsageDataByCriticalityRaw {
  // const dataCopy: analyticsreporting_v4.Schema$GetReportsResponse = {...data};
  // We're modifying deeply nested properties, so we need a new reference:
  const dataCopy: analyticsreporting_v4.Schema$GetReportsResponse = JSON.parse(JSON.stringify(data));
  const totalUsers = Number(data.reports[0].data.totals[0].values[0]);
  const criticalFeaturesData: IBrowserUsageDataByCriticalityRaw['criticalFeatures'] = dataCopy;
  const nonCriticalFeaturesData: IBrowserUsageDataByCriticalityRaw['nonCriticalFeatures'] = dataCopy;

  // Empty rows before we populate them with only the rows we want.
  criticalFeaturesData.reports[0].data.rows = [];
  nonCriticalFeaturesData.reports[0].data.rows = [];
  data.reports[0].data.rows.forEach((row: analyticsreporting_v4.Schema$ReportRow) => {
    const browser = row.dimensions[0];
    const version = row.dimensions[1];

    // Browser version is sometimes '(not set)' in GA. We ignore these.
    if (version === '(not set)') {
      return;
    }
    
    const usersPercentage = Number(row.metrics[0].values[0]) / totalUsers * 100;
    const minUsersPercentageCritical = filters[browser] 
      ? filters[browser].criticalFeatures.minUsersPercentage 
      : Object.values(filters)[0].criticalFeatures.minUsersPercentage;
    const minUsersPercentageNonCritical = filters[browser] 
      ? filters[browser].nonCriticalFeatures.minUsersPercentage 
      : Object.values(filters)[0].nonCriticalFeatures.minUsersPercentage;

    if (usersPercentage >= minUsersPercentageCritical) {
      criticalFeaturesData.reports[0].data.rows.push(row);
    }
    if (usersPercentage >= minUsersPercentageNonCritical) {
      nonCriticalFeaturesData.reports[0].data.rows.push(row);
    }
  });

  return {
    criticalFeatures: criticalFeaturesData,
    nonCriticalFeatures: nonCriticalFeaturesData,
  }
}

/**
 * Format Google Analytics browser usage data for easier handling.
 * @param data 
 */
export function formatBrowserUsageData(data: IBrowserUsageDataByCriticalityRaw): IBrowserUsageDataByCriticality {
  const result: IBrowserUsageDataByCriticality = {
    criticalFeatures: {},
    nonCriticalFeatures: {},
  }

  Object.keys(result).forEach((criticality: keyof IBrowserUsageDataByCriticality) => {
    const totalUsers = Number(data[criticality].reports[0].data.totals[0].values[0]);

    result[criticality] = data[criticality].reports[0].data.rows.reduce((acc: TBrowserUsageData, row: analyticsreporting_v4.Schema$ReportRow) => {
      const browser = row.dimensions[0];
      const version = row.dimensions[1];
      const users = Number(row.metrics[0].values[0]);
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
  });

  return result;
}
