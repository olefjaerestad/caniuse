interface IGoogleAnalyticsSite {
  viewId: string;
}

export interface IConfig {
  googleAnalytics: {
    'fjaerestad.no': IGoogleAnalyticsSite;
  }
}
