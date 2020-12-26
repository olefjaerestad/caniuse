// TODO: Remove 'string' when we have added all browsers.
type browser = 'Android Webview' | 'Chrome' | 'Firefox' | 'Opera' | 'Safari' | string;

export interface IBrowserUsageDataRow {
  browser: browser;
  version: string; // 87.0.4280.77, 13.1.1, 84.0, etc
  users: number;
  usersPercentage: number;
}

export type TBrowserUsageDataRowFilter = {
  [key in browser]?: {
    minUsersPercentage: number;
  }
}
