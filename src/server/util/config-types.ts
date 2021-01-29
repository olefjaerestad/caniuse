import { TBrowserUsageDataFilters } from '../google-analytics/data-types';

interface IGoogleAnalyticsSite {
  viewId: string;
}
interface IGoogleAnalyticsServiceAccountAuthInfo {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

export interface IConfig {
  googleAnalytics: {
    auth: IGoogleAnalyticsServiceAccountAuthInfo;
    domains: {
      [domain: string]: IGoogleAnalyticsSite;
    };
    filters: TBrowserUsageDataFilters;
    params: {
      days: number;
    }
  };
}
