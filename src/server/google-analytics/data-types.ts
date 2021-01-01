// TODO: Remove 'string' when we have added all browsers.
export type TBrowser = 'Android Webview' | 'Chrome' | 'Firefox' | 'Opera' | 'Safari' | string;

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

// TODO: Split minUsersPercentage into 2, one for critical and one for fancy functionality.
// e.g. critical: {minUsersPercentage: number} and fancy: {minUsersPercentage: number}.
// Put them in config.json?
export type TBrowserUsageDataFilter = {
  [key in TBrowser]?: {
    minUsersPercentage: number;
  }
}
