/**
 * https://analytics.google.com/
 * https://developers.google.com/analytics/devguides/reporting/core/v4
 * https://console.developers.google.com/apis/credentials
 * https://stackoverflow.com/questions/37787748/how-to-authenticate-to-google-analytics-reporting-api-v4
 * https://support.google.com/analytics/thread/13279940?hl=en
 */
import { getConfig } from '../util/config';
// https://stackoverflow.com/questions/47277887/node-experimental-modules-requested-module-does-not-provide-an-export-named
// import { google, Auth } from 'googleapis';
import googleapis from 'googleapis';
const { google } = googleapis;

const authInfo = getConfig('googleAnalytics', 'auth');

const jwtClient = new google.auth.JWT(
  authInfo.client_email,
  null,
  authInfo.private_key,
  ['https://www.googleapis.com/auth/analytics.readonly'],
  null
);

export const reporting = google.analyticsreporting('v4');

export async function authorize() {
  return jwtClient.authorize()
    .then((credentials: googleapis.Auth.Credentials) => {
      const oauth2Client = new google.auth.OAuth2();

      oauth2Client.setCredentials({
        access_token: credentials.access_token,
        // id_token: credentials.id_token,
        // expiry_date: credentials.expiry_date,
        // refresh_token: credentials.refresh_token,
        // scope: credentials.scope,
        // token_type: credentials.token_type,
      });
      google.options({auth: oauth2Client});
    });
}
