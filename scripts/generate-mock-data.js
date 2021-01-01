import fs from 'fs';
import googleapis from 'googleapis';
import https from 'https';
import path from 'path';

const { google } = googleapis;
const config = JSON.parse(
  fs.readFileSync(
    path.join('./config/config.json'),
    'utf-8'
  )
);
const authInfo = config.googleAnalytics.auth;
const { days } = config.googleAnalytics.params;
const gaDomain = Object.values(config.googleAnalytics.domains)[0];
const jwtClient = new google.auth.JWT(
  authInfo.client_email,
  null,
  authInfo.private_key,
  ['https://www.googleapis.com/auth/analytics.readonly'],
  null
);
const reporting = google.analyticsreporting('v4');
const mockPath = 'mock';

if (!fs.existsSync(mockPath)) {
  fs.mkdirSync(mockPath);
};

async function authorizeGaApi() {
  return jwtClient.authorize()
    .then((credentials) => {
      const oauth2Client = new google.auth.OAuth2();

      oauth2Client.setCredentials({
        access_token: credentials.access_token,
      });
      google.options({auth: oauth2Client});
    });
}

function generateBrowserSupportData() {
  const browserSupportReq = https.request({
    hostname: 'raw.githubusercontent.com',
    path: '/Fyrd/caniuse/master/data.json',
    method: 'GET',
  }, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk.toString();
    });
    res.on('end', () => {
      fs.writeFileSync(`${mockPath}/browser-support-data.json`, data);
      console.info(`Successfully generated ${mockPath}/browser-support-data.json`);
    });
  });

  browserSupportReq.end();
}

async function generateBrowserUsageData(viewId, days) {
  const data = await reporting.reports.batchGet({
    requestBody: {
      reportRequests: [{
        viewId: viewId,
        dateRanges: [
          {
            startDate: `${days}daysAgo`,
            endDate: 'today',
          },
        ],
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
          },
        ],
      }],
    }
  }).catch((err) => console.error(err));

  if (!data) {
    return;
  }

  fs.writeFileSync(`${mockPath}/browser-usage-data.json`, JSON.stringify(data));
  console.info(`Successfully generated ${mockPath}/browser-usage-data.json`);
}

async function generateMockData() {
  await authorizeGaApi();
  generateBrowserSupportData();
  generateBrowserUsageData(gaDomain.viewId, days);
}

generateMockData();

