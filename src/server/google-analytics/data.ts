/**
 * https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet
 */
import util from 'util';
import { reporting } from './auth';

interface IConfig {
  viewId: string;
}

const config: IConfig = {
  viewId: '234884534',
}

export async function getData() {
  const res = await reporting.reports.batchGet({
    requestBody: {
      reportRequests: [{
        viewId: config.viewId,
        dateRanges: [
          {
            startDate: '2020-12-17',
            endDate: '2020-12-24',
          },
          // {
          //   startDate: '14daysAgo',
          //   endDate: '7daysAgo',
          // },
        ],
        metrics: [
          {
            expression: 'ga:users',
          },
        ],
      }],
    }
  }).catch((err) => console.error({errData2: err}));

  if (!res) {
    return;
  }

  console.log(util.inspect({resData: res.data}, false, null));
  return res.data;
}
