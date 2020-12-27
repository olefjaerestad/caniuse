// TODO: Remove 'string' when we have added all browsers.
type browser = 'Android Webview' | 'Chrome' | 'Firefox' | 'Opera' | 'Safari' | string;

export interface IBrowserVersion {
  users: number;
  usersPercentage: number;
  version: string; // 87.0.4280.77, 13.1.1, 84.0, etc
}

export type TBrowserUsageData = {
  [key in browser]?: {
    maxVersion?: IBrowserVersion;
    minVersion?: IBrowserVersion;
    versions: IBrowserVersion[];
  }
}

export type TBrowserUsageDataFilter = {
  [key in browser]?: {
    minUsersPercentage: number;
  }
}
