import { analyticsreporting_v4 } from 'googleapis';
import { TBrowser } from '../../common/types/google-analytics-types';

export { TBrowser }

export interface IBrowserVersion {
  users: number;
  usersPercentage: number;
  version: string; // 87.0.4280.77, 13.1.1, 84.0, etc
}

export type TBrowserUsageData = {
  [key in TBrowser]?: {
    maxVersion?: IBrowserVersion;
    minVersion?: IBrowserVersion;
    versions: IBrowserVersion[];
  }
}

// TODO: Put these numbers in config.json?
export type TBrowserUsageDataFilter = {
  [key in TBrowser]?: {
    criticalFunctionality: {
      minUsersPercentage: number;
    }
    nonCriticalFunctionality: {
      minUsersPercentage: number;
    }
  }
}

export interface IBrowserUsageDataByCriticality {
  criticalFunctionality: TBrowserUsageData;
  nonCriticalFunctionality: TBrowserUsageData;
}

export interface IBrowserUsageDataByCriticalityRaw {
  criticalFunctionality: analyticsreporting_v4.Schema$GetReportsResponse;
  nonCriticalFunctionality: analyticsreporting_v4.Schema$GetReportsResponse;
}
